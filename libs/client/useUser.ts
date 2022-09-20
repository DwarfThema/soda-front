import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("유저 있는지 관련 url");

  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { isLoading: !data && !error };
}
