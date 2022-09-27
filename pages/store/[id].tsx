import Layout from "@components/layout";
import { cls } from "@libs/client/utils";
import { NextPage } from "next";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { IReview, IStore } from "@libs/client/sharedProp";
import Link from "next/link";

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

const Store: NextPage<{ store: IStore; review: IReview }> = ({
  store,
  review,
}) => {
  //-------- 스와이프 부분------------
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, propArray?.length, page);
  const swipeConfidenceThreshold = 5000;
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  //-------- 스와이프 부분------------

  const [getPhotoCount, setPhotoCount] = useState(5);
  const getMorePost = async (page: number) => {};
  const [getBotPage, setBotPage] = useState(1);

  return (
    <Layout seoTitle="상호명" home>
      <div>
        <div className="bg-zinc-400-300 h-96 w-full ">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className="absolute w-full h-96 flex items-end justify-between shadow-xl rounded-t-md bg-cover bg-center "
              key={page}
              style={{
                backgroundImage: `url(${propArray[imageIndex]?.img})`,
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
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
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
                <div className="text-white w-20 h-8 bg-gray-400 bg-opacity-40 backdrop-blur-sm flex justify-center rounded-full pt-[1px]">
                  <span>{store?.score}</span>
                  <span>&nbsp;/ 5</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div>
        <div className="mt-5 ml-5 mb-2">
          <div className="text-xl font-bold"> {store.name} </div>
          <div className="text-sm ">
            <span>☎️&nbsp;</span>
            <span>{store?.phone}</span>
          </div>
        </div>
        <div>
          <div className="ml-3 text-sm font-bold">횐님들의 리뷰 ✍️</div>
          <div className="mt-1 mx-2 h-[10px]">
            <InfiniteScroll
              dataLength={propArray.length}
              next={() => getMorePost(getBotPage)}
              hasMore={true}
              loader={null}
            >
              <div className=" grid grid-cols-3 gap-1 w-full h-[300px]">
                {propArray.map((data) => (
                  <div key={data.key}>
                    <Link href={`/reviews/${data.key}`}>
                      <a>
                        <div
                          className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center "
                          style={{ backgroundImage: `url(${data.img})` }}
                        >
                          <div className="flex bg-gradient-to-t from-black to-transparent w-full h-10 rounded-md opacity-80">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex justify-center items-center m-1 shadow-xl">
                              <div
                                className="h-7 w-7 rounded-full  bg-cover bg-center "
                                style={{ backgroundImage: `url(${data.img})` }}
                              />
                            </div>
                            <div>
                              <div
                                className="text-white text-sm"
                                style={{ textShadow: "1px 1px 2px black" }}
                              >
                                {review?.user?.userName}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                      key={star}
                                      className={cls(
                                        "h-3 w-3 shadow-2xl",
                                        review?.score >= star
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
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
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
