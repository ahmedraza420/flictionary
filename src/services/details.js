import { api } from "./api";


export async function getDetails(type, id) {
    const res = await api.get(`/${type}/${id}`);
    // console.log(type, id);
    return res.status === 200 ? res.data : [];
}

export async function getMovieCredits(type, id) {
    const res = await api.get(`/${type}/${id}/${type === 'tv' ? 'aggregate_credits' : 'credits'}`);
    return res.status === 200 ? res.data : [];
}

export async function getSimilar(type, id) {
    const res = await api.get(`/${type}/${id}/similar`);
    return res.status === 200 ? res.data : [];
}

export async function getRecommended(type, id) {
    const res = await api.get(`/${type}/${id}/recommendations`);
    return res.status === 200 ? res.data : [];
}