import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import usersReducer from "./reducer/usersReducer";
import tasksReducer from "./reducer/tasksReducer";
import modalReducer from "./reducer/modalReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
  users: usersReducer,
  tasks: tasksReducer,
  modal: modalReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
