import Button from "@components/button";
import Input from "@components/InputForm";
import Layout from "@components/layout";
import useLoginMutation from "@libs/client/useLoginMutation";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IEnterForm {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  result: string;
}

interface MutationResult {
  httpStatus: number;
  message: string;
  results: object;
}

const SignUp: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<IEnterForm>({
    mode: "onChange",
  });

  const [enter, { loading, data, message: submitMessage }] =
    useLoginMutation<MutationResult>("https://mtvs.kro.kr:8001/signup");

  const onValid = (validForm: IEnterForm) => {
    if (loading) return;
    enter(validForm);
  };

  const router = useRouter();
  useEffect(() => {
    if (data?.httpStatus === 201) {
      router.push("/enter");
    }
  }, [data, router]);

  return (
    <Layout seoTitle="회원가입" enter>
      <div className="bg-[#FEBC10] w-full h-full flex justify-center items-center flex-col ">
        <div className="flex flex-col items-center">
          <img className=" mb-9 w-[210px] " src="img/MainLogo.png" />
          <div className=" flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit(onValid)}>
              <div>
                <Input
                  label="아이디"
                  register={register("userName", {
                    required: "아이디를 입력해 주세요.",
                    onChange() {
                      clearErrors("result");
                    },
                    minLength: {
                      value: 5,
                      message: "아이디는 5글자 이상 입력해 주세요",
                    },
                  })}
                  type="text"
                  errorMessage={errors?.userName?.message}
                  signUp
                />

                <Input
                  label="비밀번호"
                  register={register("password", {
                    required: "비밀번호를 입력해 주세요",
                    onChange() {
                      clearErrors("result");
                    },
                    minLength: {
                      value: 5,
                      message: "비밀번호는 5자 이상으로 작성해주세요.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/,
                      message:
                        "비밀번호는 영문 대소문자와 특수문자를 포함해야합니다.",
                    },
                  })}
                  type="password"
                  errorMessage={errors?.password?.message}
                  signUp
                />
                <Input
                  label="비번확인"
                  register={register("passwordConfirm", {
                    required: "비밀번호 확인을 입력해 주세요.",
                    onChange() {
                      clearErrors("result");
                    },
                  })}
                  type="password"
                  errorMessage={errors?.passwordConfirm?.message}
                  signUp
                />

                <Input
                  label="이메일"
                  register={register("email", {
                    required: "이메일을 입력해 해주세요.",
                    onChange() {
                      clearErrors("result");
                    },
                    pattern: {
                      value: /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i,
                      message: "이메일 양식이 틀립니다.",
                    },
                  })}
                  type="email"
                  errorMessage={errors?.email?.message}
                  signUp
                />
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  error={submitMessage}
                  text={
                    loading
                      ? "회원가입중입니다..."
                      : data?.httpStatus === 400
                      ? "회원가입에 실패했습니다."
                      : "회원가입"
                  }
                  disabled={!isValid || loading || !isDirty}
                />
              </div>
            </form>
            <div className="text-sm text-[#838383] mt-1 "></div>
          </div>
        </div>
        <ul className=" text-sm text-red-600 flex flex-col items-center h-1  ">
          <li>{errors?.userName?.message}</li>
          <li>{errors?.password?.message}</li>
          <li>{errors?.passwordConfirm?.message}</li>
          <li>{errors?.email?.message}</li>
          <li>
            {watch("passwordConfirm") === watch("password")
              ? null
              : "비밀번호가 일치하지 않습니다."}
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default SignUp;
