import Layout from "@components/layout";
import { PropArray } from "@libs/client/sharedProp";
import useCoords from "@libs/client/useCoords";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import { url } from "inspector";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR, { SWRConfig } from "swr";

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
  var windowHeight;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    windowHeight = window.innerHeight;
  }, []);

  const { isLoading } = useUser();
  return (
    <Layout seoTitle="홈" home>
      <div>
        <div className="w-full mt-28 ">
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
              dataLength={PropArray.length}
              next={() => getMorePost(page)}
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
              dataLength={PropArray.length}
              next={() => getMorePost(page)}
              hasMore={true}
              loader={null}
            >
              <div className=" grid grid-cols-3 gap-1 w-full h-[450px]">
                {PropArray.map((data) => (
                  <div
                    key={data.key}
                    className={data?.key % 8 == 1 ? "col-span-2" : ""}
                  >
                    <Link href={`/reviews/${data.key}`}>
                      <a>
                        <div
                          className=" h-[120px] bg-gray-300  rounded-md flex items-end bg-cover bg-center"
                          style={{ backgroundImage: `url(${data.img})` }}
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
