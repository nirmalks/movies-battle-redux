import { FETCH_MOVIES } from "../actions/index";

export default function(state = { topMovies: []  , movie1: null   , movie2: null}, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return Object.assign({}, state, {
        topMovies: action.payload.data.results
      })
  }

  return state;
}
