import React from "react";
import { connect } from "react-redux";

class TaskList extends React.Component {

    /*singleRefs = this.props.User.todolist.reduce((acc, value) => {
        acc[value.taskNumber] = React.createRef();
        console.log(acc);
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
    }*/


    render() {
        return (<ul>{this.props.User.todolist.map(e => <li key={e.taskNumber} className="table-row">
            <div className="col-1">
                <img className="picture" /*ref={this.singleRefs[e.taskNumber]} data-*/ src={e.taskImage} alt="" />
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

        </li>)}
        </ul>)
    }
}

export default connect(state => ({ User: state.User }))(TaskList);



