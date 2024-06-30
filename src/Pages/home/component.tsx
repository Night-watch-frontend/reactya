import { FC } from "react";
import { Layout } from "../../Templates/layout";
import { MainHome } from "../../Organisms/main-home";

export const Home: FC = () => {
  return <Layout children={<MainHome />} />;
};
