import * as React from "react";
import styled from 'styled-components';
import "./photoloader.css";

const InputButton = styled.button`
              display: block;
              width: 150px;
              background: green;
              color: white;
              border: 0;
              border-radius: 5px;
              padding: 5px 10px;
              margin: 10px 0;
        `;

export default class PhotoLoader extends React.Component {

    validatePhoto(files) {
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
            window.alert("Photo is good!");
            document.getElementById('signature_photo').src = URL.createObjectURL(image);
        }
        else
        {
            window.alert("Please change photo (png, less than 5Mb)");
            document.getElementById('input_photo').value = "";
        }
    }

    handleClick() {
        document.getElementById("input_photo").click();
    }

    render() {
        return <div id={"photo_loader"}>
            <img id={"signature_photo"} src={"https://w7.pngwing.com/pngs/891/105/png-transparent-computer-icons-user-others-miscellaneous-face-service.png"}/>
            <InputButton onClick={this.handleClick}>Upload photo</InputButton>
            <input id={"input_photo"} type={"file"} style={{display: 'none'}} onChange={ event => { this.validatePhoto(event.target.files) } } />
        </div>
    }
}