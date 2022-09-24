import useUser from "@libs/client/useUser";
import type { NextPage } from "next";

const SignUp: NextPage = () => {
  const { isLoading } = useUser();
  return <div></div>;
};

export default SignUp;
