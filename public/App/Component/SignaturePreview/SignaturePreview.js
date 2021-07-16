import * as React from "react";
import Interweave from 'interweave';
import "./signaturepreview.css";

export default class SignaturePreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "New name"
        }
    }

    minimizeHtml(html) {
        return html.trim().replace(/\r?\n|\r|\s\s+/g, '');
    }

    getSignatureHtml() {
        const rawSignatureHtml1 = `
    <table class="signature" style="min-width: 320px; max-width: 660px; width: 100%; margin: 0; padding: 0;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
    <td bgcolor="#ffffff">
      <table style="min-width: 320px; width: 100%; padding: 0; margin-bottom: 4px;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
          <td style="width: 80px; padding-top: 15px;" valign="top">
            <img src="https://s4.ispringsolutions.com/message_themes/images/managers64/alex_green64.png" border="0" alt="Alex Green" width="64" height="64" />
          </td>
          <td style="font-family: Roboto, Open Sans, Tahoma, Helvetica, Verdana; padding-top: 15px; font-size: 16px; color: #3d3e47; line-height: 22px;">
            <strong>Alex Green</strong> <br />
            <span style="font-size: 13px;">
Regional Manager - Canada<br />
<strong>
<a style="text-decoration: none; color: #333333;" href="https://www.ispringsolutions.com" target="_blank">
www.ispringsolutions.com
</a>
</strong>
+1 844 347 7764
</span>
          </td>
        </tr>
        <tr>
          <td style="width: 80px; padding-top: 1px;">&nbsp;</td>
          <td style="font-size: 0px; padding-top: 5px; padding-bottom: 20px; height: 41px;">
            <table style="border-collapse: separate; line-height: 100%;" border="0" cellspacing="0" cellpadding="0">
              <tbody>
              <tr>
                <td style="border: solid; border-radius: 50px; border-width: 1px; cursor: auto; mso-padding-alt: 10px 25px; color: #3d3e47;" bgcolor="white">
                  <a style="display: inline-block; background: white; color: black; font-family: Roboto, Open Sans; font-size: 12px; font-weight: normal; line-height: 16px; margin: 0; text-decoration: none; text-transform: none; padding: 6px 15px; mso-padding-alt: 0px; border-radius: 50px;" href="https://calendly.com/alex-green-ispring/15min" target="_blank">
                    Book a call
                  </a>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
  </tbody>
</table>
<table style="width: 90%; max-width: 550px; padding-top: 20px; padding-bottom: 20px; padding-left: 0px; border-top-width: 1px; border-top-style: solid; border-top-color: #DEDEDE;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
    <td>
      <a href="https://www.ispringsolutions.com" target="_blank">
        <img src="https://s4.ispringsolutions.com/uploads/media/ispring_logo_personal_2021.png" border="0" alt="iSpring" width="106" height="26" style="border: 0;" />
      </a>
    </td>
  </tr>
  </tbody>
</table>
`;

        const rawSignatureHtml2 = `
        <table class="signature" style="min-width: 320px; max-width: 660px; width: 100%; margin: 0; padding: 0;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
    <td bgcolor="#ffffff">
      <table style="min-width: 320px; width: 100%; padding: 0; margin-bottom: 4px;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
          <td style="width: 80px; padding-top: 5px;" valign="top">
            <img src="http://s4.ispringsolutions.com/message_themes/images/managers64/danilo_cruz64.png" border="0" alt="Danilo Cruz" width="64" height="64" />
          </td>
          <td style="font-family: Roboto, Open Sans, Tahoma, Helvetica, Verdana; padding-top: 5px; padding-bottom: 15px; font-size: 16px; color: #3d3e47; line-height: 22px;">
            <strong>Danilo Cruz</strong> <br />
            <span style="font-size: 13px;">
Customer Care Manage<br />
<strong>
<a style="text-decoration: none; color: #333333;"<a href="https://www.ispringsolutions.com" target="_blank">
www.ispringsolutions.com
</a>
</strong><br />
+1 844 347 7764
</span>
          </td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
  </tbody>
</table>
<table style="width: 90%; max-width: 550px; padding-top: 20px; padding-bottom: 20px; padding-left: 0px; border-top-width: 1px; border-top-style: solid; border-top-color: #DEDEDE;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
    <td>
      <a href="https://Your site link" target="_blank"><img src="https://s4.ispringsolutions.com/uploads/media/ispring_logo_personal_2021.png" border="0" alt="iSpring" width="106" height="26" style="border: 0;" />
      </a>
    </td>
  </tr>
  </tbody>
</table>
        `;
        return this.minimizeHtml(rawSignatureHtml2);
    }

    getTemplateHtml() {
        const rawTemplateHtml = `
        <table class="signature" style="min-width: 320px; max-width: 660px; width: 100%; margin: 0; padding: 0;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
    <td bgcolor="#ffffff">
      <table style="min-width: 320px; width: 100%; padding: 0; margin-bottom: 4px;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
          <td style="width: 80px; padding-top: 5px;" valign="top">
            <img src="" border="0" alt="Your name" width="64" height="64" />
          </td>
          <td style="font-family: Roboto, Open Sans, Tahoma, Helvetica, Verdana; padding-top: 5px; padding-bottom: 15px; font-size: 16px; color: #3d3e47; line-height: 22px;">
            <strong> Your name </strong> <br />
            <span style="font-size: 13px;">
Your job title<br />
<strong>
<a style="text-decoration: none; color: #333333;"<a href="https://Your site link" target="_blank">
Your site link
</a>
</strong><br />
Your phone number
</span>
          </td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
  </tbody>
</table>
<table style="width: 90%; max-width: 550px; padding-top: 20px; padding-bottom: 20px; padding-left: 0px; border-top-width: 1px; border-top-style: solid; border-top-color: #DEDEDE;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
    <td>
      <a href="https://Your site link" target="_blank"><img src="https://s4.ispringsolutions.com/uploads/media/ispring_logo_personal_2021.png" border="0" alt="iSpring" width="106" height="26" style="border: 0;" />
      </a>
    </td>
  </tr>
  </tbody>
</table>
        `
        return this.minimizeHtml(rawTemplateHtml);
    }

    render() {
        return <div className={"preview"}>
            <div className={"new_signature"}>
                <h1>Editable</h1>
                {
                    (this.props.template)
                        ? <div>
                            <Interweave content={this.props.template}/>
                        </div>
                        : <div>
                            <span>Your name</span>
                            <span>Your jobTitle</span>
                        </div>
                }
            </div>
            <div className={"old_signature"}>
                <h1>Current</h1>
                {
                    (this.props.signature)
                        ? <div><Interweave content={this.props.signature}/></div>
                        : <div>
                            <span>Your name</span>
                            <span>Your jobTitle</span>
                        </div>
                }
            </div>
        </div>
    }
}