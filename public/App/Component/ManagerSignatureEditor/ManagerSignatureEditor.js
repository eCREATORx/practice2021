import * as React from "react";
import ManagerSignatureForm from "../ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "../SignaturePreview/SignaturePreview";
import "./managersignatureeditor.css";
import {camelize} from "../../Util/StringUtil";

export const initTemplateVars = (template, fields) => {
    let templateVarsMatchesArr = [["{imageUrl}", "imageUrl"]];
    fields.forEach(field => {
        const fieldName = camelize(field);
        const fieldNameBrackets = '{' + fieldName + '}';
        templateVarsMatchesArr.push([fieldNameBrackets, fieldName]);
    });

    let defaultVarsValues = {};

    templateVarsMatchesArr.forEach(value => {
        const textWithoutBrackets = value[1];
        if (textWithoutBrackets !== "imageUrl") {
            defaultVarsValues = Object.assign(defaultVarsValues, {
                [textWithoutBrackets]: 'Your ' + textWithoutBrackets
            })
        } else {
            defaultVarsValues = Object.assign(defaultVarsValues, {
                [textWithoutBrackets]: ""
            })
        }
    })

    return [templateVarsMatchesArr, defaultVarsValues];
}

export const parseHtml = (template, fields, imageUrl, changedVars) => {
    let templateVarsMatchesArr, defaultVarsValues;
    [templateVarsMatchesArr, defaultVarsValues] = initTemplateVars(template, fields);

    templateVarsMatchesArr.forEach(value => {
        const fullText = value[0];
        const textWithoutBrackets = value[1];

        if (textWithoutBrackets === "imageUrl" && imageUrl) {
            template = template.replaceAll(fullText, imageUrl)
        } else {
            template = template.replaceAll(fullText, changedVars[textWithoutBrackets] ?? defaultVarsValues[textWithoutBrackets]);
        }
    });

    return template;
}

export default class ManagerSignatureEditor extends React.Component {
    changedVars = {};

    constructor(props) {
        super(props);

        this.state = {
            mailBody: "",
            previousSignature: "",
            template: "",
            fields: [],
            fileUrlForPreview: "",
            changedVars: this.changedVars
        }
    }

    setPreviousSignature = signature => {
        this.setState({
            previousSignature: signature
        })
    }

    setTemplate = (template, fields) => {
        this.setState({
            template: template,
            fields: fields
        })
    }

    setChangedVar = (field, value) => {
        this.changedVars[field] = value;
        this.setState({
            changedVars: this.changedVars
        });
    }

    handleFileChange = fileUrlForPreview => {
        this.setState({
            fileUrlForPreview: fileUrlForPreview
        })
    }

    setMailBody = mailBody => {
        this.setState({
            mailBody: mailBody
        })
    }

    render() {
        return <div className={"editor"}>
            <ManagerSignatureForm
                onImageChange={this.handleFileChange}
                onBoxChange={this.setPreviousSignature}
                onTemplateChange={this.setTemplate}
                onFormChange={this.setChangedVar}
                onTextAreaChange={this.setMailBody}
            />
            <SignaturePreview
                mailBody={this.state.mailBody}
                signature={this.state.previousSignature}
                template={this.state.template}
                fields={this.state.fields}
                imageUrl={this.state.fileUrlForPreview}
                changedVars={this.state.changedVars}
            />
        </div>
    }
}