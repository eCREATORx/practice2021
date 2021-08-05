import * as React from "react";
import "./imageloader.css";
import "bootstrap/dist/css/bootstrap.css";
// noinspection ES6CheckImport
import {store} from 'react-notifications-component';

export default class ImageLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '/images/default_image.jpg'
        }

        this.inputImage = React.createRef();
    }

    handleFileChange(files) {
        const file = files[0] ?? null;
        const errors = this.validateFile(file);

        if (errors.length) {
            for (let i = 0; i < errors.length; i++) {
                store.addNotification({
                    title: "Error",
                    message: errors[i],
                    type: "danger",
                    insert: "top",
                    container: "bottom-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
        } else {
            store.addNotification({
                title: "Success",
                message: "Image is good!",
                type: "success",
                insert: "top",
                container: "bottom-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });

            const fileUrlForPreview = URL.createObjectURL(file);
            const fileUrlForDb = "Data/" + file.name;

            this.setState({
                imageUrl: fileUrlForPreview
            });

            this.props.onImageChange(fileUrlForPreview, fileUrlForDb);
        }
    }

    validateFile = file => {
        let errors = [];

        if (!file) {
            errors.push("Please select an image!");
            return errors;
        }

        const imageSize = file.size;
        const imageType = file.type.split('/')[1];
        const maxImageSize = 5000000;
        const mbSize = 1000000;
        const requiredImageType = "png";

        if (imageType === requiredImageType && imageSize <= maxImageSize) {
            return errors;
        }

        if (imageType !== requiredImageType) {
            errors.push("Please change image type (png expected, " + imageType + " given)");
        }
        if (imageSize >= maxImageSize) {
            errors.push("Please change image size (less than 5Mb expected, " + imageSize / mbSize + "Mb given)");
        }

        return errors;
    }

    handleClick = () => {
        this.inputImage.current.click();
    }

    render() {
        return <div className={"image-loader"}>
            <img className={"signature-image"} src={this.state.imageUrl} alt={""}/>
            <button type={"button"} className={"btn btn-success"} onClick={this.handleClick}>Upload image</button>
            <input
                ref={this.inputImage}
                type={"file"}
                name={"image"}
                className={"d-none"}
                onChange={event => this.handleFileChange(event.target.files)}
            />
        </div>
    }
}