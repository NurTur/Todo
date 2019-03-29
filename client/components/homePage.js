import React from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { SetID } from "../store/actions/user";
import ModalPage from "../container/modalPage";

class HomePage extends React.Component {
    state = { modalOpen: false }
    onOpenModal = () => this.setState({ modalOpen: true });
    onCloseModal = () => this.setState({ modalOpen: false });

    render() {
        return (<div id="HomePage" >
            <header>
                <div id="headerPage">
                    <div className="headerContainer" >
                        <div className="greeting1"><div className="text">Wellcome,</div></div>
                        <div className="greeting2"><div className="text">{this.props.User.username} !!!</div></div>
                        <div className="navig">
                            <button id="nav1">Delete List</button>
                            <button id="nav1" onClick={this.onOpenModal}>Add Task</button>
                            <NavLink to="/" style={{ textDecoration: "none" }} onClick={() => this.props.SetID("")}>
                                <button id="nav1">Log Out</button></NavLink>
                        </div>
                    </div>
                </div>
                <ModalPage onCloseModal={this.onCloseModal} modalOpen={this.state.modalOpen} />
            </header>
            <main>
            </main>
        </div >);

    }
}

export default connect(state => ({ User: state.User }),
    dispatch => bindActionCreators({ SetID }, dispatch))(HomePage);


