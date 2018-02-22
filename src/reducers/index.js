import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import MoviesReducer from "./movies_reducer";
const rootReducer = combineReducers({
  form:formReducer,
  movies : MoviesReducer
});

export default rootReducer;
