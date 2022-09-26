import React, { useEffect, useState } from "react";
import Head from "next/head";
import { isMobile } from "react-device-detect";

import NavBar from "./navBar";

interface LayoutProps {
  title?: string;
  seoTitle: string;
  children: React.ReactNode;
  enter?: boolean;
  choice?: boolean;
  home?: boolean;
  likes?: boolean;
  create?: boolean;
  profile?: boolean;
}

export default function Layout({
  seoTitle,
  choice,
  children,
  enter,
  home,
  likes,
  create,
  profile,
}: LayoutProps) {
  const [getMobile, setmobile] = useState(false);

  useEffect(() => {
    setmobile(isMobile);
  }, []);

  return (
    <div>
      <Head>
        <title>{seoTitle} | 소다</title>
      </Head>
      <div className="w-screen h-screen justify-center items-center text-lg font-medium text-gray-800 border-b top-0 flex ">
        {!enter ? (
          <div className=" flex justify-center items-center">
            {!getMobile ? (
              <div className=" bg-[#febb10] w-screen h-screen flex items-center justify-center">
                <div className=" bg-white w-[400px] h-[850px] rounded-md drop-shadow-lg ">
                  {choice ? null : (
                    <NavBar
                      home={home}
                      likes={likes}
                      create={create}
                      profile={profile}
                    />
                  )}
                  {children}
                </div>
              </div>
            ) : (
              <>
                {choice ? null : (
                  <NavBar
                    home={home}
                    likes={likes}
                    create={create}
                    profile={profile}
                  />
                )}
                <div>{children}</div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-[#FEBC10] w-full h-full flex justify-center items-center flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
