import axios from 'axios'
export const BASE_IMAGE_URL_SMALL = "https://image.tmdb.org/t/p/w400";
export const BASE_IMAGE_URL_LARGE = "https://image.tmdb.org/t/p/w500";
export const BASE_IMAGE_URL_ORIGINAL = "https://image.tmdb.org/t/p/original";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
    }
})

export async function getHero() {
    const movie = await api.get(`/trending/movie/day`);
    // const tv = await api.get(`/trending/tv/day`);
    // console.log('movie', movie?.data?.results?.[0], 'tv', tv?.data?.results?.[0]);
    // console.log('hero', movie.data.results[0]) 
    return movie.status === 200 ? movie.data.results[0] : [];
}

export async function getTrendingList(type, trendingTime) {
    const res = await api.get(`/trending/${type}/${trendingTime}`);
    console.log(type, res);
    // console.log('res', res);
    return  res.status === 200 ? res.data : [];
} 

export async function getPopularList(type) {
    
    const res = await api.get(`/${type}/popular`);
    console.log(type, 'popular', res.data)
    return res.status === 200 ? res.data : [];
}
