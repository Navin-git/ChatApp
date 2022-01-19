import { combineReducers } from "redux";
import reducer from "./reducer";
import messageReducer from "./messagereducer";
import searchreducer from "./searchreducer";

const rootReducer = combineReducers({ reducer, searchreducer, messageReducer });

export default rootReducer;
