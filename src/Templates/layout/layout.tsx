import { FC } from "react";
import { Header } from "../../Organisms/header";
import { useAppSelector } from "../../Atomic/store/hooks";

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <Header login={token ? true : user.isLogin} />
      <main>{children}</main>
    </>
  );
};
