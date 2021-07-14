import * as React from "react";
import "./signaturepreview.css"

export default class SignaturePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"preview"}>
            <div className={"old_signature"}>
                <h1>Editable</h1>
                {
                    (this.props.signature)
                        ? <p>{this.props.signature}</p>
                        : <p><span>Your name</span><span>Your jobTitle</span></p>
                }
            </div>
            <div className={"new_signature"}>
                <h1>Current</h1>
                <p>
                    <span>Your name</span>
                    <span>Your jobTitle</span>
                </p>
            </div>
        </div>
    }
}