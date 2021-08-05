import * as React from "react";
import ManagerSignatureForm from "../ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "../SignaturePreview/SignaturePreview";
import "./managersignatureeditor.css";

export default class ManagerSignatureEditor extends React.Component {
    changedVars = {};

    constructor(props) {
        super(props);

        this.state = {
            mailBody: "",
            previousSignature: "",
            template: "",
            fileUrlForPreview: "",
            changedVars: this.changedVars
        }
    }

    setPreviousSignature = signature => {
        this.setState({
            previousSignature: signature
        })
    }

    setTemplate = template => {
        this.setState({
            template: template
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
                imageUrl={this.state.fileUrlForPreview}
                changedVars={this.state.changedVars}
            />
        </div>
    }
}