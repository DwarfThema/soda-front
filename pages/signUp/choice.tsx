import Layout from "@components/layout";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Duplex } from "stream";
import ChoiceMap from "@components/choiceMap";

/* https://codesandbox.io/s/sd9b9?file=/src/App.tsx:1449-1455
  https://codesandbox.io/s/jp16tz?file=/src/App.tsx:784-791
*/

const Choice: NextPage = () => {
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

  const router = useRouter();

  const [page, setPage] = useState(1);
  const [data, setDate] = useState([]);

  const fetch = (pageNumber: number = 1) => [];

  const getMorePost = async (page: number) => {};

  const [getSelected, setSelected] = useState(0);
  useEffect(() => {
    if (getSelected >= 5) {
      router.push("/");
    }
  }, [getSelected]);

  const [getByeBye, setByeBye] = useState(true);
  const byebye = {
    show: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <Layout choice seoTitle="회원가입">
      {getByeBye ? (
        <>
          <div
            onClick={() => {
              setByeBye(false);
            }}
            className="absolute h-full w-full flex items-end justify-end z-30 cursor-pointer"
          >
            <div className=" bg-gradient-to-t from-black to-transparent w-full h-1/2 rounded-md opacity-80" />
            <div className="absolute m-8 text-white text-2xl text-right font-bold ">
              오늘 먹고싶은 <br />
              음식을 골라주세요!&nbsp;&nbsp;🤩
            </div>
          </div>
          <motion.div
            variants={byebye}
            initial="show"
            animate="hidden"
            transition={{
              ease: "easeInOut",
              duration: 1,
            }}
            className="bg-[#FEBC10] w-full h-full flex justify-center items-center flex-col absolute z-20"
          />
        </>
      ) : null}
      <InfiniteScroll
        dataLength={propArray.length}
        next={() => getMorePost(page)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="m-2 grid grid-cols-2 gap-2 h-[806px]">
          {propArray.map((data) => (
            <ChoiceMap
              key={data?.key}
              img={data?.img}
              cat={data?.cat1}
              selected={setSelected}
              getSelected={getSelected}
            />
          ))}
        </div>
      </InfiniteScroll>
      {getSelected >= 1 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
          className=" absolute bg-red-800 w-64 h-12 text-center text-white p-2 rounded-full shadow-xl bottom-12 right-[70px] "
        >
          <div>{5 - getSelected}&nbsp;개 더 골라주세요!</div>
        </motion.div>
      ) : null}
    </Layout>
  );
};

export default Choice;
