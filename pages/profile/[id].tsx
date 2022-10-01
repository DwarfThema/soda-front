import Layout from "@components/layout";
import ProfilePhoto from "@components/profilePhoto";
import {
  Icomment,
  IProfile,
  IReview,
  IStore,
  IUserDetailInfo,
  MutationResult,
  PropArray,
} from "@libs/client/sharedProp";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import useSWR from "swr";
import EditProfileModal from "@components/editProfileModal";
import useMutation from "@libs/client/useMutation";
import useDelMutation from "@libs/client/useDelMutation";

const Profile: NextPage<{
  store: IStore;
  review: IReview;
  profile: IProfile;
  comments: [Icomment];
}> = ({ store, review, comments, profile }) => {
  //-------------- isMe 증명 관련---------------
  const [getUserId, setUserId] = useState<number>();

  const { user } = useUser();
  const { query } = useRouter();
  const { replace } = useRouter();

  const [getIsMe, setIsMe] = useState(false);
  const [getIsFollow, setIsFollow] = useState(false);

  const params = query?.id as any;
  useEffect(() => {
    setUserId(params);
    if (localStorage.getItem("userName") === params) {
      setIsMe(true);
    }
  }, []);
  //-------------- isMe 증명 관련---------------

  //-------------- 유저 데이터 관련---------------
  const { data: userData, mutate } = useSWR<MutationResult>(
    `https://mtvs.kro.kr:8001/user/${getUserId}`
  );
  const userInfo = userData?.results;

  //-------------- 유저 데이터 관련---------------
  //-------------- 팔로우 언팔 관련---------------

  const [fol, { loading: folLoading, data: folData, message: folMessage }] =
    useMutation<MutationResult>(
      `https://mtvs.kro.kr:8001/follow/${userInfo?.user?.userName}`
    );
  const [unFol] = useDelMutation(
    `https://mtvs.kro.kr:8001/follow/${userInfo?.user?.userName}`
  );

  const followMutation = () => {
    setIsFollow(!getIsFollow);
    if (!userData) return;
    if (!userInfo) return;

    if (getIsFollow) {
      unFol(null);
      mutate(
        {
          ...userData,
          results: {
            ...userData?.results,
            follower: userInfo.follower - 1,
          },
        },
        false
      );
    } else if (!getIsFollow) {
      fol(null);
      mutate(
        {
          ...userData,
          results: {
            ...userData?.results,
            follower: userInfo.follower + 1,
          },
        },
        false
      );
    }
  };

  //-------------- 팔로우 언팔 관련---------------

  //---------에디트 프로필 관련-----------
  const [getEditProfile, setEditProfile] = useState(false);
  //---------에디트 프로필 관련-----------

  //---------내 리뷰 & 북마크 관련-----------
  const [getBookMark, setBookMark] = useState(false);

  //---------내 리뷰 & 북마크 관련-----------

  // --------------------- 내 리뷰 관련 ---------------------
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [init, setInit] = useState(true);
  const fetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/review/${params}?page=0&size=20`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        setData(res?.results?.list);
        setPage((p) => p + 1);
      });
  };

  const fetchMoreData = (page: number) => {
    return fetcher(page);
  };
  useEffect(() => {
    if (init) {
      fetcher(page);
      setInit(false);
    }
  }, []);
  // --------------------- 내 리뷰 관련 ---------------------

  // --------------------- 찜 목록 관련 ---------------------
  const [markPage, setmarkPage] = useState(1);
  const [markData, marksetData] = useState([]);
  const fetcherMark = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/wish/`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        marksetData(res?.results?.list);
        setmarkPage((p) => p + 1);
      });
  };

  const fetchMarkMoreData = (page: number) => {
    return fetcherMark(page);
  };

  useEffect(() => {
    fetcherMark(page);
  }, []);

  // --------------------- 찜 목록 관련 ---------------------

  // --------------------- 애니메이션 관련 ---------------------
  const profileVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };
  // --------------------- 애니메이션 관련 ---------------------

  useEffect(() => {}, []);

  // --------------------로그아웃 ------------------
  return (
    <Layout seoTitle="프로필" profile>
      <motion.div
        onClick={() => {
          setEditProfile(!getEditProfile);
        }}
        animate={getEditProfile ? "open" : "closed"}
        variants={profileVariants}
        transition={{
          ease: "easeInOut",
          duration: 0.2,
        }}
        className={cls(
          "absolute  w-full h-full bg-gray-900 bg-opacity-50 cursor-pointer rounded-md ",
          getEditProfile ? "z-30" : "-z-30"
        )}
      />
      <div>
        <EditProfileModal
          getEditProfile={getEditProfile}
          setEditProfile={setEditProfile}
        />
      </div>
      <div
        className="absolute w-full h-full rounded-md bg-cover bg-center"
        style={{
          backgroundImage: userInfo?.user?.profileImg
            ? `url(${userInfo?.user?.profileImg?.savedPath})`
            : `url(/img/so-sm.jpg)`,
        }}
      >
        <div className="absolute backdrop-blur-lg w-full h-full bg-black bg-opacity-10 rounded-md">
          <div className="bg-white mt-36 w-full h-[680px] rounded-t-3xl flex items-center flex-col ">
            <div
              className="absolute left-[150px] top-20 rounded-full bg-cover bg-center h-[100px] w-[100px] shadow-md "
              style={{
                backgroundImage: userInfo?.user?.profileImg
                  ? `url(${userInfo?.user?.profileImg?.savedPath})`
                  : `url(/img/so-sm.jpg)`,
              }}
            />
            <div className="mt-12 flex flex-col items-center text-sm">
              <div className="text-lg font-bold">
                {userInfo?.user?.userName}
              </div>
              <div className="flex mt-3">
                <Link href={`/profile/followings/${userInfo?.user?.userName}`}>
                  <a className=" flex flex-col items-center justify-center">
                    <div className="text-base font-bold">
                      {userInfo?.following}
                    </div>
                    <div className="text-zinc-400"> 팔로잉</div>
                  </a>
                </Link>
                <div className="w-24" />

                <Link href={`/profile/followers/${userInfo?.user?.userName}`}>
                  <a>
                    <div className="flex flex-col items-center">
                      <div className="text-base font-bold">
                        {userInfo?.follower}
                      </div>
                      <div className="text-zinc-400">팔로워</div>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="flex flex-col items-center">
                {getIsMe ? (
                  <div className="flex">
                    <motion.div
                      onClick={() => {
                        setEditProfile(!getEditProfile);
                      }}
                      className="border border-[#00572D] w-44 px-13 py-2 mt-3 flex justify-center items-center text-sm rounded-md cursor-pointer"
                      layoutId="editModal"
                    >
                      <span>프로필 편집</span>
                    </motion.div>
                    <div
                      onClick={() => {
                        replace(`/enter`);
                        localStorage.clear();
                      }}
                      className="border border-[#00572D] w-16 px-13 py-2 mt-3 ml-2 flex justify-center items-center text-sm rounded-md cursor-pointer"
                    >
                      <span>로그아웃</span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={followMutation}
                    className={cls(
                      "border border-[#00572D] py-[6px] w-44 mt-3 flex justify-center items-center text-sm rounded-md cursor-pointer",
                      getIsFollow ? "" : "bg-[#00572D] text-white font-semibold"
                    )}
                  >
                    <span>{getIsFollow ? "언팔로우 하기" : "팔로잉 하기"}</span>
                  </button>
                )}

                <div className="text-center my-4 text-zinc-500"></div>
              </div>
            </div>
            <div></div>

            <div className="w-full border border-gray-200">
              <div className="flex justify-center h-10 mt-3">
                <div
                  onClick={() => {
                    setBookMark(false);
                  }}
                  className={cls(
                    "w-1/2 flex justify-center cursor-pointer",
                    !getBookMark ? "text-green-800" : ""
                  )}
                >
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
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                    />
                  </svg>
                  {!getBookMark ? (
                    <motion.div
                      className=" absolute border-b-4 border-solid border-red-500 mb-1 w-1/2 h-[39px]"
                      layoutId="underline"
                    />
                  ) : null}
                </div>

                <div
                  onClick={() => {
                    setBookMark(true);
                  }}
                  className={cls(
                    "w-1/2 flex justify-center cursor-pointer",
                    getBookMark ? "text-green-800" : ""
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {getBookMark ? (
                    <motion.div
                      className=" absolute border-b-4 border-solid border-red-500 mb-1 w-1/2 h-[39px]"
                      layoutId="underline"
                    />
                  ) : null}
                </div>
              </div>

              {!getBookMark ? (
                // 내 리뷰 목록
                <InfiniteScroll
                  dataLength={data.length}
                  next={() => fetchMoreData(page)}
                  hasMore={true}
                  loader={null}
                >
                  <div className=" grid grid-cols-3 gap-1 w-full h-[360px]">
                    {data?.map((data: any, index) => {
                      if (!data) return;
                      return (
                        <div key={index}>
                          <Link href={`/reviews/${data.id}`}>
                            <a>
                              <div
                                className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center "
                                style={{
                                  backgroundImage: `url(${data.imageSrc})`,
                                }}
                              />
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              ) : (
                // 내 북마크 목록
                <InfiniteScroll
                  dataLength={markData.length}
                  next={() => fetchMarkMoreData(markPage)}
                  hasMore={true}
                  loader={null}
                >
                  <div className=" grid grid-cols-3 gap-1 w-full h-[360px]">
                    {markData?.map((data: any, index) => {
                      if (!data) return;
                      return (
                        <div key={index}>
                          <Link href={`/store/store2/1?data=${data.id}`}>
                            <a>
                              <div
                                className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center "
                                style={{
                                  backgroundImage: `url(${data.imagePath})`,
                                }}
                              />
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
