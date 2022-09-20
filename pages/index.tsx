import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { isLoading } = useUser();
  return <div></div>;
};

export default Home;
