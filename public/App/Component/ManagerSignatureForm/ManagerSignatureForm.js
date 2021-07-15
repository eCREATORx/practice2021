import * as React from "react";
import { Formik, Form } from 'formik';
import Select from 'react-select';
import axios from "axios";
import "./managersignatureform.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: [],
            templates: [],
            fields: ""
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

    onBoxChange = (selected) => {
        this.getSignature(selected.value);
    }

    onSignatureTemplateChange = (selected) => {
        this.setState({
            fields: selected.value
        })
    }

    render() {
        return <Formik
            initialValues={{}}
            onSubmit={{}}
        >
            <Form className={"form-select-input"}>
                <div>
                    <Select
                        placeholder={"Box"}
                        options={this.state.boxes.map(box => ({ label: box.address, value: box.id }))}
                        onChange={this.onBoxChange}
                        className={"box_select"}
                    />
                    <Select
                        placeholder={"Signature"}
                        options={this.state.templates.map(template => ({ label: template.name, value: template.scheme }))}
                        onChange={this.onSignatureTemplateChange}
                        className={"signature_select"}
                    />
                </div>
                {
                    (this.state.fields)
                        ? <div className={"form-input"}>
                            {this.state.fields.map(field =>
                                <div key={field}>
                                    <label className={"form-label"}>{field}</label>
                                    <input type={"text"} className={"form-control"}/>
                                </div>
                            )}
                            <button type={"submit"} className="btn btn-success">Save signature</button>
                        </div>
                        : <div/>
                }
            </Form>
        </Formik>
    }
}