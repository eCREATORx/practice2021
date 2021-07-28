import * as React from "react";
import "./imageloader.css";
import "bootstrap/dist/css/bootstrap.css"

export default class ImageLoader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: 'default_image.jpg'
        }

        this.input_image = React.createRef();
    }

    handleFileChange(files) {
        const file = files[0] ?? null;
        if (!this.validateFile(file)) {
            return;
        }

        const fakeFileUrl = URL.createObjectURL(file);
        const realFileUrl = "Data/" + file.name;

        this.setState({
            imageUrl: fakeFileUrl
        });

        this.props.onImageChange(fakeFileUrl, realFileUrl);
    }

    validateFile = file => {
        if (!file)
        {
            return false;
        }

        const imageSize = file.size;
        const imageType = file.type;

        if (imageType === "image/png" && imageSize <= 5000000)
        {
            return true;
        }

        let errorMessage =  "";

        if (imageType !== "image/png")
        {
            errorMessage += "Please change image type (png expected, " + imageType.substring(6) + " given)\n";
        }
        if (imageSize >= 5000000)
        {
            errorMessage += "Please change image size (less than 5Mb expected, " + imageSize/1000000 + "Mb given)";
        }

        window.alert(errorMessage);
        this.input_image.current.value = "";
        return false;
    }

    handleClick = () => {
        this.input_image.current.click();
    }

    render() {
        return <div className={"image-loader"}>
            <img className={"signature-image"} src={this.state.imageUrl} alt={""}/>
            <button type={"button"} className={"btn btn-success"} onClick={this.handleClick}>Upload image</button>
            <input
                ref={this.input_image}
                type={"file"}
                name={"image"}
                className={"d-none"}
                onChange={event => this.handleFileChange(event.target.files)}
            />
        </div>
    }
}