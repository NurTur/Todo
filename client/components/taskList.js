import React from "react";
import { connect } from "react-redux";
import { RemoveTASK } from "../store/actions/user";
import { SetMODAL } from "../store/actions/modal";
import { bindActionCreators } from "redux";
import RemoveTASKDB from "../services/postTaskRemove";

class TaskList extends React.Component {

    singleRefs = this.props.User.todolist.reduce((acc, value) => {
        acc[value.taskKey] = React.createRef();
        return acc;
    }, {});


    options = {
        root: null,
        threshold: 0
    };

    callback = function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    };
    observer = new IntersectionObserver(this.callback, this.options);

    componentDidMount() {
        if (!window['IntersectionObserver']) {
            Object.values(this.singleRefs).forEach(value => {
                value.current.src = value.current.dataset.src;
            }
            );
        } else {
            Object.values(this.singleRefs).forEach((value, index) => {
                this.observer.observe(value.current);
            }
            );
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.User.operation === "UPDATE" || this.props.User.operation === "ADD") {
            Object.values(this.singleRefs).forEach((value, index) => {
                this.observer.observe(value.current);
            });
        }
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextProps.User.operation === "UPDATE" || nextProps.User.operation === "ADD") {
            this.props.User.number = nextProps.User.number;
            this.props.User.todolist = nextProps.User.todolist;
            this.singleRefs = this.props.User.todolist.reduce((acc, value) => {
                acc[value.taskKey] = React.createRef();
                return acc;
            }, {});
        }
    }

    onRemoveTask = (taskNumber) => {
        this.onRemoveTaskDB(taskNumber);
        return this.props.RemoveTASK(taskNumber)
    };

    onUpdateTask = (el) => this.props.SetMODAL({ IsOpen: true, Operation: el });

    onRemoveTaskDB = async (taskNumber) => {
        try {
            const result = await RemoveTASKDB({ _id: this.props.User._id, taskNumber });
            console.log(result);
        }
        catch (err) { console.log(err); }
    }


    render() {

        return (
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">Picture</div>
                    <div className="col col-2"><div>Name</div><div>Status</div></div>
                    <div className="col col-3">Describe</div>
                    <div className="col col-4">Date</div>
                    <div className="col col-6"></div>
                </li>

                {this.props.User.todolist.map((e, i) => <li key={e.taskKey} className="table-row">
                    <div className="col-1">
                        <img className="picture" ref={this.singleRefs[e.taskKey]} data-src={e.taskImage} alt="" />
                        <br />
                        <div>№ {e.taskNumber}</div>
                    </div>
                    <div className="col col-2">
                        <div>{e.taskName}</div>
                        {e.taskStatus === "ON" ? <input type="checkbox" defaultChecked={true} disabled /> : <input type="checkbox" disabled />}
                    </div>
                    <div className="col col-3" data-label="Describe">{e.taskDescribe}</div>
                    <div className="col col-4" data-label="Date">
                        <div>
                            <div>{new Date(parseInt(e.Date)).toLocaleDateString()}</div>
                            <div>{new Date(parseInt(e.Date)).toLocaleTimeString()}</div>
                        </div>
                    </div>
                    <div className="col col-5">

                        <button className="edit" onClick={() => this.onUpdateTask(e)}></button>
                        <button className="remove" onClick={() => this.onRemoveTask(e.taskNumber)}></button>

                    </div>
                </li>)}
            </ul>)
    }
}

export default connect(state => ({ User: state.User, Modal: state.Modal }),
    dispatch => bindActionCreators({ RemoveTASK, SetMODAL }, dispatch))(TaskList);



