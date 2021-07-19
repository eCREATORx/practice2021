import * as React from "react";
import { Formik, Field, ErrorMessage, Form } from 'formik';
import Select from 'react-select';
import axios from "axios";
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';

let initialValues = {};

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: [],
            templates: [],
            fields: []
        }

        this.getUserBoxes();
        this.getTemplates();
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

            this.setInitialValues();
        } catch (error) {
            console.log(error);
        }
    }

    onBoxChange = (selected) => {
        this.getSignature(selected.value);
    }

    onSignatureTemplateChange = (selected) => {
        this.getTemplateStructure(selected.value);
    }

    onSubmit(fields) {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    }

    validateField(value) {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    }

    setInitialValues() {
        initialValues = {};
        this.state.fields.map(field => initialValues[field.replace(/\s/g, '')] = "");
        console.log(initialValues);
    }

    render() {
        return <Formik
            initialValues={initialValues}
            validateOnBlur={false}
            onSubmit={this.onSubmit}
        >
            <Form className={"form-select-input"}>
                <div>
                    <Select
                        placeholder={"Box"}
                        options={this.state.boxes.map(box => ({ label: box.address, value: box.id }))}
                        onChange={this.onBoxChange}
                        className={"box-select"}
                    />
                    <Select
                        placeholder={"Signature"}
                        options={this.state.templates.map(template => ({ label: template.name, value: template.id }))}
                        onChange={this.onSignatureTemplateChange}
                        className={"signature-select"}
                    />
                </div>
                <textarea className={"form-control"}/>
                {
                    (this.state.fields.length > 0)
                        ? <div className={"form-input"}>
                            {this.state.fields.map(field => {
                                    let fieldName = field.replace(/\s/g, '');
                                    return <div key={field}>
                                        <label htmlFor={fieldName} className={"form-label"}>{field}</label>
                                        <Field name={fieldName} type={"text"} validate={this.validateField} className={"form-control"}/>
                                        <ErrorMessage name={fieldName} component={"div"} className={"error-message"}/>
                                    </div>
                                }
                            )}
                            <button type={"submit"} className="btn btn-success">Save signature</button>
                        </div>
                        : <div/>
                }
            </Form>
        </Formik>
    }
}