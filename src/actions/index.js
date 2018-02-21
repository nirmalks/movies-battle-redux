import axios from 'axios';
import { apiKey } from '../api_key';

const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

export const FETCH_MOVIES = 'FETCH_MOVIES';

export function fetchMovies() {
    const request = axios.get(url);
    return {
        type: FETCH_MOVIES,
        payload : request
    }
}