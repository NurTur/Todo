import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { SetMODAL } from "../store/actions/modal";
import { bindActionCreators } from "redux";

class HomeHeader extends React.Component {
    render() {
        return (<header>
            <div id="headerPage">
                <div className="headerContainer" >
                    <div className="greeting1"><div className="text">Wellcome,</div></div>
                    <div className="greeting2"><div className="text">{this.props.username} !!!</div></div>
                    <div className="navig">
                        <button id="nav1">Delete List</button>
                        <button id="nav1" onClick={() => this.props.SetMODAL(true)}>Add Task</button>
                        <NavLink to="/" style={{ textDecoration: "none" }} onClick={() => this.props.onSetID("")}>
                            <button id="nav1">Log Out</button></NavLink>
                    </div>
                </div>
            </div>
        </header >)
    }
}

export default connect(state => ({ Modal: state.Modal }),
    dispatch => bindActionCreators({ SetMODAL }, dispatch))(HomeHeader);
