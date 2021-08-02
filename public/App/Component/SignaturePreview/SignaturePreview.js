import * as React from "react";
import Interweave from 'interweave';
import {parseHtml} from "../../Util/ParseUtil";
import "./signaturepreview.css";

export default class SignaturePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={"preview"}>
            <div className={"new-signature"}>
                <h1>Editable</h1>
                {
                    (this.props.mailBody)
                    ? <Interweave content={this.props.mailBody} noWrap={true}/>
                    : <div/>
                }
                {
                    (this.props.template)
                        ? <Interweave content={parseHtml(this.props.template, this.props.imageUrl, this.props.changedVars)} tagName={"div"}/>
                        : <div/>
                }
            </div>
            <div className={"old-signature"}>
                <h1>Current</h1>
                {
                    (this.props.signature)
                        ? <Interweave content={this.props.signature} tagName={"div"}/>
                        : <div/>
                }
            </div>
        </div>
    }
}