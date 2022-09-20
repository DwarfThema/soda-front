import Layout from "@components/layout";
import { MotionConfig } from "framer-motion";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";
import { motion } from "framer-motion";

interface MutationResult {
  ok: boolean;
}

interface EnterForm {
  id: string;
  email: string;
  pw: string;
}

interface TokenForm {
  token: number;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("유저 엔터관련 url");
  console.log(data);

  const [
    confirmToken,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useMutation<MutationResult>("유저 토큰 관련 url");

  const { register, reset, handleSubmit } = useForm<EnterForm>();

  const { register: tokenRegi, handleSubmit: tokenSubmit } =
    useForm<TokenForm>();

  const [submitting] = useState(false);
  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  const [titleState, setTitleState] = useState(false);

  return (
    <Layout seoTitle="로그인">
      <div className="bg-[#FEBC10] w-full h-full flex justify-center items-center flex-col">
        <motion.img
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -120 }}
          transition={{ ease: "easeInOut", duration: 2 }}
          className="mb-10 absolute"
          src="img/MainLogo.png"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{
            ease: "easeInOut",
            duration: 3,
            times: [0, 0.4, 1],
          }}
          className="flex justify-center items-center flex-col mt-24"
        >
          <form>
            <div>
              <div className="mb-[20px] w-[286px] flex items-center text-sm">
                <div className="absolute ml-[11px] text-[#838383] ">아이디</div>
                <input className="w-full h-10 pl-20 rounded-2xl bg-white bg-opacity-70"></input>
              </div>

              <div className="mb-[20px] w-[286px] flex items-center text-sm">
                <div className="absolute ml-[11px] text-[#838383] ">
                  비밀번호
                </div>
                <input className="w-full h-10 pl-20 rounded-2xl  bg-white bg-opacity-70"></input>
              </div>
            </div>
            <button className="w-full h-12 rounded-2xl text-[#838383] text-base bg-white bg-opacity-70">
              로그인
            </button>
          </form>
          <div className="text-sm text-[#838383] mt-2">
            회원가입 / 아이디찾기 / 비밀번호 찾기
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Enter;
