import { FC } from "react";
import styles from "./component.module.css";
import { Filtr } from "../filtr";
import { Films } from "../films";
import { Outlet } from "react-router-dom";

export const MainHome: FC = () => {
  return (
    <div className={styles.container}>
      <Filtr />
      <Films />
      <Outlet />
    </div>
  );
};
