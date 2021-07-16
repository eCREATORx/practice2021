import * as React from "react";
import ImageLoader from "./Component/ImageLoader/ImageLoader";
import ManagerSignatureForm from "./Component/ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "./Component/SignaturePreview/SignaturePreview";
import "./app.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signature: "",
            template: "",
            photoDir: "",
            photoName: "",
            name: "Your name",
            jobTitle: "Your job title",
            siteHost: "Your site link",
            phone: "Your phone number",
            phoneBookUrl: "Your phone book url"
        }
    }

    setSignature = (signature) => {
        this.setState({
            signature: signature
        })
    }

    setTemplate = (template) => {
        this.setState({
            template: template
        })
    }

    render() {
      return <div className={"app"}>
          <div className={"form"}>
              <ImageLoader />
              <ManagerSignatureForm onBoxChange={this.setSignature} onTemplateChange={this.setTemplate}/>
          </div>
          <SignaturePreview
              signature={this.state.signature}
              template={this.state.template}
              photoDir={this.state.photoDir}
              photoName={this.state.photoName}
              name={this.state.name}
              jobTitle={this.state.jobTitle}
              siteHost={this.state.siteHost}
              phone={this.state.phone}
              phoneBookUrl={this.state.phoneBookUrl}
          />
      </div>
    }
}