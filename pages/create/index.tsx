import Layout from "@components/layout";
import PhotoForm from "@components/photoForm";
import useFormMutation from "@libs/client/useFormMutation";
import useUser from "@libs/client/useUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface iPhotoForm {
  photo?: FileList;
}

const Create: NextPage = () => {
  const router = useRouter();

  // --------------post 영수증 api --------------------
  const [file, setFile] = useState("");
  const [text, setText] = useState("영수증 분석 요청");
  function mutation(formData: any) {
    fetch("https://soda-mtvs.kro.kr/returnReceipt", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
      body: formData,
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => {
        setText("");
        router.push(
          `create/review/${json.storeId}?id=${json.storeId}, category=${json.category}`
        );
      });
  }
  const onClickHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    mutation(formData);
    setText("분석중...");
  };
  // -------------------------------------------
  return (
    <Layout seoTitle="영수증 인증" create>
      <div className="w-full h-full  rounded-md flex mt-20 items-center flex-col">
        <div
          // encType="multipart/form-data"
          // onSubmit={handleSubmit(onValid)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PhotoForm setFile={setFile} title="영수증을 올려주세요" />
          <button
            // type="submit"
            className=" text-white text-sm w-[180px] mt-4 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg"
            // disabled={loading}
            onClick={onClickHandler}
          >
            <div className="my-3 flex flex-col justify-center items-center">
              <div>{text}</div>
            </div>
          </button>
        </div>
        <div className="border-t-2 border-solid border-gray-200 w-full mt-4" />
        <div className="mt-2 text-sm mx-5 text text-gray-400">
          개인 정보 수집 목적 SODA는 다음과 같은 목적을 위하여 사용자의 영수증을
          수집합니다 <br />
          <br /> 1. 검증된 정보 유효성 검사를 위한 서비스 제공 목적 서비스의
          부적절한 사용을 방지하고, 검증된 회원이 리뷰를 작성할 수 있도록
          합니다.
          <br /> <br /> 2. 맞춤형 서비스 제공 목적 음식점 정보를 수기로 입력하지
          않고 검증을 거쳐 필드를 자동화하여 완성합니다. 원칙적으로 SODA는 상기
          목적의 범위 내에서 사용자의 개인 정보를 사용하며, 다른 목적을 위하여
          개인정보를 사용하거나 3자에게 제공하지 않으며, 저장하지 않습니다.
        </div>
      </div>
    </Layout>
  );
};

export default Create;
