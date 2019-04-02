import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddTASK, UpdateTASK } from "../store/actions/user";
import { SetMODAL } from "../store/actions/modal";
import PostTaskCreate from "../services/postTaskCreate";
import PostTaskUpdate from "../services/postTaskUpdate";



class HandleSubmitModal extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        const { name, describe, status } = this.props.State;
        if (name.length > 0 && describe.length > 0) {
            const { image, info, selectedFile } = this.props.Image;
            const Operation = this.props.Modal.Operation;

            /***************************CREAT TASK***********************************/
            if (Operation === null) {
                const obj = {
                    _id: this.props.User._id,
                    taskNumber: this.props.User.number + 1,
                    taskName: name,
                    taskDescribe: describe,
                    taskStatus: status
                };

                if (image && info) {

                    this.props.SetMODAL({ IsOpen: false, Operation: null });
                    PostTaskCreate(selectedFile, obj)
                        .then(res => this.props.AddTASK(res.data));
                }
                else {
                    this.props.SetMODAL({ IsOpen: false, Operation: null });
                    PostTaskCreate(null, obj)
                        .then(res => this.props.AddTASK(res.data));
                }
            }
            /***************************UPDATE TASK***********************************/
            else {
                const obj = {
                    _id: this.props.User._id,
                    taskNumber: Operation.taskNumber,
                    oldImage: Operation.taskImage,
                    Date: Operation.Date,
                    taskName: name,
                    taskDescribe: describe,
                    taskStatus: status
                };

                if (image && info) {
                    this.props.SetMODAL({ IsOpen: false, Operation: null });
                    PostTaskUpdate(selectedFile, obj)
                        .then(res => this.props.UpdateTASK(res.data));
                }
                else {
                    this.props.SetMODAL({ IsOpen: false, Operation: null });
                    PostTaskUpdate(null, obj)
                        .then(res => this.props.UpdateTASK(res.data));
                }
            }

        }
    };

    render() {
        return (<button className="button" type="submit" onClick={this.handleSubmit}>SUBMIT</button>)
    }
}

export default connect(state => ({ User: state.User, Image: state.Image, Modal: state.Modal }),
    dispatch => bindActionCreators({ AddTASK, UpdateTASK, SetMODAL }, dispatch))(HandleSubmitModal);

