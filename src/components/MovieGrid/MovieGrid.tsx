import css from './MovieGrid.module.css';

export default function MovieGrid({ onSelect, movies }) {
  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map(i => {
        console.log(i['poster-path']);
        return (
          <li key={i.id}>
            <div className={css.card}>
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500/${i['poster-path']}`}
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
