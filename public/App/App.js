import * as React from "react";
import ImageLoader from "./Component/ImageLoader/ImageLoader";
import ManagerSignatureForm from "./Component/ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "./Component/SignaturePreview/SignaturePreview";
import "./app.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signature: ""
        }
    }

    setSignature = (signature) => {
        this.setState({
            signature: signature
        })
    }

    render() {
      return <div className={"app"}>
          <div className={"form"}>
              <ImageLoader />
              <ManagerSignatureForm onBoxChange={this.setSignature}/>
          </div>
          <SignaturePreview signature={this.state.signature}/>
      </div>
    }
}