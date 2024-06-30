import { FC, useEffect } from "react";
import styles from "./component.module.css";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Atomic/store/hooks";
import { loginUser } from "../../Atomic/store/userSlice";

export const Modal: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [navigate]);

  const portal = document.getElementById("portal");
  if (!portal) {
    return null;
  }

  const user = {
    username: "",
    password: "",
  };

  const postUserData = () => {
    dispatch(loginUser(user));
    navigate("/");
  };

  return createPortal(
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.top}>
          <h2 className={styles.title}>{"Авторизация"}</h2>
        </div>
        <label htmlFor={"login"}>{"Логин"}</label>
        <input
          onChange={(e) =>
            (user.username = e.target.value.trim().toLowerCase())
          }
          id={"login"}
          className={styles.input}
          placeholder={"Введите логин"}></input>
        <label htmlFor="password">{"Пароль"}</label>
        <input
          onChange={(e) =>
            (user.password = e.target.value.trim().toLowerCase())
          }
          id={"password"}
          className={styles.input}
          placeholder={"Введите пароль"}></input>
        <div className={styles.btns}>
          <button className={styles.btnlogin} onClick={() => postUserData()}>
            {"Войти"}
          </button>
          <button className={styles.btnlogout} onClick={() => navigate("/")}>
            {"Отменить"}
          </button>
        </div>
      </div>
    </div>,
    portal
  );
};
