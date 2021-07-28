import * as React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import Select from 'react-select';
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {sendGetRequest, sendPostRequest} from "../../Util/RequestUtil";
import {RequestUrl} from "../../Model/RequestUrl";
import ImageLoader from "../ImageLoader/ImageLoader";

const initialValues = {
    name: '',
    jobTitle: '',
    phone: '',
    phoneBookUrl: ''
};

const siteHostOptions = [
    {value: "www.ispringsolutions.com", label: "www.ispringsolutions.com"},
    {value: "www.ispring.fr", label: "www.ispring.fr"},
    {value: "www.ispringlearn.de", label: "www.ispringlearn.de"},
    {value: "www.ispring.es", label: "www.ispring.es"},
    {value: "www.ispring.it", label: "www.ispring.it"},
    {value: "www.ispring.nl", label: "www.ispring.nl"},
    {value: "www.ispringpro.com.br", label: "www.ispringpro.com.br"},
    {value: "www.ispring.pl", label: "www.ispring.pl"},
    {value: "www.ispring.cn", label: "www.ispring.cn"}
];

let formState = {};

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: [],
            templates: [],
            fields: [],
            boxId: null,
            siteHost: null,
            fakeFileUrl: "",
            realFileUrl: ""
        }

        this.getUserBoxes();
        this.getTemplates();

        this.form = React.createRef();
        this.reset_button = React.createRef();
    }

    async getUserBoxes() {
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
            formState[box.id] = {}
        });
    }

    async getTemplates() {
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
        let response, error;
        [response, error] = await sendGetRequest(RequestUrl.getSignature, {
            'box_id': index
        });

        if (error) {
            console.log(error);
            return null;
        }

        if (response.data.length > 0) {
            return response.data;
        } else {
            return "<div></div>";
        }
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

    onBoxChange = async selected => {
        this.reset_button.current.click();

        this.props.onBoxChange(await this.getSignature(selected.value));
        this.setState({
            boxId: selected.value
        });
    }

    onSignatureTemplateChange = async selected => {
        this.reset_button.current.click();
        formState[this.state.boxId] = {};

        const template = await this.getTemplateStructure(selected.value);
        this.setState({
            fields: template.scheme
        });
        this.props.onTemplateChange(template.content);
    }

    onSiteHostChange = selected => {
        this.props.onFormChange("siteHost", selected.value);
        if (this.state.boxId) {
            formState[this.state.boxId]["siteHost"] = selected.value;
        }
        this.setState({
            siteHost: selected.value
        });
    }

    onInputChange(event) {
        event.target.value ? event.target.classList.remove('is-invalid') : event.target.classList.add('is-invalid');
        this.props.onFormChange(event.target.name, event.target.value);
        if (this.state.boxId) {
            formState[this.state.boxId][event.target.name] = event.target.value;
        }
    }

    onSubmit = async () => {
        if (this.state.boxId && this.state.siteHost) {
            const signatureWithRealFileUrl = this.props.newSignature.split(this.state.fakeFileUrl).join(this.state.realFileUrl);
            await this.saveSignature(this.state.boxId, signatureWithRealFileUrl);
            await sendPostRequest(RequestUrl.uploadImage, new FormData(this.form.current), {});
            this.props.onBoxChange(await this.getSignature(this.state.boxId));
            return true;
        }

        let errorMessage = "";

        if (!this.state.boxId)
        {
            errorMessage += "Please select a box\n";
        }
        if (!this.state.siteHost)
        {
            errorMessage += "Please select a site host";
        }

        window.alert(errorMessage);
    }

    onTextAreaChange(event) {
        this.props.onTextAreaChange('<div class="mail-body">' + event.target.value + '</div>');
    }

    checkInvalidStyle = () => {
        this.state.fields.map(field => {
            let fieldName = this.camelize(field);
            let curField = document.getElementById(fieldName);
            if (!curField.value) {
                curField.classList.add("is-invalid");
            }
        })
    }

    validateField(value) {
        let error;
        if (!value) {
            error = ' Required';
        }

        return error;
    }

    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
            if (+match === 0) return "";
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    handleFileChange = (fakeFileUrl, realFileUrl) => {
        this.setState({
            fakeFileUrl: fakeFileUrl,
            realFileUrl: realFileUrl
        })
        this.props.onImageChange(fakeFileUrl);
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
                                onChange={selected => {
                                    this.onBoxChange(selected);
                                    const fields = Object.keys(formState[selected.value]);
                                    for (const field of fields) {
                                        props.setFieldValue(field, formState[selected.value][field]);
                                    }
                                }}
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
                                onChange={event => {
                                    props.handleChange(event);
                                    this.onTextAreaChange(event);
                                }}
                            />
                        </div>
                    </div>
                    {
                        (this.state.fields.length > 0 && this.state.boxId)
                            ? <div className={"form-bottom"}>
                                {this.state.fields.map(field => {
                                        let fieldName = this.camelize(field);
                                        if (fieldName !== "siteHost") {
                                            return <div key={fieldName}>
                                                <label htmlFor={fieldName} className={"form-label"}>{field}</label>
                                                <ErrorMessage name={fieldName} component={"span"} className={"error-message"}/>
                                                <Field
                                                    id={fieldName}
                                                    name={fieldName}
                                                    type={"text"}
                                                    validate={this.validateField}
                                                    className={"form-control"}
                                                    onChange={event => {
                                                        props.handleChange(event);
                                                        this.onInputChange(event);
                                                    }}
                                                />
                                            </div>
                                        } else {
                                            return <div key={fieldName}>
                                                <label className={"form-label"}>{field}</label>
                                                <Select
                                                    id={fieldName}
                                                    value={this.state.boxId
                                                        ? siteHostOptions.find(siteHost => siteHost.value === formState[this.state.boxId].siteHost) || null
                                                        : null}
                                                    placeholder={"Site host"}
                                                    options={siteHostOptions}
                                                    className={"site-host-select"}
                                                    onChange={this.onSiteHostChange}
                                                />
                                            </div>
                                        }
                                    }
                                )}
                                <button type={"submit"} className={"btn btn-success"} onClick={this.checkInvalidStyle}>
                                    Save signature
                                </button>
                            </div>
                            : <div/>
                    }
                    <button type={"reset"} ref={this.reset_button} style={{display: 'none'}}>Reset fields</button>
                </Form>
            )}
        </Formik>
    }
}