import * as React from "react";
import "./imageloader.css";
import "bootstrap/dist/css/bootstrap.css";
import {showErrorMessage, showSuccessMessage} from "../../Util/NotificationUtil";

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
                showErrorMessage(errors[i]);
            }
            return;
        }

        showSuccessMessage("Image is good!");

        const fileUrlForPreview = URL.createObjectURL(file);
        const fileUrlForDb = "Data/" + file.name;

        this.setState({
            imageUrl: fileUrlForPreview
        });

        this.props.onImageChange(fileUrlForPreview, fileUrlForDb);
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