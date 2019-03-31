import { combineReducers } from "redux";
import User from "./reducers/user";
import Image from "./reducers/image";
import Modal from "./reducers/modal";

const BaseReducer = combineReducers({ User, Image, Modal });

export default BaseReducer;
