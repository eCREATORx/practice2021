import * as React from "react";
import Interweave from 'interweave';
import "./signaturepreview.css";

let changedVars = {};

export default class SignaturePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.mailBody !== this.props.mailBody)
        {
            const newSignature = this.parseHtml(this.props.template);
            this.props.onSignatureChange(this.props.mailBody + newSignature);
        }
        else
        {
            const templateFields = Object.keys(this.initTemplateVars(this.props.template));
            for (const field of templateFields) {
                if (prevProps[field] !== this.props[field]) {
                    changedVars[field] = this.props[field];
                    const newSignature = this.parseHtml(this.props.template);
                    this.props.onSignatureChange(this.props.mailBody + newSignature);
                }
            }
        }
    }

    parseHtml(template) {
        const templateVarsMatches = template.matchAll(/{(.*?)}/gim);
        const templateVarsMatchesArr = Array.from(templateVarsMatches);
        const defaultVarsValues = this.initTemplateVars(template);

        templateVarsMatchesArr.forEach( value => {
            const fullText = value[0];
            const textWithoutBrackets = value[1];

            template = template.replace(fullText, changedVars[textWithoutBrackets] ?? defaultVarsValues[textWithoutBrackets]);
        });

        return template;
    }

    initTemplateVars = template => {
        const templateVarsMatches = template.matchAll(/{(.*?)}/gim);
        const templateVarsMatchesArr = Array.from(templateVarsMatches);

        let templateVars = {};

        templateVarsMatchesArr.forEach( value => {
            const textWithoutBrackets = value[1];
            if (textWithoutBrackets !== "imageUrl")
            {
                templateVars = Object.assign(templateVars, {
                    [textWithoutBrackets]: 'Your ' + textWithoutBrackets
                })
            }
            else
            {
                templateVars = Object.assign(templateVars, {
                    [textWithoutBrackets]: ""
                })
            }
        })

        return templateVars;
    }

    render() {
        return <div className={"preview"}>
            <div className={"new-signature"}>
                <h1>Editable</h1>
                {
                    (this.props.mailBody)
                    ? <Interweave content={this.props.mailBody} noWrap={true}/>
                    : <div/>
                }
                {
                    (this.props.template)
                        ? <Interweave content={this.parseHtml(this.props.template)} tagName={"div"}/>
                        : <div/>
                }
            </div>
            <div className={"old-signature"}>
                <h1>Current</h1>
                {
                    (this.props.signature)
                        ? <Interweave content={this.props.signature} tagName={"div"}/>
                        : <div/>
                }
            </div>
        </div>
    }
}