import Button from "@components/button";
import Input from "@components/InputForm";
import Layout from "@components/layout";
import type { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface EnterForm {
  id: string;
  email: string;
  pw: string;
  pwConfirm: string;
  result: string;
}

const SignUp: NextPage = () => {
  const {
    register,
    watch,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<EnterForm>({
    mode: "onChange",
  });

  return (
    <Layout seoTitle="회원가입" enter>
      <div className="bg-[#FEBC10] w-full h-full flex justify-center items-center flex-col">
        <img className="mb-9" src="img/MainLogo.png" />
        <div className=" flex justify-center items-center flex-col">
          <form>
            <div>
              <Input
                label="아이디"
                register={register("id", {
                  required: "아이디를 입력해 주세요.",
                  onChange() {
                    clearErrors("result");
                  },
                  minLength: {
                    value: 5,
                    message: "아이디는 4글자 이상 입력해 주세요",
                  },
                })}
                type="text"
                errorMessage={errors?.id?.message}
                signUp
              />

              <Input
                label="비밀번호"
                register={register("pw", {
                  required: "비밀번호를 입력해 주세요",
                  onChange() {
                    clearErrors("result");
                  },
                  minLength: {
                    value: 5,
                    message: "비밀번호는 5자 이상으로 작성해주세요.",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z]/,
                    message: "비밀번호는 영문 대소문자와 포함해야합니다.",
                  },
                })}
                type="password"
                errorMessage={errors?.pw?.message}
                signUp
              />
              <Input
                label="비번확인"
                register={register("pwConfirm", {
                  required: "비밀번호 확인을 입력해 주세요.",
                  onChange() {
                    clearErrors("result");
                  },
                })}
                type="password"
                errorMessage={errors?.pwConfirm?.message}
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
              <Button text="회원가입" href="/signUp/choice" />
            </div>
          </form>
          <div className="text-sm text-[#838383] mt-1 "></div>
          <div className="text-sm text-red-600 flex flex-col items-center ">
            <div>{errors?.id?.message}</div>
            <div>{errors?.pw?.message}</div>
            <div>{errors?.pwConfirm?.message}</div>
            <div>{errors?.email?.message}</div>
            <div>
              {watch("pwConfirm") === watch("pw")
                ? null
                : "비밀번호가 일치하지 않습니다."}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
