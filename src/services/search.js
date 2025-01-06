import { api } from "./api";

export async function getSearch(query) {
    const res = await api.get(`search/multi?query=${query}`);
    return res.status === 200 ? res.data : [];
}