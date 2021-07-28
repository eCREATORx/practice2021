import * as React from "react";
import ManagerSignatureForm from "./Component/ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "./Component/SignaturePreview/SignaturePreview";
import "./app.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mailBody: "",
            previousSignature: "",
            template: "",
            fakeImageUrl: "",
            name: "Your name",
            jobTitle: "Your job title",
            siteHost: "Your site host",
            phone: "Your phone",
            phoneBookUrl: "Your phone book url",
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
            fakeImageUrl: fakeFileUrl
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
        return <div className={"app"}>
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
                fakeImageUrl={this.state.fakeImageUrl}
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