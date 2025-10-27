import type { Movie } from '@/types/movie';
import css from './MovieModal.module.css';

import placeholder from './placeholder.png';
import type React from 'react';

export default function MovieModal({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
  const {
    title,
    backdrop_path,
    poster_path,
    overview,
    vote_average,
    release_date,
  } = movie;
  const image = backdrop_path ? backdrop_path : poster_path;

  window.addEventListener('keydown', handleClose);

  function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      window.removeEventListener('keydown', handleClose);
      onClose();
    }
  }

  function handleClose(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', handleClose);
      onClose();
    }
  }

  return (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={
            image ? `https://image.tmdb.org/t/p/original/${image}` : placeholder
          }
          alt={title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview || 'no info'}</p>
          <p>
            <strong>Release Date:</strong>
            {release_date || 'no info'}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );
}
