import { FC } from "react";
import styles from "./component.module.css";
import { IconStar } from "../../assets/star-filled";
import { Link } from "react-router-dom";

interface IFilmProps {
  id: string;
  title: string;
  poster?: string;
  rating?: number;
  release_year: string;
  genre: string;
  description: string;
  total_rates_count?: string;
}

export const Film: FC<IFilmProps> = ({
  id,
  title,
  release_year,
  genre,
  description,
  poster,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <img className={styles.img} src={poster} />
      </div>
      <div className={styles.info}>
        <Link to={`/movie/${id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.infogenre}>
          <span className={styles.subtitle}>{"Жанр"}</span>
          <span className={styles.descr}>{genre}</span>
        </div>
        <div className={styles.infoyear}>
          <span className={styles.subtitle}>{"Год выпуска"}</span>
          <span className={styles.descr}>{release_year}</span>
        </div>
        <div className={styles.infodescr}>
          <span className={styles.subtitle}>{"Описание"}</span>
          <p className={styles.descr}>{description}</p>
        </div>
      </div>
      <div className={styles.rating}>
        <div className={styles.reit}>
          <button className={styles.btn}>
            <IconStar />
          </button>
          <span>{1}</span>
        </div>
        <div className={styles.reit}>
          <button className={styles.btn}>
            <IconStar />
          </button>
          <span>{2}</span>
        </div>
        <div className={styles.reit}>
          <button className={styles.btn}>
            <IconStar />
          </button>
          <span>{3}</span>
        </div>
        <div className={styles.reit}>
          <button className={styles.btn}>
            <IconStar />
          </button>
          <span>{4}</span>
        </div>
        <div className={styles.reit}>
          <button className={styles.btn}>
            <IconStar />
          </button>
          <span>{5}</span>
        </div>
      </div>
    </div>
  );
};
