import { MutationResult } from "@components/editProfileModal";
import Input from "@components/InputForm";
import Layout from "@components/layout";
import ProfilePhoto from "@components/profilePhoto";
import { Icomment, IprofileImg, IUser } from "@libs/client/sharedProp";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import { profile } from "console";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";

interface IComment {
  comment: string;
  result: string;
}

const Review: NextPage = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  //-------------- isMe 증명 관련---------------
  const [getUserId, setUserId] = useState<number>();

  const { user }: any = useUser();

  const { query } = useRouter();

  const [getIsMe, setIsMe] = useState(false);

  const params = query?.id as any;
  useEffect(() => {

    if (user?.userName === params) {
      setIsMe(true);
    }
  }, []);

  //-------------- isMe 증명 관련---------------

  //---------리뷰 디테일 api-----------
  const { data: reviewDetailData, mutate } = useSWR(
    `https://mtvs.kro.kr:8001/review/detail/${params}`
  );

  const reviewDetail = reviewDetailData?.results;
  const reviewContents = reviewDetailData?.results?.review;
  const reviewComments = reviewDetailData?.results?.commentList;

  //---------리뷰 디테일 api-----------

  //---------폼 관련-----------
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isValid },
  } = useForm<IComment>({
    mode: "onChange",
  });

  const onValid = (validForm: IComment) => {
    if (loading) return;
    reset();
    enter(validForm);
    mutate(
      (prev: any) =>
        prev &&
        ({
          ...prev,
          results: {
            ...prev.results,
            commentList: [
              ...prev.results.commentList,
              {
                date: Date.now(),
                content: validForm.comment,
                user: { ...user },
              },
            ],
          },
        } as any),
      false
    );
  };

  // 댓글 포스트
  const [enter, { loading, data, message: submitMessage }] =
    useMutation<MutationResult>(
      `https://mtvs.kro.kr:8001/review/comment/${params}`
    );
  //---------폼 관련-----------

  //---------인피니티 관련-----------
  const getMorePost = async (page: number) => {};
  const [page, setPage] = useState(1);
  //---------인피니티 관련-----------
  // -------좋아요 관련-------------

  const [isLike, setIsLike] = useState(false);
  const [isBook, setIsBook] = useState(false);

  // -----------------------------

  // ---------------- 음식점 찜하기 ------------------------

  const [isWish, setIsWish] = useState(false);
  function mutation(jsonData: any, method: any) {
    fetch("https://mtvs.kro.kr:8001/wish", {
      method: method,
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => {});
  }
  const onClickWish = () => {
    if (isBook) {
      mutation(`{"restaurantId" : ${reviewDetail?.restaurant?.id}}`, "POST");
    } else {
      mutation(`{"restaurantId" : ${reviewDetail?.restaurant?.id}}`, "DELETE");
    }
  };
  // ---------------- 음식점 찜하기 ------------------------


  function mutation2(jsonData: any, method: any) {
    fetch("https://mtvs.kro.kr:8001/review/like/6", {
      method: method,
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((res) => res.json().catch(() => {}))
      .then((json) => {});
  }
  const onClickWish2 = () => {
    if (isBook) {
      mutation(`{"restaurantId" : ${reviewDetail?.restaurant?.id}}`, "POST");
    } else {
      mutation(`{"restaurantId" : ${reviewDetail?.restaurant?.id}}`, "DELETE");
    }
  };

  useEffect(() => {
    setIsLike(reviewDetail?.isLike);
    setIsBook(reviewDetail?.isWish);
  }, [reviewDetail]);
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
            <Link href={`/profile/${reviewContents?.user?.userName}`}>
              <a>
                <ProfilePhoto
                  md
                  avatar={reviewContents?.user?.profileImg?.savedPath}
                />
              </a>
            </Link>
            <div className="ml-1">
              <Link href={`/profile/${reviewContents?.user?.userName}`}>
                <a>
                  <div> {reviewContents?.user?.userName} </div>
                </a>
              </Link>
              <div> {reviewContents?.categoryName} </div>
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
          style={{
            backgroundImage: `url(${reviewContents?.imageSrc})`,
          }}
        >
          <div className="text-white w-full text-right m-3">
            {reviewContents?.content}
          </div>
        </div>
        <div className="border-b flex justify-between mt-2 mx-2">
          <div className="mb-3">
            <div className="text-lg font-bold">
              {" "}
              {reviewContents?.restaurant?.name}{" "}
            </div>
            <div>
              <div className="flex items-center ml-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={cls(
                      "h-4 w-4",
                      reviewContents?.grade >= star
                        ? "text-yellow-400"
                        : "text-gray-400"
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
          {/*           <div className="flex">
            <div className="text-sm font-bold">
              <span>좋아요</span>
              <span className="ml-1">
                {" "}
                {isLike ? reviewDetail?.likeCount + 1 : reviewDetail?.likeCount}
                개{" "}
              </span>
            </div>
            <div className="mx-2">
              {isLike ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={(e) => {
                    setIsLike(!isLike);
                  }}
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={(e) => {
                    setIsLike(!isLike);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </div>
            <div className="mr-3">
              {isBook ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    setIsBook(!isBook);
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    setIsBook(!isBook);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <InfiniteScroll
        dataLength={100}
        next={() => getMorePost(page)}
        hasMore={true}
        loader={null}
      >
        <div className="mt-3 mx-4 h-[240px]">
          {reviewComments?.map((comment: Icomment, index: number) => (
            <div
              key={index}
              className={cls(
                "p-2  w-full rounded-t-2xl mb-3 flex ",
                user?.userName === comment?.user?.userName
                  ? "bg-[#008939] bg-opacity-20 rounded-l-2xl"
                  : "bg-zinc-200 rounded-r-2xl"
              )}
            >
              <div>
                <Link href={`/profile/${comment?.user?.userName}`}>
                  <a>
                    <ProfilePhoto
                      md
                      avatar={comment?.user?.profileImg?.savedPath}
                    />
                  </a>
                </Link>
              </div>
              <div className="flex ml-2">
                <div>
                  <div className="text-base font-bold">
                    <Link href={`/profile/${comment?.user?.userName}`}>
                      <a>{comment?.user?.userName}</a>
                    </Link>
                  </div>
                  <div className="text-sm">{comment?.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      <div className="fixed bottom-0 border-t h-24 w-full z-30 bg-white flex justify-center rounded-b-3xl ">
        <div className="mt-3 flex">
          <div>
            <ProfilePhoto md avatar={user?.profileImg?.savedPath} />
          </div>
          <form
            className="border w-full h-11 mx-2 rounded-full"
            onSubmit={handleSubmit(onValid)}
          >
            <Input
              errorMessage={errors?.comment?.message}
              register={register("comment", {
                onChange() {
                  clearErrors("result");
                },
              })}
              type="text"
              reply
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Review;
