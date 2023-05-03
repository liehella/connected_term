import Layout from "@/components/layout";
import React from "react";
import ReactPlayer from "react-player";

const LIVEURL =
  "https://cdn-vos-ppp-01.vos360.video/Content/HLS_HLSCLEAR/Live/channel(PPP-LL-2HLS)/index.m3u8";

export default function test() {
  return (
    <Layout>
      <div className="p-4 text-xl">Live</div>
      <ReactPlayer url={LIVEURL} width="800px" height="500px" controls={true} />
    </Layout>
  );
}
