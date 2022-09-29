import Input from "@components/InputForm";
import Layout from "@components/layout";
import ProfilePhoto from "@components/profilePhoto";
import { Icomment, IProfile, IReview, IStore } from "@libs/client/sharedProp";
import { cls } from "@libs/client/utils";
import { profile } from "console";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";

const propArray = [
  { key: 1, img: "/img/choice/asian.png", cat1: "아시안" },
  { key: 2, img: "/img/choice/asian2.jpeg", cat1: "아시안" },
  { key: 3, img: "/img/choice/bbq.jpeg", cat1: "고기/구이" },
  { key: 4, img: "/img/choice/bbq2.jpeg", cat1: "고기/구이" },
  { key: 5, img: "/img/choice/chinese.jpeg", cat1: "중식" },
  { key: 6, img: "/img/choice/chinese2.jpeg", cat1: "중식" },
  { key: 7, img: "/img/choice/fast.jpg", cat1: "패스트푸드" },
  { key: 8, img: "/img/choice/fast2.jpeg", cat1: "패스트푸드" },
  { key: 9, img: "/img/choice/japon.jpeg", cat1: "일식" },
  { key: 10, img: "/img/choice/japon2.jpeg", cat1: "일식" },
  { key: 11, img: "/img/choice/korean.jpeg", cat1: "백반/국수" },
  { key: 12, img: "/img/choice/korean2.jpeg", cat1: "백반/국수" },
  { key: 13, img: "/img/choice/korean3.jpeg", cat1: "백반/국수" },
  { key: 14, img: "/img/choice/ksoup.jpeg", cat1: "찜/탕/찌개" },
  { key: 15, img: "/img/choice/ksoup2.jpeg", cat1: "찜/탕/찌개" },
  { key: 16, img: "/img/choice/ksoup3.jpeg", cat1: "찜/탕/찌개" },
  { key: 17, img: "/img/choice/pizza.jpeg", cat1: "피자" },
  { key: 18, img: "/img/choice/side.jpeg", cat1: "분식" },
  { key: 19, img: "/img/choice/side2.jpeg", cat1: "분식" },
  { key: 20, img: "/img/choice/western.jpeg", cat1: "양식" },
  { key: 21, img: "/img/choice/western.png", cat1: "양식" },
  { key: 22, img: "/img/choice/western2.jpeg", cat1: "양식" },
];

interface IReply {
  payload: string;
  result?: string;
}

const Review: NextPage<{
  store: IStore;
  review: IReview;
  profile: IProfile;
  comments: [Icomment];
}> = ({ store, review, comments }) => {
  //---------------라우터 관련-----------------
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  //---------------라우터 관련-----------------

  //---------폼 관련-----------
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<IReply>({
    mode: "onChange",
  });
  //---------폼 관련-----------

  //---------인피니티 관련-----------
  const getMorePost = async (page: number) => {};
  const [page, setPage] = useState(1);
  //---------인피니티 관련-----------

  return (
    <Layout seoTitle="리뷰" review>
      <div className="bg-white w-full h-24 max-w-xl justify-center text-lg px-3 pb-3 font-medium rounded-t-3xl text-gray-800 text-opacity-50 border-b top-0  flex items-end">
        <button onClick={onClick} className="flex w-full ">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      </div>
      <div>
        <div className="flex justify-between items-center mx-2 my-1">
          <div className="flex text-sm items-center">
            <ProfilePhoto md avatar={review?.user?.avatar} />
            <div className="ml-1">
              <div> {review?.user?.userName} </div>
              <div> {review?.store?.name} </div>
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgba(1,1,1,0.5)"
              className="w-8 h-8 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
        </div>
        <div
          className="h-[290px] bg-center bg-cover flex items-end justify-end"
          style={{ backgroundImage: `url(${propArray[1]?.img})` }}
        >
          <div className="text-white w-full text-right m-3">
            {review.payload}
          </div>
        </div>
        <div className="border-b flex justify-between mt-2 mx-2">
          <div className="mb-3">
            <div className="text-lg font-bold"> {store?.name} </div>
            <div>
              <div className="flex items-center ml-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={cls(
                      "h-4 w-4",
                      store?.score >= star ? "text-yellow-400" : "text-gray-400"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="text-sm font-bold">
              <span>좋아요</span>
              <span className="ml-1"> {review.likes}개 </span>
            </div>
            <div className="mx-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <div className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <InfiniteScroll
        dataLength={propArray.length}
        next={() => getMorePost(page)}
        hasMore={true}
        loader={null}
      >
        <div className="mt-3 mx-4 h-[240px]">
          {comments?.map((comment: Icomment) => (
            <div
              key={comment?.id}
              className={cls(
                "p-2  w-full rounded-t-2xl mb-3 flex ",
                comment.isMe
                  ? "bg-[#008939] bg-opacity-20 rounded-l-2xl"
                  : "bg-zinc-200 rounded-r-2xl"
              )}
            >
              <div>
                <ProfilePhoto md avatar={comment?.user?.avatar} />
              </div>
              <div className="flex ml-2">
                <div>
                  <div className="text-base font-bold">
                    {comment?.user?.userName}
                  </div>
                  <div className="text-sm">{comment?.payload}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <div className="absolute bottom-0 border-t h-24 w-full z-30 bg-white flex justify-center rounded-b-3xl ">
        <div className="mt-3 flex">
          <div>
            <ProfilePhoto md avatar={review?.user?.avatar} />
          </div>
          <div className="border w-full h-11 mx-2 rounded-full">
            <Input
              register={register("payload", {
                onChange() {
                  clearErrors("result");
                },
              })}
              type="text"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Review;

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
