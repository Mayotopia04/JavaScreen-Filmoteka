import axios from "axios";
const API_KEY = "89eb65e9a0861d057ee5d984ffcdd726";

class MovieDbApi {
    async getTrendingMovies(timeWindow = "day", page = 1) {
        //  Only day or week is allowed as timeWindow
        if (!["day", "week"].includes(timeWindow)) {
            timeWindow = "day";
        }

        const options = { headers: { accept: "application/json" } };
        const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-us&api_key=${API_KEY}&page=${page}`;

        return await axios.get(url, options);
    }

    async getMovieDetails(movieId) {
        // https://api.themoviedb.org/3/movie/movie_id?language=en-US
        const options = { headers: { accept: "application/json" } };
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`;
        return await axios.get(url, options);
    }

    async searchMovies(searchValue,page) {
        
        const searchValueUri = encodeURIComponent(searchValue);
        const options = { headers: { accept: "application/json" } };
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchValueUri}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`;
        
        return await axios.get(url, options);
    }
}

export default new MovieDbApi();
