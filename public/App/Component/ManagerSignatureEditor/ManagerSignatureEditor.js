import * as React from "react";
import ManagerSignatureForm from "../ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "../SignaturePreview/SignaturePreview";
import "./managersignatureeditor.css";

export default class ManagerSignatureEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mailBody: "",
            previousSignature: "",
            template: "",
            fileUrlForPreview: "",
            name: "",
            jobTitle: "",
            siteHost: "",
            phone: "",
            phoneBookUrl: "",
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

    setTemplateFieldValue = (field, value) => {
        this.setState({
            [field]: value
        })
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
                onFormChange={this.setTemplateFieldValue}
                onTextAreaChange={this.setMailBodyValue}
                newSignature={this.state.newSignature}
            />
            <SignaturePreview
                mailBody={this.state.mailBody}
                signature={this.state.previousSignature}
                template={this.state.template}
                imageUrl={this.state.fileUrlForPreview}
                name={this.state.name}
                jobTitle={this.state.jobTitle}
                siteHost={this.state.siteHost}
                phone={this.state.phone}
                phoneBookUrl={this.state.phoneBookUrl}
                onSignatureChange={this.setNewSignature}
            />
        </div>
    }
}