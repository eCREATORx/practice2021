import * as React from "react";
import Interweave from 'interweave';
import {initTemplateVars} from "../../Util/ParseUtil";
import "./signaturepreview.css";

export default class SignaturePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    parseHtml(template) {
        const templateVarsMatches = template.matchAll(/{(.*?)}/gim);
        const templateVarsMatchesArr = Array.from(templateVarsMatches);
        const defaultVarsValues = initTemplateVars(template);

        templateVarsMatchesArr.forEach( value => {
            const fullText = value[0];
            const textWithoutBrackets = value[1];

            if (textWithoutBrackets === "imageUrl" && this.props.imageUrl)
            {
                template = template.replace(fullText, this.props.imageUrl)
            }
            else
            {
                template = template.replace(fullText, this.props.changedVars[textWithoutBrackets] ?? defaultVarsValues[textWithoutBrackets]);
            }
        });

        return template;
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