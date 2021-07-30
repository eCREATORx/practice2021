import * as React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import Select from 'react-select';
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {sendGetRequest, sendPostRequest} from "../../Util/RequestUtil";
import {camelize} from "../../Util/StringUtil";
import {RequestUrl} from "../../Model/RequestUrl";
import {SiteHosts} from "../../Model/SiteHosts";
import ImageLoader from "../ImageLoader/ImageLoader";

const initialValues = {
    name: '',
    jobTitle: '',
    phone: '',
    phoneBookUrl: ''
};

let boxFormState = {};

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: [],
            templates: [],
            fields: [],
            boxId: null,
            siteHost: null,
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
        response.data.map(box => {
            boxFormState[box.id] = {}
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
    }

    async getSignature(index) {
        let signature = "<div></div>";
        let response, error;
        [response, error] = await sendGetRequest(RequestUrl.getSignature, {
            'user_id': 1,
            'box_id': index
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

    async getTemplateStructure(index) {
        let response, error;
        [response, error] = await sendGetRequest(RequestUrl.getTemplateStructure, {
            'template_id': index
        });

        if (error) {
            console.log(error);
            return null;
        }

        return response.data[0];
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

        const fields = Object.keys(boxFormState[selected.value]);
        for (const field of fields) {
            props.setFieldValue(field, boxFormState[selected.value][field]);
        }
    }

    onSignatureTemplateChange = async selected => {
        this.resetButton.current.click();
        boxFormState[this.state.boxId] = {};

        const template = await this.getTemplateStructure(selected.value);
        this.setState({
            fields: template.scheme
        });
        this.props.onTemplateChange(template.content);
    }

    onSiteHostChange = selected => {
        this.props.onFormChange("siteHost", selected.value);
        if (this.state.boxId) {
            boxFormState[this.state.boxId]["siteHost"] = selected.value;
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
            boxFormState[this.state.boxId][event.target.name] = event.target.value;
        }
    }

    onSubmit = async () => {
        if (this.state.siteHost)
        {
            const signatureWithFileUrlForDb = this.props.newSignature.split(this.state.fileUrlForPreview).join(this.state.fileUrlForDb);
            await this.saveSignature(this.state.boxId, signatureWithFileUrlForDb);
            await sendPostRequest(RequestUrl.uploadImage, new FormData(this.form.current), {});
            this.props.onBoxChange(await this.getSignature(this.state.boxId));
        }
        else
        {
            let errorMessage = "Please select a site host";
            window.alert(errorMessage);
        }
    }

    onTextAreaChange(event, props) {
        props.handleChange(event);
        this.props.onTextAreaChange('<div class="mail-body">' + event.target.value + '</div>');
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
            initialValues={initialValues}
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
                                                        ? SiteHosts.find(siteHost => siteHost.value === boxFormState[this.state.boxId].siteHost) || null
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