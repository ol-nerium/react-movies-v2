import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ReactPaginate from 'react-paginate';

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
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const modalNode = document.getElementById('modal') as HTMLDivElement;

export default function App() {
  const [query, setQuery] = useState('');
  const [modalData, setModalData] = useState<Movie | null>(null);
  const [page, setPage] = useState(1); // for pagination

  function handleSumbit(
    values: SearchForm,
    actions: FormikHelpers<SearchForm>
  ) {
    setQuery(values.query);
    actions.resetForm();
  }

  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['searchQuery', query, page],
    queryFn: () => fetchMoviesByName(query, page),
    enabled: query.trim() !== '',
    placeholderData: keepPreviousData,
  });

  function handleClick(data: Movie): void {
    setModalData(data);
  }

  function closeModal() {
    setModalData(null);
  }

  function hanlePageChange(e: { selected: number }) {
    setPage(e.selected + 1);
  }

  useEffect(() => {
    if (isSuccess && data?.results.length < 1)
      toast('No movies found for your request.');
  }, [data]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSumbit} />
      {isSuccess && data?.results.length > 0 && (
        <MovieGrid onSelect={handleClick} movies={data.results} />
      )}

      {isError && (
        <ErrorMessage
          text={`There was an ${error.message}, please try again...`}
        />
      )}

      {isLoading && <Loader />}
      {modalData &&
        createPortal(
          <MovieModal movie={modalData} onClose={closeModal} />,
          modalNode
        )}
      <Toaster />
      {isSuccess && data?.results.length > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          previousLabel="<-"
          nextLabel="->"
          onPageChange={hanlePageChange}
          forcePage={page - 1} // To override selected page with parent prop. Use this if you want to control the page from your app state.
          containerClassName={css.pagination} //The classname of the pagination container.
          activeClassName={css.active} //The classname for the active page. It is concatenated to base class pageClassName.
        />
      )}
    </div>
  );
}
