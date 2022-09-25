import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const Likes: NextPage = () => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  const { isLoading } = useUser();
  return (
    <Layout seoTitle="좋아요" likes>
      <div>좋아요 페이지</div>
    </Layout>
  );
};

export default Likes;
