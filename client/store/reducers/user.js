import { CREATE, ENTERID, ADDTASK, REMOVETASK, UPDATETASK, DELETETASKS } from "../actions/user";

function FinderRemove(obj, i) {
    return obj.todolist.findIndex((e) => e.taskNumber === i);
}
function FinderUpdate(obj, i) {
    return obj.todolist.findIndex((e) => e.taskNumber === i.taskNumber);
}

const InitalState = { _id: "", username: "", todolist: [], number: 0, operation: "X" };

function User(state = InitalState, action) {
    switch (action.type) {
        case CREATE: return Object.assign({}, action.payload, { operation: "X" });
        case ENTERID: return { _id: action.payload, username: "", todolist: [], number: 0, operation: "X" };
        case ADDTASK: return Object.assign({}, state, {
            todolist: [action.payload, ...state.todolist],
            number: state.number + 1,
            operation: "ADD"
        });
        case REMOVETASK:
            const index = FinderRemove(state, action.payload);
            return Object.assign({}, state, {
                todolist: [...state.todolist.slice(0, index),
                ...state.todolist.slice(index + 1)], operation: "REMOVE"
            });
        case UPDATETASK:
            const ind = FinderUpdate(state, action.payload);
            return Object.assign({}, state, {
                todolist: [...state.todolist.slice(0, ind), action.payload,
                ...state.todolist.slice(ind + 1)], operation: "UPDATE"
            });
        case DELETETASKS: return Object.assign({}, state, {
            todolist: [], number: 0, operation: "DELETE"
        });
        default: return state;
    }
};

export default User;
