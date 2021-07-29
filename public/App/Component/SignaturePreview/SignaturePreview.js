import * as React from "react";
import Interweave from 'interweave';
import "./signaturepreview.css";

export default class SignaturePreview extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.mailBody !== this.props.mailBody ||
            prevProps.fileUrlForPreview !== this.props.fileUrlForPreview ||
            prevProps.name !== this.props.name ||
            prevProps.jobTitle !== this.props.jobTitle ||
            prevProps.siteHost !== this.props.siteHost ||
            prevProps.phone !== this.props.phone ||
            prevProps.phoneBookUrl !== this.props.phoneBookUrl
        ) {
            const signatureHtml = this.parseHtml(this.props.mailBody + this.props.template);
            this.props.onSignatureChange(signatureHtml);
        }
    }

    parseHtml(html) {
        let parsedHtml;
        let indexStart = html.indexOf("{");
        parsedHtml = html.substring(0, indexStart);

        while (indexStart !== -1) {
            const indexEnd = html.indexOf("}", indexStart);
            const param = html.substring(indexStart, indexEnd + 1);

            if (param === "{this.props.imageUrl}") {
                parsedHtml += this.props.fileUrlForPreview;
            }
            else if (param === "{this.props.name}") {
                parsedHtml += this.props.name;
            }
            else if (param === "{this.props.jobTitle}")
            {
                parsedHtml += this.props.jobTitle;
            }
            else if (param === "{this.props.siteHost}")
            {
                parsedHtml += this.props.siteHost;
            }
            else if (param === "{this.props.phone}")
            {
                parsedHtml += this.props.phone;
            }
            else if (param === "{this.props.phoneBookUrl}")
            {
                parsedHtml += this.props.phoneBookUrl;
            }

            indexStart = html.indexOf("{", indexEnd);
            if (indexStart !== -1)
            {
                parsedHtml += html.substring(indexEnd + 1, indexStart);
            }
            else
            {
                parsedHtml += html.substring(indexEnd + 1);
            }
        }

        return parsedHtml;
    }

    minimizeHtml(html) {
        return html.trim().replace(/\r?\n|\r|\s\s+/g, '');
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
                        ? <Interweave content={this.parseHtml(this.props.template)} tagName={"div"}/>
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