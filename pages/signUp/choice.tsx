import Layout from "@components/layout";
import type { NextPage } from "next";
import { motion } from "framer-motion";

const signUp: NextPage = () => {
  return (
    <Layout seoTitle="회원가입">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
          times: [1],
        }}
        className="bg-[#FEBC10] w-full h-full flex justify-center items-center flex-col absolute"
      ></motion.div>
      하이
    </Layout>
  );
};

export default signUp;
