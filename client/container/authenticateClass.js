import React from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import AuthRequest from "./authenticateRequest";

class AuthenticateClass extends React.Component {
    state = { text: "Sign Up", username: "", password: "" }

    handleName = (event) => this.setState({ username: event.target.value });
    handlePassword = (event) => this.setState({ password: event.target.value });

    handleHeader = (event) => {
        event.preventDefault();
        if (this.state.text === "Sign Up") {
            this.setState({ text: "Log In" });
        }
        else { this.setState({ text: "Sign Up" }); }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.User._id === "" && this.props.User._id === "X") {
            this.setState({ username: "", password: "" });
        }
        if (prevProps.User._id === "X" && this.props.User._id === "X") {
            this.props.User._id = "";
        }
    }

    render() {
        if (this.props.User._id.length > 1) {
            return (<Redirect to="/game" />);
        } else {

            const { text, username, password } = this.state;

            let id, formtext, resultSubmit, submitText, color;
            if (text === "Log In") {
                id = "nav2";
                formtext = "register for list";
                submitText = "register";
                color = "2";
            } else {
                id = "nav1";
                formtext = "log in for list";
                submitText = "log in";
                color = "1";
            }

            const opacity = ((username.length > 0 && password.length > 0) ? "2" : "1");
            const submitView = `submit opacity${opacity} color${color}`;
            const request = { text, username, password, submitView, submitText };

            if (this.props.User._id === "X") {
                resultSubmit = (id === "nav1" ?
                    <div className="alert" style={{ color: "red" }}><p>Invalid</p><p>username or</p><p>password</p></div> :
                    <div className="alert" style={{ color: "red" }}><p>Such username</p><p>already exists</p></div>);
            } else {
                resultSubmit = <div className="alert"><p>Wellcome,</p><p>please</p><p>{formtext}</p></div>;
            }


            return (<div id="LoginPage">
                <header>
                    <div id="headerPage">
                        <div className="headerContainer" >
                            <div className="navig">
                                <button id={id} onClick={this.handleHeader}>{text}</button>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div id="formContainer">
                        <section id="sec1">{resultSubmit}</section>
                        <section id="sec2">
                            <form className="ui-form">
                                <div className="form-row">
                                    <input type="text" id="username" onChange={this.handleName} value={username} required />
                                    <label htmlFor="username">USERNAME</label>
                                </div>
                                <div className="form-row">
                                    <input type="password" id="password" onChange={this.handlePassword} value={password} required />
                                    <label htmlFor="password">PASSWORD</label>
                                </div>
                            </form>
                            {opacity === "2" ? <AuthRequest Request={request} /> : <input type="submit" className={submitView} value={submitText} />}
                        </section>
                    </div>
                </main>
            </div>

            )
        }
    }
}

export default connect(state => ({ User: state.User }))(AuthenticateClass);

