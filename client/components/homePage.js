import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { SetID } from "../store/actions/user";
import HomeHeader from "./homeHeader";
import HomeList from "./homeList";


class HomePage extends React.Component {

    onSetID = (st) => this.props.SetID(st);

    render() {
        return (<div id="HomePage" >
            <HomeHeader
                onSetID={this.onSetID}
                username={this.props.User.username} />
            <main>
                <HomeList />
            </main>
        </div >);

    }
}

export default connect(state => ({ User: state.User }),
    dispatch => bindActionCreators({ SetID }, dispatch))(HomePage);


