import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface IUser {
  id: number;
  userName: string;
  password?: string;
  email: string;
  idDeleted: string;
  profileImg: string;
  joinDate: Date;
  deletedDate: Date;
}

export interface IList {
  categoryName: string;
  content: string;
  password?: string;
  email: string;
  idDeleted: string;
  profileImg: string;
  createDate: Date;
  [key: string]: any;
}

interface IResults {
  user: IUser;
  list: IList;
}

export interface ProfileResponse {
  httpStatus: number;
  message: string;
  results: IResults;
}

export default function useUser() {
  const { data } = useSWR<ProfileResponse>(`https://mtvs.kro.kr:8001/info/`);
  const router = useRouter();

  useEffect(() => {
    if (
      data?.httpStatus !== 200 &&
      localStorage.getItem("Authorization") === null
    ) {
      router.push("/enter");
    }
    if (data?.results?.user != undefined) {
      localStorage.setItem("userName", `${data?.results?.user.userName}`);
    }
  }, [router]);
  return { user: data?.results?.user };
}
