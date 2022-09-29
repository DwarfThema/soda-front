import Layout from "@components/layout";
import { PropArray } from "@libs/client/sharedProp";
import useUser, { IList, ProfileResponse } from "@libs/client/useUser";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";

const Home: NextPage = () => {
  const user = useUser();

  // --------------------- 추천 인피니티 관련 ---------------------
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const fetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/review/recent?page=0&size=10`, {
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

  // --------------------- 추천 인피니티 관련 ---------------------

  // --------------------- 최근 리뷰 인피니티 관련 ---------------------
  const [recoPage, setRecoPage] = useState(1);
  const [recoData, setRecoData] = useState([]);
  const recoFetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/review/recent?page=0&size=10`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        setRecoData((d) => d.concat(res?.results?.list));
        setRecoPage((p) => p + 1);
      });
  };

  const recoFetchMoreData = (recoPage: number) => {
    return recoFetcher(recoPage);
  };

  useEffect(() => {
    recoFetcher(recoPage);
  }, []);

  // --------------------- 최근 리뷰 인피니티 관련 ---------------------

  // --------------------- 로케이션 관련 ---------------------
  function onGeoOk(positon: any) {
    console.log(positon);
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }

  var windowHeight;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    windowHeight = window.innerHeight;
  }, []);

  // --------------------- 로케이션 관련 ---------------------

  return (
    <Layout seoTitle="홈" home>
      <div>
        <div className="w-full mt-28 ">
          <div className=" mx-2 text-lg ">🧐 Recommand DINING </div>
          <div className=" mx-2 mb-3 flex mt-3 items-end">
            <div className=" text-sm font-bold">
              똑똑한 소다의 오늘의 추천메뉴 🗒
            </div>
            <div
              className="ml-2"
              style={{ fontSize: "10px", lineHeight: "14px" }}
            >
              소다가 오늘의 추천 메뉴를 알려줍니다.
            </div>
          </div>
          <div>
            <InfiniteScroll
              dataLength={data.length}
              next={() => fetchMoreData(page)}
              hasMore={true}
              loader={null}
            >
              <div className="ml-1 flex h-[150px]">
                {PropArray.map((data) => (
                  <div key={data.key}>
                    <Link href={`/store/${data.key}`}>
                      <a>
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
                      </a>
                    </Link>
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
              dataLength={recoData.length}
              next={() => recoFetchMoreData(page)}
              hasMore={true}
              loader={null}
            >
              <div className=" grid grid-cols-3 gap-1 w-full h-[450px]">
                {recoData?.map((data: IList, index: number) => (
                  <div
                    key={index}
                    className={index % 8 == 1 ? "col-span-2" : ""}
                  >
                    <Link href={`/reviews/${data.id}`}>
                      <a>
                        <div
                          className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center"
                          style={{ backgroundImage: `url(${data.imageSrc})` }}
                        ></div>
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

export default Home;

/* export async function getServerSideProps(context: any) {
  console.log(context.req.headers.referer);
  return { props: { url: context.req.headers.referer } };
}
 */
