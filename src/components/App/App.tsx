import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

import { fetchMoviesByName } from '@/services/movieService';
import type { Movie, SearchForm } from '@/types/movie';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import type { FormikHelpers } from 'formik';

const modalNode = document.getElementById('modal') as HTMLDivElement;

export default function App() {
  const [query, setQuery] = useState('');
  // const [page, setPage] = useState(1); // for pagination
  const page = 1;
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<Movie | null>(null);

  function handleSumbit(
    values: SearchForm,
    actions: FormikHelpers<SearchForm>
  ) {
    setQuery(values.query);
    actions.resetForm();
  }

  useEffect(() => {
    if (query.trim() === '') return;
    setIsLoading(true);

    fetchMoviesByName(query, page)
      .then(res => {
        setMovies(res.results);
        setError(null);
        setIsLoading(false);
        if (res.results.length < 1) toast('No movies found for your request.');
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
        setMovies(null);
      });
  }, [query, page]);

  function handleClick(data: Movie): void {
    setModalData(data);
  }

  function closeModal() {
    setModalData(null);
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSumbit} />
      {!isLoading && movies && movies?.length > 0 && (
        <MovieGrid onSelect={handleClick} movies={movies} />
      )}

      {error && (
        <ErrorMessage text={`There was an ${error}, please try again...`} />
      )}

      {isLoading && <Loader />}
      {modalData &&
        createPortal(
          <MovieModal movie={modalData} onClose={closeModal} />,
          modalNode
        )}
      <Toaster />
    </div>
  );
}
