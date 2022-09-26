import Layout from "@components/layout";
import useCoords from "@libs/client/useCoords";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import { url } from "inspector";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR, { SWRConfig } from "swr";

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

const Home: NextPage = (/* { url }: any */) => {
  /*   const prevUrl = url;
  const router = useRouter();
  if (prevUrl === "http://localhost:3000/signup/choice") {
    null;
  } else {
    useEffect(() => {
      router.push("/enter");
    }, []);
  } */

  function onGeoOk(positon: any) {
    console.log(positon);
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }

  const getMorePost = async (page: number) => {};
  const [page, setPage] = useState(1);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  const { isLoading } = useUser();
  return (
    <Layout seoTitle="홈" home>
      <div className="w-full mt-11 ">
        <div className=" mx-2 text-lg ">🧐 Recommand DINING </div>
        <div className=" mx-2 mb-3 flex mt-3 items-end">
          <div className=" text-sm font-bold">얼큰한게 땡기는 날! 🍜</div>
          <div
            className="ml-2"
            style={{ fontSize: "10px", lineHeight: "14px" }}
          >
            오늘 얼큰한게 땡기시는군요!
          </div>
        </div>
        <div>
          <InfiniteScroll
            dataLength={propArray.length}
            next={() => getMorePost(page)}
            hasMore={true}
            loader={null}
          >
            <div className="ml-1 flex h-[150px]">
              {propArray.map((data) => (
                <div key={data.key}>
                  <div
                    className="w-[93px] h-full bg-gray-300 mr-1 rounded-mg flex items-end bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${data.img})`,
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    <span className="bottom-0 mb-2 ml-1 text-sm font-bold text-white ">
                      {data.cat1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <div className="mt-4">
        <div className="ml-4 font-bold text-sm">소다 Review ✍️</div>
        <div className="mt-1 mx-2 h-[10px]">
          <InfiniteScroll
            dataLength={propArray.length}
            next={() => getMorePost(page)}
            hasMore={true}
            loader={null}
          >
            <div className=" grid grid-cols-3 gap-1 w-full h-[500px]">
              {propArray.map((data) => (
                <div
                  key={data.key}
                  className={data?.key % 8 == 1 ? "col-span-2" : ""}
                >
                  <div
                    className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center"
                    style={{ backgroundImage: `url(${data.img})` }}
                  ></div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

/* export async function getServerSideProps(context: any) {
  console.log(context.req.headers.referer);
  return { props: { url: context.req.headers.referer } };
}
 */
