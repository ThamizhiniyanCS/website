"use client";

import { useEffect } from "react";

import { getMetaJson } from "@/lib/actions";

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const [error, data] = await getMetaJson("labs");

      console.log(error, data);
    };

    getData();
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-4xl items-start gap-4 px-10 pt-20"></div>
  );
}
