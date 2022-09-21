import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { cls } from "@libs/client/utils";

interface LayoutProps {
  title?: string;
  seoTitle: string;
  children: React.ReactNode;
}

export default function Layout({ title, seoTitle, children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{seoTitle} | 소다</title>
      </Head>
      <div className=" w-full h-full justify-center items-center text-lg font-medium  fixed text-gray-800 border-b top-0  flex ">
        {children}
      </div>
    </div>
  );
}
