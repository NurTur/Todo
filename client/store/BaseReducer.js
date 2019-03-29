import { combineReducers } from "redux";
import User from "./reducers/user";
import Image from "./reducers/image";

const BaseReducer = combineReducers({ User, Image });

export default BaseReducer;
