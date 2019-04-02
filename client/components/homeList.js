import React from "react";
import { connect } from "react-redux";
import ModalPage from "../container/modalPage";
import TaskList from "./taskList";

class HomeList extends React.Component {

    render() {

        return (<div id="homeList">
            {this.props.User.todolist.length === 0 ?
                <div id="adsEmptyBox">You currently have no tasks</div> :
                <div id="adsBox">
                    <TaskList />

                </div>
            }
            {this.props.Modal.IsOpen && <ModalPage />}
        </div>)
    }
}


export default connect(state => ({ User: state.User, Modal: state.Modal }))(HomeList);




