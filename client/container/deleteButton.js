import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteTASKS } from "../store/actions/user";
import PostTaskDelete from "../services/postTaskDelete";

class DeleteButton extends React.Component {

    onDeleteTasks = async () => {
        try {
            const result = await PostTaskDelete({ Id: this.props.User._id });
            console.log(result);
        }
        catch (err) { console.log(err); }
    }

    handleDelete = (e) => {
        e.preventDefault();
        this.props.DeleteTASKS();
        this.onDeleteTasks();

    };

    render() {
        return (<button id="nav1" onClick={this.handleDelete}>Delete List</button>)
    }
}

export default connect(state => ({ User: state.User }),
    dispatch => bindActionCreators({ DeleteTASKS }, dispatch))(DeleteButton);

