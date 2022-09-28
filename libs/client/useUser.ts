import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data } = useSWR(`https://mtvs.kro.kr:8001/info/`);
  const router = useRouter();

  useEffect(() => {
    if (data?.httpStatus !== 200) {
      router.push("/enter");
    }
  }, [router]);

  return { user: null };
}
