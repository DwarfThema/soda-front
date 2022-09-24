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

interface MutationResult {
  ok: boolean;
}

interface EnterForm {
  id: string;
  email: string;
  pw: string;
  result: string;
}

interface TokenForm {
  token: number;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] = useMutation<MutationResult>(
    "였던 무언가 129.154.201.42:8001/"
  );

  console.log(data);

  const onValid = (validForm: EnterForm) => {
    enter(validForm);
  };

  const [
    confirmToken,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useMutation<MutationResult>("유저 토큰 관련 url");

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<EnterForm>({
    mode: "onChange",
  });

  const { register: tokenRegi, handleSubmit: tokenSubmit } =
    useForm<TokenForm>();

  const [submitting] = useState(false);

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
              errorMessage={errors?.id?.message}
              register={register("id", {
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
              errorMessage={errors?.pw?.message}
              register={register("pw", {
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
          <Link href={"/signUp"}>
            <a>회원가입 / 아이디 찾기 / 비밀번호 찾기</a>
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Enter;
