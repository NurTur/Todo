import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetIMAGE } from "../store/actions/image";

class UploadImage extends React.Component {
    state = { picture: this.props.picture }

    onFileSelected = (event) => {
        event.preventDefault();
        this.setState(() => ({ picture: "" }));
        const selectedFile = event.target.files[0];
        let image = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
            if ((selectedFile.size / 1024) > 100) {
                let info = false;
                this.props.SetIMAGE({ selectedFile, image, info });
            }
            else {
                let info = true;
                this.props.SetIMAGE({ selectedFile, image, info });
            }
        };
        reader.readAsDataURL(selectedFile);
    };


    removeImage = (event) => {
        event.preventDefault();
        this.props.SetIMAGE({ selectedFile: null, image: false, info: false });
        this.setState(() => ({ picture: "" }));
    }

    render() {
        const { image, selectedFile, info } = this.props.Image;
        const Opera = this.props.Modal.Operation;
        const picture = this.state.picture;

        return (<div id="imageUpload">
            <div className="imageHeader">
                <input
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.onFileSelected}
                />

                <label htmlFor="image_uploads">Choose images to upload (PNG, JPG)</label>
            </div>

            <div className="imageMain">
                {picture === "" &&
                    <div className="text">
                        {image === false ? (<p>No image selected</p>) :
                            (info ? (<div><p>Picture: {selectedFile.name}</p><p>Image size: {(selectedFile.size / 1024).toFixed(2)} KB</p></div>) :
                                <p style={{ color: "red" }}>Please, select image less than 100 KB </p>)}
                    </div>}

                {picture !== "" &&
                    <div className="text">
                        <div><p>Picture: {picture}</p>
                            <p>Image loaded: {new Date(parseInt(Opera.Date)).toLocaleDateString()}</p></div>
                    </div>}
                <div className="image">
                    {image && picture === "" && <img className="imageView" src={image} />}
                    {picture !== "" && <img className="imageView" src={Opera.taskImage} />}
                </div>

            </div>
            <div className="imageFooter">
                <button className="imageButton" onClick={this.removeImage}>Remove image</button>
            </div>
        </div >
        );
    }
}


export default connect(state => ({ Image: state.Image, Modal: state.Modal }),
    dispatch => bindActionCreators({ SetIMAGE }, dispatch))(UploadImage);
