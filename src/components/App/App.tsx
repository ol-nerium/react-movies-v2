import { useEffect, useState } from 'react';
import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

import { fetchMoviesByName } from '@/services/movieService';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  function handleSumbit(values, actions) {
    setQuery(values.query);
    actions.resetForm();
  }

  useEffect(() => {
    fetchMoviesByName(query, page).then(res => setMovies(res.results));
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSumbit} />
      {movies && <MovieGrid onSelect={console.log} movies={movies} />}
    </>
  );
}
