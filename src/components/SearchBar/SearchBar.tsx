import { Formik, Form, Field } from 'formik';

import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
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

        <Formik initialValues={{ query: '' }} onSubmit={onSubmit}>
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
        <form></form>
      </div>
    </header>
  );
}

// Please enter your search query.
// No movies found for your request.
