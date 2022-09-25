import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const Create: NextPage = () => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  const { isLoading } = useUser();
  return (
    <Layout seoTitle="영수증" create>
      <div>만들기 페이지</div>
    </Layout>
  );
};

export default Create;
