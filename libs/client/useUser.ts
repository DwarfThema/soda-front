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

interface IResults {
  user: IUser;
}

interface ProfileResponse {
  httpStatus: number;
  message: string;
  results: IResults;
}

export default function useUser() {
  const { data } = useSWR<ProfileResponse>(`https://mtvs.kro.kr:8001/info/`);
  const router = useRouter();

  useEffect(() => {
    if (data?.httpStatus !== 200) {
      router.push("/enter");
    }
  }, [router]);

  return { user: data?.results?.user };
}
