import { SELECTIMAGE } from "../actions/image";

const InitalState = { image: false, selectedFile: null, info: false }

function Image(state = InitalState, action) {
    switch (action.type) {
        case SELECTIMAGE: return action.payload;
        default: return state;
    }
}

export default Image;
