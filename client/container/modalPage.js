import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddTASK } from "../store/actions/user";
import { SetMODAL } from "../store/actions/modal";
import UploadImage from "./uploadImage";
import HandleSubmitModal from "./handleSubmitModal";


const customStyles = {
    content: {
        width: "80vw",
        margin: "5vw",
        backgroundColor: "#1D2733"
    }
};

Modal.setAppElement("#app");

class ModalPage extends React.Component {
    state = { name: "", describe: "", status: "OFF", picture: "" };

    componentWillMount() {
        this.props.Image.image = false;
        this.props.Image.selectedFile = null;
        this.props.Image.info = false;
        if (this.props.Modal.Operation === null) {
            this.setState({ name: "", describe: "", status: "OFF", picture: "" });
        } else {
            const { taskName, taskDescribe, taskStatus, taskImage } = this.props.Modal.Operation;
            const picture = (taskImage.slice(0, 4) === "dist" ? taskImage.slice(12) : taskImage.slice(21));
            this.setState({ name: taskName, describe: taskDescribe, status: taskStatus, picture });
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.Modal.IsOpen} ariaHideApp={false} style={customStyles}>

                <div id="form-outer">
                    <h1>Task Form</h1>
                    <p>Please, fill in the form of your task to add to the list</p>
                    <form id="survey-form" onSubmit={this.handleSubmit}>

                        <div className="rowTab">
                            <div className="labels">
                                <label id="name-label" htmlFor="name">* Task Name </label>
                            </div>
                            <div className="rightTab">
                                <input type="text" id="name" className="input-field"
                                    placeholder="Enter task name" value={this.state.name}
                                    onChange={(event) => this.setState({ name: event.target.value })} required />
                            </div>
                        </div>

                        <div className="rowTab">
                            <div className="labels">
                                <label htmlFor="comments">* Describe task </label>
                            </div>
                            <div className="rightTab">
                                <textarea id="comments" className="textarea-field"
                                    placeholder="Enter your task here..." value={this.state.describe}
                                    onChange={(event) => this.setState({ describe: event.target.value })} required></textarea>
                            </div>
                        </div>

                        <div className="rowTab">
                            <div className="labels">
                                <label >* Task Status </label>
                            </div>
                            <div className="rightTab">
                                <label className="radio-field">
                                    <input type="radio" value={"ON"}
                                        checked={this.state.status === "ON"}
                                        onChange={() => this.setState({ status: "ON" })} /> ON </label>

                                <label className="radio-field">
                                    <input type="radio" value={"OFF"}
                                        checked={this.state.status === "OFF"}
                                        onChange={() => this.setState({ status: "OFF" })} /> OFF </label>

                            </div>
                        </div>
                        <br /><br />
                        <div className="center"><UploadImage picture={this.state.picture} /></div>
                        <br />
                        <HandleSubmitModal State={this.state} />
                        <button className="button button2" onClick={() => this.props.SetMODAL({ IsOpen: false, Operation: null })}>CANCEL</button>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default connect(state => ({ User: state.User, Image: state.Image, Modal: state.Modal }),
    dispatch => bindActionCreators({ AddTASK, SetMODAL }, dispatch))(ModalPage);












/*import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddTASK } from "../store/actions/user";
import { SetMODAL } from "../store/actions/modal";
import UploadImage from "./uploadImage";
import PostTask from "../services/postTask";
import HandleSubmitModal from "./handleSubmitModal";
import handleSubmitModal from "./handleSubmitModal";

const customStyles = {
    content: {
        width: "80vw",
        margin: "5vw",
        backgroundColor: "#1D2733"
    }
};

Modal.setAppElement("#app");

class ModalPage extends React.Component {
    state = { name: "", describe: "", status: false, picture: "" };

    componentWillMount() {
        this.props.Image.image = false;
        this.props.Image.selectedFile = null;
        this.props.Image.info = false;
        if (this.props.Modal.Operation === null) {
            this.setState({ name: "", describe: "", status: false, picture: "" });
        } else {
            const { taskName, taskDescribe, taskStatus, taskImage } = this.props.Modal.Operation;
            const picture = (taskImage.slice(0, 4) === "dist" ? taskImage.slice(12) : taskImage.slice(21));
            this.setState({ name: taskName, describe: taskDescribe, status: taskStatus, picture });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { name, describe, status } = this.state;
        if (name.length > 0 && describe.length > 0) {
            const { image, info, selectedFile } = this.props.Image;

            const obj = {
                _id: this.props.User._id,
                taskNumber: this.props.User.number + 1,
                taskName: name,
                taskDescribe: describe,
                taskStatus: status
            };

            if (image && info) {
                this.props.SetMODAL({ IsOpen: false, Operation: null });
                PostTask(selectedFile, obj)
                    .then(res => this.props.AddTASK(res.data))

            }
            else {
                this.props.SetMODAL({ IsOpen: false, Operation: null });
                PostTask(null, obj)
                    .then(res => this.props.AddTASK(res.data));
            }
        } else {
            this.setState({ name: "", describe: "", status: false });
        }
    };

    render() {
        return (
            <Modal isOpen={this.props.Modal.IsOpen} ariaHideApp={false} style={customStyles}>

                <div id="form-outer">
                    <h1>Task Form</h1>
                    <p>Please, fill in the form of your task to add to the list</p>
                    <form id="survey-form" onSubmit={this.handleSubmit}>

                        <div className="rowTab">
                            <div className="labels">
                                <label id="name-label" htmlFor="name">* Task Name </label>
                            </div>
                            <div className="rightTab">
                                <input type="text" id="name" className="input-field"
                                    placeholder="Enter task name" value={this.state.name}
                                    onChange={(event) => this.setState({ name: event.target.value })} required />
                            </div>
                        </div>

                        <div className="rowTab">
                            <div className="labels">
                                <label htmlFor="comments">* Describe task </label>
                            </div>
                            <div className="rightTab">
                                <textarea id="comments" className="textarea-field"
                                    placeholder="Enter your task here..." value={this.state.describe}
                                    onChange={(event) => this.setState({ describe: event.target.value })} required></textarea>
                            </div>
                        </div>

                        <div className="rowTab">
                            <div className="labels">
                                <label >* Task Status </label>
                            </div>
                            <div className="rightTab">
                                <label className="radio-field"><input name="radio" type="radio"
                                    defaultChecked={this.state.status}
                                    onChange={() => this.setState({ status: true })} /> On  </label>
                                <label className="radio-field"><input name="radio" type="radio"
                                    defaultChecked={!this.state.status}
                                    onChange={() => this.setState({ status: false })} /> Off </label>
                            </div>
                        </div>
                        <br /><br />
                        <div className="center"><UploadImage picture={this.state.picture} /></div>
                        <br />
                        <button className="button" type="submit" onClick={this.handleSubmit}>SUBMIT</button>
                        <button className="button button2" onClick={() => this.props.SetMODAL({ IsOpen: false, Operation: null })}>CANCEL</button>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default connect(state => ({ User: state.User, Image: state.Image, Modal: state.Modal }),
    dispatch => bindActionCreators({ AddTASK, SetMODAL }, dispatch))(ModalPage);*/


