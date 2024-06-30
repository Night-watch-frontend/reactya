import { FC } from "react";
import styles from "./component.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Фильмопоиск.svg";
import { useAppDispatch } from "../../Atomic/store/hooks";
import { logout } from "../../Atomic/store/userSlice";
import userImg from "../../assets/user.svg";

interface IHeaderProps {
  login: boolean;
}

export const Header: FC<IHeaderProps> = ({ login }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <img src={logo} alt="Логотип Фильмопоиск"></img>
        </Link>
        <div>
          {login === true ? (
            <div className={styles.user}>
              <img src={userImg} alt="Аватар пользователя"></img>
              <button
                className={styles.btnlogout}
                onClick={() => dispatch(logout())}>
                Выйти
              </button>
            </div>
          ) : (
            <button
              className={styles.btnlogin}
              onClick={() => navigate("/login")}>
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
