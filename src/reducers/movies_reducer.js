import { FETCH_MOVIES } from "../actions/index";
import { FETCH_MOVIE_BY_ID } from "../actions/index";

function calculateWinner(movie1Data, movie2Data) {
  if ((movie1Data && movie2Data) !== undefined) {
    if (movie1Data[0].vote_average > movie2Data[0].vote_average) {
      return "Movie1";
    } else if (movie1Data[0].vote_average === movie2Data[0].vote_average) {
      return "Tie";
    } else {
      return "Movie2";
    }
  }
}

export default function(state = { topMovies: []  , movie1: null   , movie2: null , winner:""}, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return Object.assign({}, state, {
        topMovies: action.payload.data.results
      });
    case FETCH_MOVIE_BY_ID:
      var winner = calculateWinner(action.payload[0].data.movie_results , action.payload[1].data.movie_results);
      return Object.assign({}, state, {
        movie1: action.payload[0].data.movie_results,
        movie2: action.payload[1].data.movie_results,
        winner: winner
      });
   
    default:
      return state;
  }
}

