import { MODAL } from "../actions/modal";

const InitalState = false;
function Modal(state = InitalState, action) {
    switch (action.type) {
        case MODAL: return action.payload;
        default: return state;
    }
};

export default Modal;
