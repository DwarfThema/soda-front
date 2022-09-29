import Layout from "@components/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";
import { motion } from "framer-motion";
import Input from "@components/InputForm";
import Link from "next/link";
import Button from "@components/button";
import useLoginMutation from "@libs/client/useLoginMutation";

interface IToken {
  id: string;
  token: string;
  needSelect: boolean;
}

interface MutationResult {
  httpStatus: number;
  message: string;
  results: IToken;
  token: string;
}

interface EnterForm {
  userName: string;
  password: string;
  result: string;
}

const Enter: NextPage = () => {
  const router = useRouter();

  //---------------로그인 토큰 저장---------------

  const [enter, { loading, data }] = useLoginMutation<MutationResult>(
    "https://mtvs.kro.kr:8001/login"
  );

  const userToken = data?.results?.token;
  const needSelect = data?.results?.needSelect;

  useEffect(() => {
    localStorage.setItem("Authorization", "Bearer " + userToken);
    if (userToken && needSelect) {
      router.push(`/signup/choice`);
    } else if (userToken && !needSelect) {
      router.push(`/`);
    }
  }, [data]);

  //---------------로그인 토큰 저장---------------

  //---------------폼관련---------------
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<EnterForm>({
    mode: "onChange",
  });

  const onValid = (validForm: EnterForm) => {
    if (loading) return;
    enter(validForm);
  };
  //---------------폼관련---------------

  return (
    <Layout seoTitle="로그인" enter>
      <motion.img
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 2 }}
        className="mb-72 "
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
        className="absolute flex justify-center items-center flex-col mt-24 "
      >
        <form onSubmit={handleSubmit(onValid)}>
          <div>
            <Input
              label="아이디"
              errorMessage={errors?.userName?.message}
              register={register("userName", {
                required: "아이디를 입력해 주세요.",
                onChange() {
                  clearErrors("result");
                },
                minLength: {
                  value: 5,
                  message: "5글자 이상 입력해주세요.",
                },
              })}
              type="text"
            />

            <Input
              label="비밀번호"
              errorMessage={errors?.password?.message}
              register={register("password", {
                required: "비밀번호를 입력해 주세요.",
                onChange() {
                  clearErrors("result");
                },
                minLength: {
                  value: 5,
                  message: "5글자 이상 입력해주세요.",
                },
              })}
              type="password"
            />
          </div>
          <Button text="로그인" />
        </form>
        <div className="text-sm text-[#838383] mt-2">
          <Link href={"/signup"}>
            <a>회원가입 / 아이디 찾기 / 비밀번호 찾기</a>
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Enter;
