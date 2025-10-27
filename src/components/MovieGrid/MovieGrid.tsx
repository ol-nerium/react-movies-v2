import css from './MovieGrid.module.css';
import placeholder from './placeholder.png';
import type { Movie } from '@/types/movie';

export default function MovieGrid({
  onSelect,
  movies,
}: {
  onSelect: (data: Movie) => void;
  movies: Movie[];
}) {
  return (
    <ul className={css.grid}>
      {movies.map((i: Movie) => {
        const imgUrl = i['poster_path']
          ? `https://image.tmdb.org/t/p/w500/${i['poster_path']}`
          : placeholder;
        function handleClick() {
          onSelect(i);
        }
        return (
          <li key={i.id}>
            <div className={css.card} onClick={handleClick}>
              <img
                className={css.image}
                src={imgUrl}
                alt={i.title}
                loading="lazy"
              />
              <h2 className={css.title}>{i.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
