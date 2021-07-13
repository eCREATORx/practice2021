import * as React from "react";
import {Formik} from "formik";
import axios from "axios";

export default class ManagerSignatureForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boxes: []
        }

        const axiosRequestConfig = {
            params: {
                'user_id': 1
            }
        };

        axios.get('/get_user_boxes', axiosRequestConfig)
            .then(response => {
                const boxes = response.data;
                this.setState(
                    {
                        boxes: boxes
                    }
                )
            })
            .catch(function (error){
                console.log(error)
            })

    }

    render() {
        return <Formik initialValues={{box: "Box", signature: "Signature"}} onSubmit={{}}>
            <form id={"form_select"}>
                <select id={"box_select"}>
                    {this.state.boxes.map(box => <option key={box.id}>{box.address}</option>)}
                </select>
                <select id={"signature_select"}>
                    <option>Signature</option>
                </select>
            </form>
        </Formik>
    }
}