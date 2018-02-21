import { combineReducers } from "redux";
import MoviesReducer from "./movies_reducer";
const rootReducer = combineReducers({
  movies : MoviesReducer
});

export default rootReducer;
