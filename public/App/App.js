import * as React from "react";
import PhotoLoader from "./Component/PhotoLoader/PhotoLoader";
import ManagerSignatureForm from "./Component/ManagerSignatureForm/ManagerSignatureForm";
import SignaturePreview from "./Component/SignaturePreview/SignaturePreview";

export default class App extends React.Component {
    render() {
      return <div id={"app"}>
          <PhotoLoader />
          <ManagerSignatureForm />
          <SignaturePreview />
      </div>
    }
}