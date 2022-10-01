import { AnyNsRecord } from "dns";

export interface IprofileImg {
  savedPath?: string;
  [key: string]: any;
}

export interface IUser {
  id: number;
  userName: string;
  password?: string;
  email: string;
  idDeleted?: string;
  profileImg?: IprofileImg;
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
  results: any | IUserDetailInfo | IUser;
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
  profileImg?: any;
  following: number;
  follower: number;
  introduce?: string;
  review?: IReview;
  [key: string]: any;
}

export interface Icomment {
  id: number;
  content: string;
  isMe?: boolean;
  user: IProfile;
  [key: string]: any;
}
