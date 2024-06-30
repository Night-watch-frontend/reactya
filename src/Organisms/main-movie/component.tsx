import { FC } from "react";
import styles from "./component.module.css";
import { filmApi } from "../../Atomic/servicess/film";
import { useParams } from "react-router-dom";
import { IconStar } from "../../assets/star-filled";
import { CardActor } from "../../Atomic/card-actor";

export const MainMovie: FC = () => {
  const { id } = useParams();

  const { data } = filmApi.useGetFilmQuery(id ? id : "");

  return (
    <div className={styles.container}>
      <div className={styles.film}>
        {data ? (
          <>
            <div className={styles.poster}>
              <img className={styles.img} src={data.poster} />
            </div>
            <div className={styles.info}>
              <h2 className={styles.title}>{data.title}</h2>
              <div className={styles.infogenre}>
                <span className={styles.subtitle}>{"Жанр"}</span>
                <span>{data.genre}</span>
              </div>
              <div className={styles.infoyear}>
                <span className={styles.subtitle}>{"Год выпуска"}</span>
                <span>{data.release_year}</span>
              </div>
              <div className={styles.inforeit}>
                <span className={styles.subtitle}>{"Рейтинг"}</span>
                <span>{data.rating}</span>
              </div>
              <div className={styles.infodescr}>
                <span className={styles.subtitle}>{"Описание"}</span>
                <p className={styles.descr}>{data.description}</p>
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
          </>
        ) : (
          ""
        )}
      </div>
      <div className={styles.actors}>
        <h3>{"Актёры"}</h3>
        <ul className={styles.list}>
          {data?.actors.map((actor, index) => (
            <li key={index}>
              <CardActor photo={actor.photo} name={actor.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
