export interface IStore {
  id: number;
  score: number;
  phone?: string;
  name: string;
}

export interface IReview {
  id: number;
  store: IStore;
  score: number;
  payload?: string;
  likes: number;
  photo: string;
  user: IProfile;
}

export interface IProfile {
  id: number;
  userName: string;
  avatar: string;
}

export interface Icomment {
  id: number;
  payload: string;
  isMe?: boolean;
  user: IProfile;
}
