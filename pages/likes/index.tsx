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
import Link from "next/link";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Likes: NextPage<{
  store: IStore;
  reviews: [IReview];
  profile: IProfile;
  comments: [Icomment];
}> = ({ store, reviews, comments, profile }) => {
  /*   const router = useRouter();
  useEffect(() => {
    router.push("/enter");
  }, []); */
  //---------인피니티 관련-----------
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState();
  const [userDataList, setUserDataList] = useState([]);
  const fetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/follow/following`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        const followingUser = res.results["following list"];
        setDatas(followingUser[0]?.userName);
      });
  };
  const fetcher2 = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/review/following?page=0&size=5`, {
      headers: {
        Authorization: localStorage.getItem("Authorization") || "",
      },
    })
      .then((res) => res.json())
      .then((res: any) => {
        setUserDataList(res?.results?.list);
      });
  };

  const fetchMoreData = (page: number) => {
    return fetcher(page);
  };

  useEffect(() => {
    fetcher2(2);
    fetcher(page);
  }, []);
  //---------인피니티 관련-----------

  const img = "/img/choice/fast2.jpeg";
  return (
    <Layout seoTitle="좋아요" likes>
      <div className="w-full">
        <div className="mt-24">
          <InfiniteScroll
            dataLength={PropArray.length}
            next={() => fetchMoreData(page)}
            hasMore={true}
            loader={null}
          >
            <div className="mt-3 mx-4 h-[680px]">
              {userDataList?.map((review: IReview) => (
                <div
                  key={review?.id}
                  className=" mb-3 pb-2 flex justify-between items-center border-b-2 border-dashed"
                >
                  <div className=" flex justify-center items-center  ">
                    <Link href={`/profile/${review?.user?.userName}`}>
                      <a>
                        <ProfilePhoto
                          xlg
                          avatar={review?.user?.profileImg?.savedPath}
                        />
                      </a>
                    </Link>
                    <div>
                      <div className="text-base ml-2">
                        <div className="flex ">
                          <div className="font-bold ">
                            <Link href={`/profile/${review?.user?.userName}`}>
                              <a>{review?.user?.userName}</a>
                            </Link>
                          </div>
                          <div>님이 </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="font-bold text-base ">
                            <Link
                              href={{
                                pathname: `/store/store2/1`,
                                query: { data: [review?.restaurant?.id] },
                              }}
                            >
                              <a>{review?.restaurant?.name}</a>
                            </Link>
                          </div>

                          <div className="text-sm">에 방문했습니다. </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href={`/reviews/${review?.id}`}>
                    <a>
                      <div
                        className=" bg-cover bg-center h-[80px] w-[80px] flex self-center rounded-md  "
                        style={{
                          backgroundImage: `url(${review?.imageSrc})`,
                        }}
                      />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Likes;
