import { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./component.module.css";
import { Film } from "../../Molecules/film";
import { filmApi } from "../../Atomic/servicess/film";
import { IconArrowRight } from "../../assets/arrow-right";
import { InputSearch } from "../../Atomic/input";
import { debounce } from "../../Atomic/helpers/debounce";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Atomic/store/hooks";
import { setPage, setTitle } from "../../Atomic/store/searchSlice";

export const Films: FC = () => {
  const dispatch = useAppDispatch();
  const { page, title, genres, years } = useAppSelector(
    (state) => state.search
  );
  const [searchParams, setSearchParams] = useSearchParams({
    page,
    title,
    genres,
    years,
  });
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setSearchParams({ page, title, genres, years });
  }, [genres, page, setSearchParams, title, years]);

  if (Number(page) < 1) {
    dispatch(setPage("1"));
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setIsEmpty(true);
      dispatch(setTitle(e.target.value));
    } else {
      setIsEmpty(false);
    }
  };

  const onChangeDebounced = debounce(onChange, 1200);

  const { data } = filmApi.useGetFilmsQuery({
    page: searchParams.get("page") || "1",
    title: searchParams.get("title") || "",
    genres: searchParams.get("genres") || "",
    years: searchParams.get("years") || "",
  });

  return (
    <div className={styles.container}>
      <InputSearch empty={isEmpty} onChange={onChangeDebounced} />
      <ul className={styles.list}>
        {data &&
          data.search_result.map((film) => (
            <li key={film.id}>
              <Film
                poster={film.poster}
                title={film.title}
                genre={film.genre}
                id={film.id}
                release_year={film.release_year}
                description={film.description}
              />
            </li>
          ))}
      </ul>
      {data && data.search_result.length < 1 && (
        <div className={styles.notfound}>
          <h3>{"Фильмы не найдены"}</h3>
          <span>{"Измените запрос и попробуйте снова"}</span>
        </div>
      )}
      {data && data.total_pages > 1 && (
        <div className={styles.controls}>
          <button
            className={styles.btnleft}
            onClick={() => dispatch(setPage(`${Number(page) - 1}`))}
            disabled={Number(page) === 1}>
            <IconArrowRight />
          </button>
          <span>{Number(page)}</span>
          <button
            className={styles.btnright}
            onClick={() => dispatch(setPage(`${Number(page) + 1}`))}
            disabled={Number(page) === data.total_pages}>
            <IconArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};
