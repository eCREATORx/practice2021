import * as React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import Select from 'react-select';
import axios from "axios";
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {sendGetRequest} from "../../Util/RequestUtil";
import {RequestUrl} from "../../Model/RequestUrl";
import ImageLoader from "../ImageLoader/ImageLoader";

let initialValues = {
    name: '',
    jobTitle: '',
    siteHost: '',
    phone: '',
    phoneBookUrl: ''
};

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: [],
            templates: [],
            fields: [],
            boxId: null,
            fakeFileUrl: "",
            realFileUrl: ""
        }

        this.getUserBoxes();
        this.getTemplates();

        this.reset_button = React.createRef();
        this.box_select = React.createRef();
    }

    async getUserBoxes() {
        try {
            const axiosRequestConfig = {
                params: {
                    'user_id': 1
                }
            };

            const response = await axios.get('/get_user_boxes', axiosRequestConfig);
            this.setState({
                boxes: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getTemplates() {
        try {
            const response = await axios.get('/get_templates');
            this.setState({
                templates: response.data
            })
        } catch (error) {
            console.log(error);
        }
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
        })

        if (error) {
            console.log(error);
            return null;
        }

        return response.data[0];
    }

    async saveSignature(boxId, signature) {
        try {
            const axiosRequestConfig = {
                params: {
                    'user_id': 1,
                    'box_id': boxId,
                    'signature': signature
                }
            };
            await axios.get('/save_signature', axiosRequestConfig);
        } catch (error) {
            console.log(error);
        }
    }

    onBoxChange = async selected => {
        this.props.onBoxChange(await this.getSignature(selected.value));
        this.setState({
            boxId: selected.value
        })
    }

    onSignatureTemplateChange = async selected => {
        this.reset_button.current.click();

        const template = await this.getTemplateStructure(selected.value)
        this.setState({
            fields: template.scheme
        })
        this.props.onTemplateChange(template.content)
    }

    onInputChange(event) {
        event.target.value ? event.target.classList.remove('is-invalid') : event.target.classList.add('is-invalid');
        this.props.onInputChange(event.target.name, event.target.value);
    }

    onSubmit = async () => {
        if (this.state.boxId) {
            const signatureWithRealFileUrl = this.props.newSignature.split(this.state.fakeFileUrl).join(this.state.realFileUrl);
            await this.saveSignature(this.state.boxId, signatureWithRealFileUrl);
            this.props.onBoxChange(await this.getSignature(this.state.boxId));

            await fetch('/upload_image', {
                method: 'POST',
                body: new FormData(document.getElementById("formElem"))
            });
        }
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
        this.props.onImageChange(fakeFileUrl, realFileUrl);
    }

    render() {
        return <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            onSubmit={this.onSubmit}
        >
            {props => (
                <Form id={"formElem"} className={"form"}>
                    <ImageLoader onImageChange={this.handleFileChange}/>
                    <div className={"select-textarea"}>
                        <Select
                            placeholder={"Box"}
                            ref={this.box_select}
                            options={this.state.boxes.map(box => ({label: box.address, value: box.id}))}
                            onChange={this.onBoxChange}
                            className={"box-select"}
                        />
                        <Select
                            placeholder={"Signature"}
                            options={this.state.templates.map(template => ({label: template.name, value: template.id}))}
                            onChange={this.onSignatureTemplateChange}
                            className={"signature-select"}
                        />
                        <textarea name={"textArea"} className={"form-control"} onChange={(e) => {
                            props.handleChange(e);
                            this.onTextAreaChange(e)
                        }}/>
                    </div>
                    {
                        (this.state.fields.length > 0)
                            ? <div className={"form-input"}>
                                {this.state.fields.map(field => {
                                        let fieldName = this.camelize(field);
                                        return <div key={field}>
                                            <label htmlFor={fieldName} className={"form-label"}>{field}</label>
                                            <ErrorMessage name={fieldName} component={"span"} className={"error-message"}/>
                                            <Field id={fieldName} name={fieldName} type={"text"} validate={this.validateField}
                                                   className={"form-control"} onChange={(e) => {
                                                props.handleChange(e);
                                                this.onInputChange(e);
                                            }}/>
                                        </div>
                                    }
                                )}
                                <button type={"submit"} className={"btn btn-success"} onClick={this.checkInvalidStyle}>Save
                                    signature
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