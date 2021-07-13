import * as React from "react";

export default class SignaturePreview extends React.Component {
    render() {
        return <div id={"signature_preview"}>
            <div id={"current_signature"}>
                <h1>Editable</h1>
            </div>
            <div id={"new_signature"}>
                <h1>Current</h1>
            </div>
        </div>
    }
}