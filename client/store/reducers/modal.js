import { MODAL } from "../actions/modal";

const InitalState = { IsOpen: false, Operation: null }
function Modal(state = InitalState, action) {
    switch (action.type) {
        case MODAL: return action.payload;
        default: return state;
    }
};

export default Modal;
