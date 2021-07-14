import * as React from "react";
import { Formik, Form } from 'formik';
import Select from 'react-select';
import axios from "axios";
import "./managersignatureform.css";

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: []
        }

        this.getUserBoxes();
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

    handleChange = (selected) => {
        this.getSignature(selected.value);
    }

    render() {
        return <Formik
            initialValues={{}}
            onSubmit={{}}
        >
            <Form className={"form_select"}>
                <Select
                    placeholder={"Box"}
                    options={this.state.boxes.map(box => ({ label: box.address, value: box.id }))}
                    onChange={this.handleChange}
                    className={"box_select"}
                />
                <Select
                    placeholder={"Signature"}
                    className={"signature_select"}
                />
            </Form>
        </Formik>
    }
}