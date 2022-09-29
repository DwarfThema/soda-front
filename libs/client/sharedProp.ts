export interface IUser {
  id: number;
  userName: string;
  password?: string;
  email: string;
  idDeleted?: string;
  profileImg?: string;
  joinDate?: Date;
  deletedDate?: Date;
  [key: string]: any;
}

export interface IUserDetailInfo {
  follower: number;
  following: number;
  reviewList: [];
  user: IUser;
  [key: string]: any;
}

export interface MutationResult {
  httpStatus: number;
  message: string;
  results: IUserDetailInfo;
  [key: string]: any;
}

export interface IStore {
  id: number;
  score: number;
  phone?: string;
  name: string;
}

export interface IReview {
  [key: string]: any;
}

export interface IProfile {
  id: number;
  userName: string;
  profileImg?: string;
  following: number;
  follower: number;
  introduce?: string;
  review?: IReview;
}

export interface Icomment {
  id: number;
  content: string;
  isMe?: boolean;
  user: IProfile;
}

export const PropArray = [
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
