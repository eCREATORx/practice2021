import * as React from "react";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import Select from 'react-select';
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {sendGetRequest, sendPostRequest} from "../../Util/RequestUtil";
import {camelize} from "../../Util/StringUtil";
import {parseHtml} from "../ManagerSignatureEditor/ManagerSignatureEditor";
import {RequestUrl} from "../../Model/RequestUrl";
import {SiteHosts} from "../../Model/SiteHosts";
import ImageLoader from "../ImageLoader/ImageLoader";
import {showErrorMessage, showSuccessMessage} from "../../Util/NotificationUtil";

export default class ManagerSignatureForm extends React.Component {
    boxFormState = {};
    initialValues = {};

    constructor(props) {
        super(props);

        this.state = {
            boxes: [],
            templates: [],
            fields: [],
            boxId: null,
            siteHost: null,
            mailBody: "",
            template: "",
            fileUrlForPreview: "",
            fileUrlForDb: "",
            inputClass: ""
        }

        this.setUserBoxes();
        this.setTemplates();

        this.form = React.createRef();
        this.resetButton = React.createRef();
    }

    async setUserBoxes() {
        let response, error;
        [response, error] = await sendGetRequest(RequestUrl.getUserBoxes, {
            'user_id': 1
        });

        if (error) {
            console.log(error);
            return null;
        }

        this.setState({
            boxes: response.data
        });
        response.data.forEach(box => {
            this.boxFormState[box.id] = {}
        });
    }

    async setTemplates() {
        let response, error;
        [response, error] = await sendGetRequest(RequestUrl.getTemplates);

        if (error) {
            console.log(error);
            return null;
        }

        this.setState({
            templates: response.data
        });

        for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].scheme.length; j++) {
                let fieldName = camelize(response.data[i].scheme[j]);
                this.initialValues[fieldName] = "";
            }
        }
    }

    async getSignature(boxId) {
        let signature = "<div></div>";
        let response, error;
        [response, error] = await sendGetRequest(RequestUrl.getSignature, {
            'user_id': 1,
            'box_id': boxId
        });

        if (error) {
            console.log(error);
            return null;
        }

        if (response.data.length) {
            signature = response.data;
        }

        return signature;
    }

    async saveSignature(boxId, signature) {
        let response, error;
        [response, error] = await sendPostRequest(RequestUrl.saveSignature, signature, {
            'user_id': 1,
            'box_id': boxId
        });

        if (error) {
            console.log(error);
        }
    }

    onBoxChange = async (selected, props) => {
        this.resetButton.current.click();

        this.props.onBoxChange(await this.getSignature(selected.value));
        this.setState({
            boxId: selected.value
        });

        const fields = Object.keys(this.boxFormState[selected.value]);
        for (const field of fields) {
            props.setFieldValue(field, this.boxFormState[selected.value][field]);
        }
    }

    onSignatureTemplateChange = async selected => {
        this.resetButton.current.click();
        this.boxFormState[this.state.boxId] = {};

        this.state.templates.forEach(template => {
            if (template.id === selected.value) {
                this.setState({
                    fields: template.scheme,
                    template: template.content
                });
                this.props.onTemplateChange(template.content, template.scheme);
            }
        })
    }

    onSiteHostChange = selected => {
        this.props.onFormChange("siteHost", selected.value);
        if (this.state.boxId) {
            this.boxFormState[this.state.boxId]["siteHost"] = selected.value;
        }
        this.setState({
            siteHost: selected.value
        });
    }

    onInputChange(event, props) {
        props.handleChange(event);
        event.target.value ? event.target.classList.remove('is-invalid') : event.target.classList.add('is-invalid');
        this.props.onFormChange(event.target.name, event.target.value);
        if (this.state.boxId) {
            this.boxFormState[this.state.boxId][event.target.name] = event.target.value;
        }
    }

    onSubmit = async () => {
        if (this.state.siteHost) {
            const signature = this.state.mailBody + parseHtml(this.state.template, this.state.fields, this.state.fileUrlForDb, this.boxFormState[this.state.boxId]);
            await this.saveSignature(this.state.boxId, signature);
            await sendPostRequest(RequestUrl.uploadImage, new FormData(this.form.current), {});
            this.props.onBoxChange(await this.getSignature(this.state.boxId));

            showSuccessMessage("Signature is good!");
            return;
        }

        showErrorMessage("Please select a site host");
    }

    onTextAreaChange(event, props) {
        props.handleChange(event);
        const mailBody = '<div class="mail-body">' + event.target.value + '</div>';
        this.props.onTextAreaChange(mailBody);
        this.setState({
            mailBody: mailBody
        });
    }

    validateField(value) {
        let error;
        if (!value) {
            error = ' Required';
        }

        return error;
    }

    handleFileChange = (fileUrlForPreview, fileUrlForDb) => {
        this.setState({
            fileUrlForPreview: fileUrlForPreview,
            fileUrlForDb: fileUrlForDb
        })
        this.props.onImageChange(fileUrlForPreview);
    }

    render() {
        return <Formik
            initialValues={this.initialValues}
            validateOnBlur={false}
            onSubmit={this.onSubmit}
        >
            {props => (
                <Form ref={this.form} className={"form"}>
                    <div className={"form-top"}>
                        <ImageLoader onImageChange={this.handleFileChange}/>
                        <div className={"select-textarea"}>
                            <Select
                                placeholder={"Box"}
                                options={this.state.boxes.map(box => ({label: box.address, value: box.id}))}
                                onChange={selected => this.onBoxChange(selected, props)}
                                className={"box-select"}
                            />
                            <Select
                                placeholder={"Signature"}
                                options={this.state.templates.map(template => ({
                                    label: template.name,
                                    value: template.id
                                }))}
                                onChange={this.onSignatureTemplateChange}
                                className={"signature-select"}
                            />
                            <textarea
                                name={"textArea"}
                                className={"form-control"}
                                onChange={event => this.onTextAreaChange(event, props)}
                            />
                        </div>
                    </div>
                    {
                        (this.state.fields.length && this.state.boxId)
                            ? <div className={"form-bottom"}>
                                {this.state.fields.map(field => {
                                        let fieldName = camelize(field);
                                        if (fieldName !== "siteHost") {
                                            (props.errors[fieldName] && props.touched[fieldName])
                                                ? this.state.inputClass = "form-control is-invalid"
                                                : this.state.inputClass = "form-control"

                                            return <div key={fieldName}>
                                                <label htmlFor={fieldName} className={"form-label"}>{field}</label>
                                                <ErrorMessage name={fieldName} component={"span"} className={"error-message"}/>
                                                <Field
                                                    name={fieldName}
                                                    type={"text"}
                                                    validate={this.validateField}
                                                    className={this.state.inputClass}
                                                    onChange={event => this.onInputChange(event, props)}
                                                />
                                            </div>
                                        } else {
                                            return <div key={fieldName}>
                                                <label className={"form-label"}>{field}</label>
                                                <Select
                                                    value={this.state.boxId
                                                        ? SiteHosts.find(siteHost => siteHost.value === this.boxFormState[this.state.boxId].siteHost) || null
                                                        : null}
                                                    placeholder={"Site host"}
                                                    options={SiteHosts}
                                                    className={"site-host-select"}
                                                    onChange={this.onSiteHostChange}
                                                />
                                            </div>
                                        }
                                    }
                                )}
                                <button type={"submit"} className={"btn btn-success"}>Save signature</button>
                            </div>
                            : <div/>
                    }
                    <button type={"reset"} ref={this.resetButton} className={"d-none"}>Reset fields</button>
                </Form>
            )}
        </Formik>
    }
}