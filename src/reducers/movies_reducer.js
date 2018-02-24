import { FETCH_MOVIES } from "../actions/index";
import { FETCH_MOVIE_BY_ID } from "../actions/index";

export default function(state = { topMovies: []  , movie1: null   , movie2: null}, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return Object.assign({}, state, {
        topMovies: action.payload.data.results
      });
    case FETCH_MOVIE_BY_ID:
      let movieData = [];
      return Object.assign({}, state, {
        movie1: action.payload[0].data.movie_results,
        movie2: action.payload[1].data.movie_results,
      });
  }

  return state;
}

