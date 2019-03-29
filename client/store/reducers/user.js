import { CREATE, ENTERID, ADDTASK } from "../actions/user";

const InitalState = { _id: "", username: "", todolist: [] };
function User(state = InitalState, action) {
    switch (action.type) {
        case CREATE: return action.payload;
        case ENTERID: return { _id: action.payload, username: "", todolist: [] };
        case ADDTASK: return Object.assign({}, state, { todolist: [...state.todolist, action.payload] });
        default: return state;
    }
};

export default User;
