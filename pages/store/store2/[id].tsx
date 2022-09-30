import Layout from "@components/layout";
import { cls } from "@libs/client/utils";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { IReview, IStore } from "@libs/client/sharedProp";
import Link from "next/link";
import { useRouter } from "next/router";

const BannerVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 0 : -0,
      opacity: 1,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 0 : -0,
      opacity: 1,
    };
  },
};

// ----------------상점 정보 가져오기-------------------

const Store: NextPage<{ store: IStore; review: IReview }> = ({
  store,
  review,
}) => {
  //-------- 스와이프 부분------------
  const [[page, direction], setPage] = useState([0, 0]);
  const swipeConfidenceThreshold = 5000;
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  //-------- 스와이프 부분------------

  // -------------- 상점 정보 가져오기 --------------------
  const router = useRouter();
  const { data } = router.query;
  const [res, setRes] = useState({
    restaurant: { imagePath: "", name: "", phone: "" },
    reviewList: [],
  });

  const fetcher = () => {
    const url = `https://mtvs.kro.kr:8001/restaurant/${data}`;
    console.log(url);
    const url2 = `https://mtvs.kro.kr:8001/restaurant/35379184`;
    fetch(url, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        console.log("SDfsdf", res);
        setRes(res?.results);
      });
  };
  useEffect(() => {
    fetcher();
  }, []);
  // -------------- 상점 정보 가져오기 --------------------

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
      .then((json) => {
        console.log(json);
      });
  }
  const onClickWish = () => {
    mutation(`{"restaurantId" : ${res?.restaurant?.id}}`, "POST");
    setIsWish(true);
  };
  const onClickDeleteWish = () => {
    mutation(`{"restaurantId" : ${res?.restaurant?.id}}`, "DELETE");
    setIsWish(false);
  };

  const [getPhotoCount, setPhotoCount] = useState(1);
  const getMorePost = async (page: number) => {};
  const [getBotPage, setBotPage] = useState(1);
  const color = "red";
  return (
    <Layout seoTitle="상호명" home>
      <div>
        <div className="bg-zinc-400-300 h-96 w-full ">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className="absolute w-full h-96 flex items-end justify-between shadow-xl rounded-t-md bg-cover bg-center "
              key={page}
              style={{
                backgroundImage: `url(${res?.restaurant?.imagePath})`,
              }}
              custom={direction}
              variants={BannerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 1000, damping: 100 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e: any, { offset, velocity }: any) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  if (getPhotoCount + 1 <= data?.length) {
                    setPhotoCount(getPhotoCount + 1);
                    paginate(1);
                    fetcher();
                  }
                } else if (swipe > swipeConfidenceThreshold) {
                  if (getPhotoCount - 1 > 0) {
                    paginate(-1);
                    setPhotoCount(getPhotoCount - 1);
                    fetcher();
                  }
                }
              }}
            >
              <div className="flex w-full items-end justify-between m-5">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={cls(
                        "h-9 w-9",
                        store?.score >= star
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div>
        <div className="mt-5 ml-5 mb-2">
          <div className="text-xl font-bold"> {res?.restaurant?.name} </div>
          {isWish ? (
            <div onClick={onClickDeleteWish}>찜빼기</div>
          ) : (
            <div onClick={onClickWish}>찜하기</div>
          )}
          <div className="text-sm ">
            <span>☎️&nbsp;</span>
            <span>{res?.restaurant?.phone}</span>
          </div>
        </div>
        <div>
          <div className="ml-3 text-sm font-bold">횐님들의 리뷰 ✍️</div>
          <div className="mt-1 mx-2 h-[10px]">
            <InfiniteScroll
              dataLength={res?.reviewList?.length}
              next={() => getMorePost(getBotPage)}
              hasMore={true}
              loader={null}
            >
              {res?.reviewList?.length == 0 ? (
                <div className="w-full h-[300px] flex justify-center items-center bg-gray-300 font-bold rounded-lg">
                  <p className="">리뷰가 없습니다.</p>
                </div>
              ) : (
                <div className=" grid grid-cols-3 gap-1 w-full h-[300px]">
                  {res?.reviewList?.map((data, index) => (
                    <div key={index}>
                      <Link href={`/reviews/${index}`}>
                        <a>
                          <div
                            className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center "
                            style={{
                              backgroundImage: `url(${data?.imageSrc})`,
                            }}
                          >
                            <div className="flex bg-gradient-to-t from-black to-transparent w-full h-10 rounded-md opacity-80">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex justify-center items-center m-1 shadow-xl">
                                <div
                                  className="h-7 w-7 rounded-full  bg-cover bg-center "
                                  style={{
                                    backgroundImage: `url(${data?.user?.profileImg?.savedPath})`,
                                  }}
                                />
                              </div>
                              <div>
                                <div
                                  className="text-white text-sm"
                                  style={{ textShadow: "1px 1px 2px black" }}
                                >
                                  {review?.user?.userName}
                                </div>
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Store;

export async function getServerSideProps() {
  const store = {
    score: 4,
    phone: "02-1234-5678",
    name: "준호네 떡볶이",
  };

  const profile = {
    avatar: "/img/profileAvatar.png",
    userName: "imiuiulady",
  };

  const review = {
    user: profile,
    score: 4,
  };

  return { props: { store: store, review: review } };
}
