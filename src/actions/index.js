import axios from 'axios';
import { apiKey } from '../api_key';

const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIE_BY_ID = 'FETCH_MOVIE_BY_ID';
export function fetchMovies() {
    const request = axios.get(url);
    return {
        type: FETCH_MOVIES,
        payload : request
    }
}

export function fetchMovieById(values){
   
    const movie1request = axios.get(`https://api.themoviedb.org/3/find/${values["movie1-name"]}?api_key=${apiKey}&external_source=imdb_id`);
    const movie2request = axios.get(`https://api.themoviedb.org/3/find/${values["movie2-name"]}?api_key=${apiKey}&external_source=imdb_id`);    
    const multipleRequests = Promise.all([ movie1request , movie2request ]);
                
    return {
        type: FETCH_MOVIE_BY_ID,
        payload: multipleRequests
    }
}