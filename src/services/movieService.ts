import axios from 'axios';

const myKey = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = 'https://api.themoviedb.org/3/search';

export async function fetchMoviesByName(query: string, page: number) {
  try {
    const res = await axios({
      url: `/movie`,
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });

    return res.data;
  } catch (e) {
    throw e;
  }
}
