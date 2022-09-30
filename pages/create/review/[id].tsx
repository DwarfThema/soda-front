import Button from "@components/button";
import Layout from "@components/layout";
import PhotoForm from "@components/photoForm";
import TextArea from "@components/textArea";
import { Icomment, IProfile, IReview, IStore } from "@libs/client/sharedProp";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import type { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PhotoForm {
  message: string;
  payload: string;
  photo: FileList;
}

interface MutationResult {
  httpStatus: number;
  message: string;
  results: object;
}

const CreateReview: NextPage = ({}) => {
  const [stars, setStars] = useState(0);
  const rounter = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<PhotoForm>({
    mode: "onChange",
  });
  const onValid = (validForm: PhotoForm) => {
    rounter.push("/create/review/1");
  };

  // ---------------- 정보를 바탕으로 음식점 데이터 --------------------
  const { id }: any = rounter?.query;
  const [page, setPage] = useState(1);
  const [restaurant, setRestaurant] = useState({ id: 1, name: "" });
  const fetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/restaurant/${id}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        setRestaurant(res.results.restaurant);
      });
  };

  useEffect(() => {
    fetcher(page);
  }, []);

  // -------------post 리뷰 API 관련 --------------------------------

  const [file, setFile] = useState("");
  const [text, setText] = useState("작성하기");
  const [reviewData, setReviewData] = useState({
    text: "",
    content: "",
    grade: "",
  });

  const router = useRouter();
  const query = router?.query;
  const queryId = router?.query?.id;

  function mutation(formData: any) {
    fetch("https://mtvs.kro.kr:8001/review", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
      body: formData,
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => {
        setText("요청 중");
        router.push(`/`);
      });
  }
  const onClickHandler = () => {
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("restaurantId", query?.Id);
    formData.append("categoryName", "물만두");
    formData.append("content", reviewData.text);
    formData.append("grade", `${stars}`);
    mutation(formData);
    setText("요청중...");
  };
  const onChangeHandle = (e: any) => {
    setReviewData({ ...reviewData, text: e.target.value });
  };
  // ----------------------------------------------------------------
  return (
    <Layout seoTitle="리뷰 작성" create>
      <div className="w-full h-full  rounded-md flex mt-24 items-center flex-col">
        {/* <form onSubmit={handleSubmit(onValid)}> */}
        <div>
          <PhotoForm
            register={register("photo")}
            setFile={setFile}
            title="사진을 올려주세요"
          />{" "}
          <div className="absolute border-t-2 border-solid border-gray-200 w-full mt-2 left-0" />
          <div className="mt-7  mx-5 text-lg font-bold text-gray-600 flex">
            <div className="flex flex-col w-16">
              <div>상호명</div>
              <div className="mt-2">평점 </div>
            </div>
            <div className="flex flex-col ml-4">
              <div> {restaurant.name} </div>
              <div className="flex items-center ml-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={cls(
                      "h-4 w-4",
                      stars >= star ? "text-yellow-400" : "text-gray-400"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    onClick={() => setStars(star)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute z-10 mx-5 mt-2 text-lg font-bold text-gray-600 bg-white px-3 left-3">
            리뷰
          </div>
          <div className="mt-4">
            <TextArea
              onChange={onChangeHandle}
              register={register("payload", {
                required: true,
                minLength: 10,
                maxLength: 200,
              })}
              name="description"
              placeholder="리뷰를 작성해 주세요!"
              required
            />
          </div>
          {/* <div className="mt-1">
            <Button
              type="submit"
              error={submitMessage}
              review
              text={
                loading
                  ? "리뷰를 등록중입니다.."
                  : data?.httpStatus === 400
                  ? "에러가 있습니다."
                  : "입력하기"
              }
              disabled={!isValid || loading || !isDirty}
            />
          </div> */}
          <button
            // type="submit"
            className=" text-white text-sm w-[100%] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg"
            // disabled={loading}
            onClick={onClickHandler}
          >
            <div className="my-3 flex flex-col justify-center items-center">
              <div>{text}</div>
            </div>
          </button>
        </div>
        {/* </form> */}
      </div>
    </Layout>
  );
};

export default CreateReview;

export async function getServerSideProps() {
  const store = {
    score: 4,
    name: "준호네 떡볶이",
    phone: "02-1234-5678",
  };

  const profile = {
    avatar: "/img/profileAvatar.png",
    userName: "imiuiulady",
  };

  const review = {
    store: store,
    user: profile,
    name: "duko998",
    score: 4,
    likes: 677,
    payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
  };

  const comments = [
    {
      id: 1,
      payload:
        "와 제가 최애하는 집이에요 여기 가셨군요 저도 정말 여기 좋아하는데 다음에 같이가는걸로 하실까요? 정말 맛있겠다~~💖💖",
      user: profile,
      isMe: true,
    },
    {
      id: 2,
      payload:
        "와 제가 최애하는 집이에요 여기 가셨군요 저도 정말 여기 좋아하는데 다음에 같이가는걸로 하실까요? 정말 맛있겠다~~💖💖",
      user: profile,
    },
    {
      id: 3,
      payload:
        "와 제가 최애하는 집이에요 여기 가셨군요 저도 정말 여기 좋아하는데 다음에 같이가는걸로 하실까요? 정말 맛있겠다~~💖💖",
      user: profile,
    },
    {
      id: 4,
      payload:
        "와 제가 최애하는 집이에요 여기 가셨군요 저도 정말 여기 좋아하는데 다음에 같이가는걸로 하실까요? 정말 맛있겠다~~💖💖",
      user: profile,
      isMe: true,
    },
  ];

  return {
    props: {
      store: store,
      review: review,
      profile: profile,
      comments: comments,
    },
  };
}
