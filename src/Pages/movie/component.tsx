import { FC } from "react";
import { Layout } from "../../Templates/layout";
import { MainMovie } from "../../Organisms/main-movie";

export const Movie: FC = () => {
  return <Layout children={<MainMovie />} />;
};
