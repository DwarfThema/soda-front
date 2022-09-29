import Layout from "@components/layout";
import ProfilePhoto from "@components/profilePhoto";
import {
  Icomment,
  IProfile,
  IReview,
  IStore,
  IUser,
  PropArray,
} from "@libs/client/sharedProp";
import useUser from "@libs/client/useUser";
import { cls } from "@libs/client/utils";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Followings: NextPage<{}> = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  //-------------- isMe 증명 관련---------------
  const [getUserId, setUserId] = useState<number>();

  const { user } = useUser();
  const { query } = useRouter();

  const [getIsMe, setIsMe] = useState(false);
  const [getIsFollow, setIsFollow] = useState(false);

  const params = query?.id as any;
  useEffect(() => {
    setUserId(params);

    if (user?.userName === params) {
      setIsMe(true);
    }
  }, []);
  //-------------- isMe 증명 관련---------------

  // --------------------- 팔로워 인피니티 관련 ---------------------
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const fetcher = (pageNumber: number = 1) => {
    fetch(`https://mtvs.kro.kr:8001/follow/follower/${params}`, {
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

  // --------------------- 팔로워 인피니티 관련 ---------------------

  return (
    <Layout seoTitle="팔로워" profile>
      <div className="w-full mt-5">
        <div className="bg-white w-full h-24 max-w-xl justify-center text-lg px-3 pb-3 font-medium rounded-t-3xl text-gray-800 text-opacity-50 border-b top-0  flex items-end">
          <button onClick={onClick} className="flex w-full ">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          <InfiniteScroll
            dataLength={PropArray.length}
            next={() => fetchMoreData(page)}
            hasMore={true}
            loader={null}
          >
            <div className="mt-3 mx-4 h-[680px]">
              {data?.map((user: IUser) => (
                <div
                  key={user?.id}
                  className=" mb-3 pb-1 flex justify-between items-center border-b-2 border-dashed"
                >
                  <div className=" flex justify-center items-center  ">
                    <ProfilePhoto md avatar={user?.avatar} />
                    <div>
                      <div className="text-base ml-2">
                        <div className="flex">
                          <div className="font-bold">
                            <Link href={`/profile/${user.id}`}>
                              <a>{user?.userName}</a>
                            </Link>
                          </div>
                          <div>님을 </div>
                        </div>
                        <div className="flex">
                          <div>회원님이 팔로우 하고 있습니다. </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Followings;
