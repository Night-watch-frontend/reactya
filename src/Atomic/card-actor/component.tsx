import { FC } from "react";
import styles from "./component.module.css";

interface ICardActorProps {
  name: string;
  photo: string;
}

export const CardActor: FC<ICardActorProps> = ({ name, photo }) => {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.img} src={photo} alt="Аватар актера"></img>
      </div>
      <div>
        <span className={styles.name}>{name}</span>
      </div>
    </div>
  );
};
