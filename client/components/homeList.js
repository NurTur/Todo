import React from "react";
import { connect } from "react-redux";
import ModalPage from "../container/modalPage";
import TaskList from "./taskList";
import { SetMODAL } from "../store/actions/modal";
import { bindActionCreators } from "redux";

class HomeList extends React.Component {


    render() {

        return (<div id="homeList">
            {this.props.User.todolist.length === 0 ?
                <div id="adsEmptyBox">You currently have no tasks</div> :
                <div id="adsBox">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">Picture</div>
                            <div className="col col-2"><div>Name</div><div>Status</div></div>
                            <div className="col col-3">Describe</div>
                            <div className="col col-4">Date</div>
                            <div className="col col-6"></div>
                        </li>
                        <TaskList />
                        {/*this.props.User.todolist.map(e => <li key={e.taskNumber} className="table-row">
                            <div className="col-1">
                                <img className="picture" src={e.taskImage} alt="" />
                                <br />
                                <div>№ {e.taskNumber}</div>
                            </div>
                            <div className="col col-2">
                                <div>{e.taskName}</div>
                                <input type="checkbox" defaultChecked={e.taskStatus} />
                            </div>
                            <div className="col col-3" data-label="Describe">{e.taskDescribe}</div>
                            <div className="col col-4" data-label="Date">
                                <div>
                                    <div>{new Date(parseInt(e.Date)).toLocaleDateString()}</div>
                                    <div>{new Date(parseInt(e.Date)).toLocaleTimeString()}</div>
                                </div>
                            </div>
                            <div className="col col-5">
                                <div className="edit"></div>
                                <div className="remove"></div>
                            </div>

            </li>)*/}

                    </ul>
                </div>
            }
            <ModalPage />
        </div>)
    }
}


export default connect(state => ({ User: state.User, Modal: state.Modal }),
    dispatch => bindActionCreators({ SetMODAL }, dispatch))(HomeList);




