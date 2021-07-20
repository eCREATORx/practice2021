import * as React from "react";
import {Formik, Field, ErrorMessage, Form} from 'formik';
import Select from 'react-select';
import axios from "axios";
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
            boxId: null
        }

        this.getUserBoxes();
        this.getTemplates();

        this.reset_button = React.createRef();
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
        try {
            const axiosRequestConfig = {
                params: {
                    'box_id': index
                }
            };

            const response = await axios.get('/get_signature', axiosRequestConfig);
            this.props.onBoxChange(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async getTemplateStructure(index) {
        try {
            const axiosRequestConfig = {
                params: {
                    'template_id': index
                }
            };

            const response = await axios.get('/get_template_structure', axiosRequestConfig);
            this.setState({
                fields: response.data[0].scheme
            });
            this.props.onTemplateChange(response.data[0].content);
        } catch (error) {
            console.log(error);
        }
    }

    async setSignature(boxId, signature) {
        try {
            const axiosRequestConfig = {
                params: {
                    'box_id': boxId,
                    'signature': signature
                }
            };
            await axios.get('/set_signature', axiosRequestConfig);
        } catch (error) {
            console.log(error);
        }
    }

    onBoxChange = (selected) => {
        this.getSignature(selected.value);
        this.setState({
            boxId: selected.value
        })
    }

    onSignatureTemplateChange = (selected) => {
        this.reset_button.current.click();
        this.getTemplateStructure(selected.value);
    }

    onInputChange(event) {
        this.props.onInputChange(event.target.name, event.target.value);
    }

    onSubmit = (fields) => {
        if (this.state.boxId)
        {
            console.log(JSON.stringify(fields, null, 4));
            console.log(this.state.boxId);
            console.log(this.props.newSignature);
/*                    this.setSignature(this.state.boxId, this.props.newSignature);*/
        }
    }

    validateField(value) {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }

    camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return "";
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    /*    setInitialValues() {
            let initialValues = {};
            this.state.fields.map(field => initialValues[field.replace(/\s/g, '')] = "");
            console.log(initialValues);
        }*/

    render() {
        return <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            onSubmit={this.onSubmit}
        >
            {props => (
                <Form className={"form-select-input"}>
                    <div>
                        <Select
                            placeholder={"Box"}
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
                    </div>
                    <textarea className={"form-control"}/>
                    {
                        (this.state.fields.length > 0)
                            ? <div className={"form-input"}>
                                {this.state.fields.map(field => {
                                        let fieldName = this.camelize(field);
                                        return <div key={field}>
                                            <label htmlFor={fieldName} className={"form-label"}>{field}</label>
                                            <Field name={fieldName} type={"text"} validate={this.validateField}
                                                   className={"form-control"} onChange={(e) => {props.handleChange(e); this.onInputChange(e)}}/>
                                            <ErrorMessage name={fieldName} component={"div"} className={"error-message"}/>
                                        </div>
                                    }
                                )}
                                <button type={"submit"} className="btn btn-success">Save signature</button>
                            </div>
                            : <div/>
                    }
                    <button type={"reset"} ref={this.reset_button} style={{display: 'none'}}>Reset fields</button>
                </Form>
            )}
        </Formik>
    }
}