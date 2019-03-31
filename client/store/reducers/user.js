import { CREATE, ENTERID, ADDTASK } from "../actions/user";

const InitalState = { _id: "", username: "", todolist: [], number: 0 };
function User(state = InitalState, action) {
    switch (action.type) {
        case CREATE: return action.payload;
        case ENTERID: return { _id: action.payload, username: "", todolist: [], number: 0 };
        case ADDTASK: return Object.assign({}, state, { todolist: [action.payload, ...state.todolist], number: state.number + 1 });
        default: return state;
    }
};

export default User;
