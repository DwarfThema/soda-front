import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  const { isLoading } = useUser();
  return (
    <Layout seoTitle="홈" home>
      <div>하이</div>
    </Layout>
  );
};

export default Home;
