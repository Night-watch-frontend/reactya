import { FC, useRef, useState } from "react";
import styles from "./component.module.css";
import { IconSelect } from "../../assets/icon";
import { GENRES } from "../../Atomic/constans/genres";
import { YEARS } from "../../Atomic/constans/years";
import { useAppDispatch, useAppSelector } from "../../Atomic/store/hooks";
import {
  setBtnGanre,
  setBtnYear,
  setGenres,
  setYears,
} from "../../Atomic/store/searchSlice";

export const Filtr: FC = () => {
  const [isOpenGenres, setIsOpenGenres] = useState(false);
  const [isOpenYears, setIsOpenYears] = useState(false);
  const genresRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { btnGanre, btnYear } = useAppSelector((state) => state.search);

  const selectGanre = (key: string, value: string) => {
    setIsOpenGenres(!isOpenGenres);
    setIsOpenYears(false);
    if (key === "0") {
      dispatch(setGenres(""));
    } else {
      dispatch(setGenres(key));
    }
    dispatch(setBtnGanre(value));
  };

  const selectYear = (key: string, value: string) => {
    setIsOpenYears(!isOpenYears);
    setIsOpenGenres(false);
    if (key === "0") {
      dispatch(setYears(""));
    } else {
      dispatch(setYears(key));
    }
    dispatch(setBtnYear(value));
  };

  return (
    <div className={styles.filtr}>
      <h3 className={styles.title}>{"Фильтр"}</h3>
      <div className={styles.selectfield}>
        <h4 className={styles.subtitle}>{"Жанр"}</h4>
        <button
          className={styles.select}
          onClick={() => setIsOpenGenres(!isOpenGenres)}>
          <span>{btnGanre}</span>
          <IconSelect />
        </button>
      </div>
      <div
        className={styles.collapse}
        style={
          isOpenGenres
            ? { height: genresRef.current?.scrollHeight }
            : { height: "0px" }
        }>
        <div ref={genresRef} className={styles.body}>
          <ul className={styles.list}>
            {Object.keys(GENRES).map((key) => (
              <li key={key}>
                <button
                  onClick={() => selectGanre(key, GENRES[key])}
                  className={styles.btn}>
                  {GENRES[key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.selectfield}>
        <h4 className={styles.subtitle}>{"Год выпуска"}</h4>
        <button
          className={styles.select}
          onClick={() => setIsOpenYears(!isOpenYears)}>
          <span>{btnYear}</span>
          <IconSelect />
        </button>
      </div>
      <div
        className={styles.collapse}
        style={
          isOpenYears
            ? { height: yearsRef.current?.scrollHeight }
            : { height: "0px" }
        }>
        <div ref={yearsRef} className={styles.body}>
          <ul className={styles.list}>
            {Object.keys(YEARS).map((key) => (
              <li key={key}>
                <button
                  onClick={() => selectYear(key, YEARS[key])}
                  className={styles.btn}>
                  {YEARS[key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
