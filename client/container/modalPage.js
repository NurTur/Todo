import React from "react";
import Modal from "react-modal";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AddTASK } from "../store/actions/user";
import UploadImage from "./uploadImage";
import PostTask from "../services/postTask";


const customStyles = {
    content: {
        width: "80vw",
        margin: "5vw",
        backgroundColor: "#1D2733"
    }
};

Modal.setAppElement("#app");

class ModalPage extends React.Component {
    state = { name: "", describe: "", status: false };
    closeModal = () => this.props.onCloseModal();

    handleSubmit = e => {
        e.preventDefault();
        const { name, describe, status } = this.state;
        if (name.length > 0 && describe.length > 0) {
            const { image, info } = this.props.Image;

            const obj = {
                _id: this.props.User._id,
                taskNumber: 1,
                taskName: name,
                taskDescribe: describe,
                taskStatus: status
            };

            console.log(image, '  ', info);
            if (image !== false && info) {

                this.props.onCloseModal();
                PostTask(this.props.Image.selectedFile, obj)
                    .then(res => this.props.AddTASK(res.data));
            }
            else {
                this.props.onCloseModal();
                PostTask(null, obj)
                    .then(res => this.props.AddTASK(res.data));
            }
        } else {
            this.setState({ name: "", describe: "", status: false });
        }
    };

    render() {
        return (
            <Modal isOpen={this.props.modalOpen} ariaHideApp={false} style={customStyles}>

                <div id="form-outer">
                    <h1>Task Form</h1>
                    <p>Please, fill in the form of your task to add to the list</p>
                    <form id="survey-form" onSubmit={this.handleSubmit}>

                        <div className="rowTab">
                            <div className="labels">
                                <label id="name-label" htmlFor="name">* Task Name </label>
                            </div>
                            <div className="rightTab">
                                <input type="text" id="name" className="input-field" placeholder="Enter task name"
                                    onChange={(event) => this.setState({ name: event.target.value })} required />
                            </div>
                        </div>

                        <div className="rowTab">
                            <div className="labels">
                                <label htmlFor="comments">* Describe task </label>
                            </div>
                            <div className="rightTab">
                                <textarea id="comments" className="textarea-field" placeholder="Enter your task here..."
                                    onChange={(event) => this.setState({ describe: event.target.value })} required></textarea>
                            </div>
                        </div>

                        <div className="rowTab">
                            <div className="labels">
                                <label >* Task Status </label>
                            </div>
                            <div className="rightTab">
                                <label className="radio-field"><input value={true} name="radio" type="radio"
                                    onChange={(event) => this.setState({ status: event.target.value })} /> On  </label>
                                <label className="radio-field"><input value={false} name="radio" type="radio" defaultChecked={true}
                                    onChange={(event) => this.setState({ status: event.target.value })} /> Off </label>
                            </div>
                        </div>
                        <br /><br />
                        <div className="center"><UploadImage /></div>
                        <br />
                        <button className="button" type="submit" onClick={this.handleSubmit}>SUBMIT</button>
                        <button className="button button2" onClick={this.closeModal}>CANCEL</button>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default connect(state => ({ User: state.User, Image: state.Image }),
    dispatch => bindActionCreators({ AddTASK }, dispatch))(ModalPage);


