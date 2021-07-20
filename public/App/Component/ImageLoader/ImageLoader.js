import * as React from "react";
import "./imageloader.css";

export default class ImageLoader extends React.Component {
    constructor(props) {
        super(props);

        this.input_image = React.createRef();
        this.signature_image = React.createRef();
    }

    validateImage(files) {
        const image = files[0] ?? null;
        if (!image)
        {
            return;
        }

        const imageName = image.name;
        const imageSize = image.size;

        const lastDot = imageName.lastIndexOf('.');
        const extension = imageName.substring(lastDot + 1);

        if (extension === "png" && imageSize <= 5000000)
        {
            this.signature_image.current.src = URL.createObjectURL(image);
            this.props.onImageChange(this.signature_image.current.src);
        }
        else
        {
            window.alert("Please change image (png, less than 5Mb)");
            this.input_image.current.value = "";
        }
    }

    handleClick = () => {
        this.input_image.current.click();
    }

    render() {
        return <div className={"image-loader"}>
            <img ref={this.signature_image} className={"signature-image"} src={"https://w7.pngwing.com/pngs/891/105/png-transparent-computer-icons-user-others-miscellaneous-face-service.png"}/>
            <button className={"btn btn-success"} onClick={this.handleClick}>Upload image</button>
            <input ref={this.input_image} type={"file"} style={{display: 'none'}} onChange={ event => { this.validateImage(event.target.files) } } />
        </div>
    }
}