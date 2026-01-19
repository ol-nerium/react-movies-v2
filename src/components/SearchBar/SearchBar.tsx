import { Formik, Form, Field, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';

import css from './SearchBar.module.css';
import type { SearchForm } from '@/types/movie';

export default function SearchBar({
  onSubmit,
}: {
  onSubmit: (values: SearchForm, actions: FormikHelpers<SearchForm>) => void;
}) {
  function handleSubmit(
    values: { query: string },
    actions: FormikHelpers<{ query: string }>
  ) {
    if (values.query.trim() === '') {
      toast.error('eeee blya! Please enter your search query.');
      return;
    }
    onSubmit(values, actions);
  }
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </header>
  );
}
