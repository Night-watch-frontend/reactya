import { ChangeEvent, FC } from "react";
import styles from "./component.module.css";
import { IconSearch } from "../../assets/search";
import { IconDelete } from "../../assets/delete";

interface IInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  empty: boolean;
}

export const InputSearch: FC<IInputProps> = ({ onChange, empty }) => {
  return (
    <div className={styles.container}>
      <IconSearch className={styles.search} />
      <input
        onChange={onChange}
        className={styles.input}
        type="text"
        placeholder="Название фильма"
      />
      {empty && (
        <button className={styles.btn}>
          <IconDelete />
        </button>
      )}
    </div>
  );
};
