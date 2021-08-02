import * as React from "react";
import ManagerSignatureForm from "../ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "../SignaturePreview/SignaturePreview";
import "./managersignatureeditor.css";

let changedVars = {};

export default class ManagerSignatureEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mailBody: "",
            previousSignature: "",
            template: "",
            fileUrlForPreview: "",
            changedVars: changedVars,
            newSignature: ""
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
        changedVars[field] = value;
        this.setState({
            changedVars: changedVars
        });
    }

    handleFileChange = fakeFileUrl => {
        this.setState({
            fileUrlForPreview: fakeFileUrl
        })
    }

    setMailBodyValue = value => {
        this.setState({
            mailBody: value
        })
    }

    setNewSignature = signature => {
        this.setState({
            newSignature: signature
        })
    }

    render() {
        return <div className={"editor"}>
            <ManagerSignatureForm
                onImageChange={this.handleFileChange}
                onBoxChange={this.setPreviousSignature}
                onTemplateChange={this.setTemplate}
                onFormChange={this.setChangedVar}
                onTextAreaChange={this.setMailBodyValue}
                newSignature={this.state.newSignature}
            />
            <SignaturePreview
                mailBody={this.state.mailBody}
                signature={this.state.previousSignature}
                template={this.state.template}
                imageUrl={this.state.fileUrlForPreview}
                changedVars={this.state.changedVars}
                onSignatureChange={this.setNewSignature}
            />
        </div>
    }
}