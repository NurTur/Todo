import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SetUSER, SetID } from "../store/actions/user";

import PostLogin from "../services/postLogin";
import PostRegister from "../services/postRegister";

class AuthenticateRequest extends React.Component {
    handleClick = (event) => {
        event.preventDefault();
        const { text, username, password } = this.props.Request;
        if (text === "Sign Up") {
            this.auth({ username, password });
        }
        else { this.register({ username, password }); }
    }

    register = async (obj) => {
        try {
            const user = await PostRegister(obj);
            if (user._id !== this.props.User._id) {
                this.props.SetUSER(user);
            } else { this.props.SetID("X"); }
        }
        catch (error) {
            console.log(error);
        }
    }

    auth = async (obj) => {
        try {
            const user = await PostLogin(obj);
            if (user._id !== this.props.User._id) {
                this.props.SetUSER(user);
            } else { this.props.SetID("X"); }
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const { submitView, submitText } = this.props.Request;
        return (<input type="submit" className={submitView} value={submitText} onClick={this.handleClick} />)
    }
}

export default connect(state => ({ User: state.User }),
    dispatch => bindActionCreators({ SetUSER, SetID }, dispatch))(AuthenticateRequest);

