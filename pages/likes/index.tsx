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
import { useState } from "react";
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
  const { isLoading } = useUser();

  //---------인피니티 관련-----------
  const getMorePost = async (page: number) => {};
  const [page, setPage] = useState(1);
  //---------인피니티 관련-----------

  const img = "/img/choice/fast2.jpeg";
  return (
    <Layout seoTitle="좋아요" likes>
      <div className="w-full">
        <div className="mt-24">
          <InfiniteScroll
            dataLength={PropArray.length}
            next={() => getMorePost(page)}
            hasMore={true}
            loader={null}
          >
            <div className="mt-3 mx-4 h-[680px]">
              {reviews?.map((review: IReview) => (
                <div
                  key={review?.id}
                  className=" mb-3 pb-2 flex justify-between items-center border-b-2 border-dashed"
                >
                  <div className=" flex justify-center items-center  ">
                    <ProfilePhoto md avatar={review.user.avatar} />
                    <div>
                      <div className="text-base ml-2">
                        <div className="flex">
                          <div className="font-bold">
                            <Link href={`/profile/${review.user.id}`}>
                              <a>{review?.user?.userName}</a>
                            </Link>
                          </div>
                          <div>회원님이 </div>
                        </div>
                        <div className="flex">
                          <div className="font-bold">
                            <Link href={`/store/${review.store.id}`}>
                              <a>{review?.store?.name}</a>
                            </Link>
                          </div>
                          <div> 에 방문했습니다. </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href={`/reviews/${review.id}`}>
                    <a>
                      <div
                        className=" bg-cover bg-center h-[40px] w-[40px] flex self-center  "
                        style={{
                          backgroundImage: `url(${PropArray[review.id]?.img})`,
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

  const reviews = [
    {
      id: 1,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 2,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 3,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 4,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 5,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 6,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 7,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 8,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 9,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 10,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 11,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 12,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 13,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
    {
      id: 14,
      store: store,
      user: profile,
      name: "duko998",
      score: 4,
      likes: 677,
      payload: "최애 부대찌개 집입니다. \n 가끔 부대 먹고싶을 때 까는곳!",
    },
  ];

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
      reviews: reviews,
      profile: profile,
      comments: comments,
    },
  };
}
