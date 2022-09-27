import Layout from "@components/layout";
import ProfilePhoto from "@components/profilePhoto";
import {
  Icomment,
  IProfile,
  IReview,
  IStore,
  PropArray,
} from "@libs/client/sharedProp";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import type { NextPage } from "next";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Link from "next/link";

interface IEditProfile {
  avatar?: FileList;
  password?: string;
  introduce?: string;
  result?: string;
}

interface MutationResult {
  httpStatus: number;
  message: string;
  results: object;
}

const Profile: NextPage<{
  store: IStore;
  review: IReview;
  profile: IProfile;
  comments: [Icomment];
}> = ({ store, review, comments, profile }) => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  const { isLoading } = useUser();
  const [getIsMe, setIsMe] = useState(false);
  const [getIsFollow, setIsFollow] = useState(false);

  //---------폼 관련-----------
  const [edit, { loading, data, message: submitMessage }] =
    useMutation<MutationResult>("editprofile 관련 url");

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<IEditProfile>({
    mode: "onChange",
  });

  const oninvalid = (validForm: IEditProfile) => {
    console.log(validForm);
    edit(validForm);
    setEditProfile(false);
  };

  //---------폼 관련-----------

  //---------에디트 프로필 관려-----------
  const [getEditProfile, setEditProfile] = useState(false);
  //---------에디트 프로필 관려-----------

  //---------에디트 프로필 관려-----------
  const [getBookMark, setBookMark] = useState(false);

  //---------에디트 프로필 관려-----------

  //---------인피니티 관련-----------
  const getMorePost = async (page: number) => {};
  const [getBotPage, setBotPage] = useState(1);
  //---------인피니티 관련-----------

  const profileVariants = {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

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

      <AnimatePresence>
        {getEditProfile && (
          <motion.div
            className="absolute top-40 left-[76px] w-[250px] h-[420px] rounded-2xl  bg-white z-50 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.75, y: 30 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <form
              onSubmit={handleSubmit(oninvalid)}
              className="w-full h-full flex justify-center items-center flex-col "
            >
              <div className="w-[180px] h-[40px]">
                <label
                  htmlFor="avatar"
                  className="block text-white text-sm w-[180px] h-[40px] rounded-md bg-[#00572D]"
                >
                  <div className="w-full h-full flex justify-center items-center">
                    <span>아바타 수정</span>
                  </div>
                  <input
                    {...register("avatar")}
                    type="file"
                    id="avatar"
                    className="hidden absolute"
                    accept="image/*"
                  />
                  <div className="flex flex-col w-full h-full justify-center items-center shadow-lg "></div>
                </label>
              </div>
              <div className=" text-white text-sm w-[180px] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg">
                <div className="my-3 flex flex-col justify-center items-center">
                  <div>비밀번호 수정</div>
                  <input
                    className="w-36 h-9 rounded-xl mt-2 text-black"
                    type="password"
                    {...register("password", {
                      onChange() {
                        clearErrors("result");
                      },
                      minLength: {
                        value: 5,
                        message: "5글자 이상 입력해 주세요",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]/,
                        message: "비밀번호는 영문 대소문자와 포함해야합니다.",
                      },
                    })}
                  />
                </div>
              </div>
              <div className=" text-white text-sm w-[180px] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg">
                <div className="my-3 flex flex-col justify-center items-center">
                  <div>프로필 소개 수정</div>
                  <textarea
                    className="w-36 h-28 rounded-xl mt-2 text-black"
                    style={{ resize: "none" }}
                    rows={3}
                    {...register("introduce", {
                      onChange() {
                        clearErrors("result");
                      },
                      maxLength: {
                        value: 30,
                        message: "30글자 이하로 입력해 주세요",
                      },
                    })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className=" text-white text-sm w-[180px] mt-2 rounded-md bg-[#00572D] flex flex-col justify-center items-center shadow-lg"
                disabled={!isValid || loading || !isDirty}
              >
                <div className="my-3 flex flex-col justify-center items-center">
                  <div>
                    {loading
                      ? "프로필을 수정중입니다."
                      : data?.httpStatus === 400
                      ? "에러가 있습니다."
                      : errors?.introduce?.message
                      ? errors?.introduce?.message
                      : errors?.password?.message
                      ? errors?.password?.message
                      : "프로필 수정"}
                  </div>
                </div>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="absolute w-full h-full rounded-md bg-cover bg-center"
        style={{ backgroundImage: `url(${profile?.avatar})` }}
      >
        <div className="absolute backdrop-blur-lg w-full h-full bg-black bg-opacity-10 rounded-md">
          <div className="bg-white mt-36 w-full h-[680px] rounded-t-3xl flex items-center flex-col ">
            <div
              className="absolute left-[150px] top-20 rounded-full bg-cover bg-center h-[100px] w-[100px] shadow-md "
              style={{ backgroundImage: `url(${profile?.avatar})` }}
            />
            <div className="mt-12 flex flex-col items-center text-sm">
              <div className="text-lg font-bold"> {profile?.userName} </div>
              <div className="flex mt-3">
                <Link href={`/profile/${1}/followings`}>
                  <a className=" flex flex-col items-center justify-center">
                    <div className="text-base font-bold">
                      {profile?.following}{" "}
                    </div>
                    <div className="text-zinc-400"> 팔로잉</div>
                  </a>
                </Link>
                <div className="w-24" />

                <Link href={`/profile/${1}/followers`}>
                  <a>
                    <div className="flex flex-col items-center">
                      <div className="text-base font-bold">
                        {profile?.follower}
                      </div>
                      <div className="text-zinc-400">팔로워</div>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="flex flex-col items-center">
                {getIsMe ? (
                  <motion.div
                    onClick={() => {
                      setEditProfile(!getEditProfile);
                    }}
                    className="border border-[#00572D] w-44 px-14 mt-3 flex justify-center items-center text-sm rounded-md cursor-pointer"
                    layoutId="editModal"
                  >
                    <span>프로필 편집</span>분식 양식 양식
                  </motion.div>
                ) : (
                  <div
                    onClick={() => {
                      setIsFollow(!getIsFollow);
                    }}
                    className={cls(
                      "border border-[#00572D] py-[6px] w-44 mt-3 flex justify-center items-center text-sm rounded-md cursor-pointer",
                      getIsFollow ? "" : "bg-[#00572D] text-white font-semibold"
                    )}
                  >
                    <span>{getIsFollow ? "언팔로우 하기" : "팔로잉 하기"}</span>
                  </div>
                )}

                <div className="text-center my-4 text-zinc-500">
                  {profile?.introduce}
                </div>
              </div>
            </div>
            <div></div>

            <div className="w-full">
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
              <InfiniteScroll
                dataLength={PropArray.length}
                next={() => getMorePost(getBotPage)}
                hasMore={true}
                loader={null}
              >
                <div className=" grid grid-cols-3 gap-1 w-full h-[360px]">
                  {PropArray.map((data) => (
                    <div key={data.key}>
                      <Link href={`/reviews/${data.key}`}>
                        <a>
                          <div
                            className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center "
                            style={{ backgroundImage: `url(${data.img})` }}
                          />
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

export async function getServerSideProps() {
  const store = {
    score: 4,
    name: "준호네 떡볶이",
    phone: "02-1234-5678",
  };

  const profile = {
    avatar: "/img/profileAvatar.png",
    userName: "imiuiulady",
    following: 256,
    follower: 743,
    introduce: "커피를 좋아하는 나\n카누 위주로 먹습니다",
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
