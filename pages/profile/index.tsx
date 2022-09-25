import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const Profile: NextPage = () => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  const { isLoading } = useUser();
  return (
    <Layout seoTitle="프로필" profile>
      <div>프로필 페이지</div>
    </Layout>
  );
};

export default Profile;
