import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import React from "react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url, {
              headers: {
                Authorization: localStorage.getItem("Authorization") || "",
              },
            }).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
