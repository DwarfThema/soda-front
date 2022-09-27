import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const Likes: NextPage = () => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  const { isLoading } = useUser();

  const img = "/img/choice/fast2.jpeg";
  return (
    <Layout seoTitle="좋아요" likes>
      <div
        className="rounded-md bg-cover bg-center h-[400px]"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    </Layout>
  );
};

export default Likes;
