import Layout from "@components/layout";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChoiceMap from "@components/choiceMap";
import useUser from "@libs/client/useUser";

/* https://codesandbox.io/s/sd9b9?file=/src/App.tsx:1449-1455
  https://codesandbox.io/s/jp16tz?file=/src/App.tsx:784-791
*/

const Choice: NextPage = () => {
  //------------------유저 관련---------------
  const user = useUser();
  //------------------유저 관련---------------

  const router = useRouter();
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

  // --------------------- 인피니티 관련 ---------------------

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const fetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/favorite?page=${pageNumber}&size=150`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        setData((d) => d.concat(res?.results?.list));
        setPage((p) => p + 1);
      });
  };

  const fetchMoreData = (page: number) => {
    return fetcher(page);
  };

  useEffect(() => {
    fetcher(page);
  }, []);

  // --------------------- 인피니티 관련 ---------------------

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
        dataLength={data.length}
        next={() => fetchMoreData(page)}
        hasMore={true}
        loader={<h4>.</h4>}
      >
        <div className="m-2 grid grid-cols-2 gap-2 h-[806px]">
          {data?.map((data: any, index) => (
            <ChoiceMap
              key={index}
              img={data?.image}
              cat={data?.name}
              id={data?.id}
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
