import Layout from "@components/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useMutation from "../libs/client/useMutation";
import { motion } from "framer-motion";
import Input from "@components/InputForm";
import Link from "next/link";

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
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("유저 엔터관련 url");

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
            <button className="w-full h-12 rounded-2xl text-[#838383] text-base bg-white bg-opacity-70">
              로그인
            </button>
          </form>
          <div className="text-sm text-[#838383] mt-2">
            <Link href={"/signUp"}>
              <a>회원가입 / 아이디 찾기 / 비밀번호 찾기</a>
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Enter;
