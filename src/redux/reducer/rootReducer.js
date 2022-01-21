import { combineReducers } from "redux";
import reducer from "./reducer";
import messageReducer from "./messagereducer";
import searchreducer from "./searchreducer";
import userListReducer from "./userlistReducer";

const rootReducer = combineReducers({
  reducer,
  searchreducer,
  messageReducer,
  userListReducer,
});

export default rootReducer;
