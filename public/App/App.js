import * as React from "react";
import ImageLoader from "./Component/ImageLoader/ImageLoader";
import ManagerSignatureForm from "./Component/ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "./Component/SignaturePreview/SignaturePreview";
import "./app.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previousSignature: "",
            template: "",
            imageUrl: "",
            name:  "Your name",
            jobTitle: "Your job title",
            siteHost: "Your site host",
            phone: "Your phone",
            phoneBookUrl: "Your phone book url",
            newSignature: ""
        }
    }

    setPreviousSignature = (signature) => {
        this.setState({
            previousSignature: signature
        })
    }

    setTemplate = (template) => {
        this.setState({
            template: template
        })
    }

    setTemplateFieldValue = (field, value) => {
        this.setState({
            [field] : value
        })
    }

    setImageUrl = (url) => {
        this.setState({
            imageUrl: url
        })
    }

    setNewSignature = (signature) => {
        this.setState({
            newSignature: signature
        })
    }

    render() {
      return <div className={"app"}>
          <div className={"form"}>
              <ImageLoader onImageChange={this.setImageUrl}/>
              <ManagerSignatureForm
                  onBoxChange={this.setPreviousSignature}
                  onTemplateChange={this.setTemplate}
                  onInputChange={this.setTemplateFieldValue}
                  newSignature={this.state.newSignature}
              />
          </div>
          <SignaturePreview
              signature={this.state.previousSignature}
              template={this.state.template}
              imageUrl={this.state.imageUrl}
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