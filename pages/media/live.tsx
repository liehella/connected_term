import Layout from "@/components/layout";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const LIVEURL =
  "https://cdn-vos-ppp-01.vos360.video/Content/HLS_HLSCLEAR/Live/channel(PPP-LL-2HLS)/index.m3u8";

export default function Live() {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const videoRef = useRef<ReactPlayer>(null);
  const [state, setState] = useState({
    playing: false,
    muted: false,
    controls: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    duration: 0,
  });

  const { playing, muted, volume, playbackRate, played } = state;

  const pbFaster = () => {
    setState({
      ...state,
      playbackRate: 2,
    });
  };
  const pbNormal = () => {
    setState({
      ...state,
      playbackRate: 1,
    });
  };
  const pbSlower = () => {
    setState({
      ...state,
      playbackRate: 0.5,
    });
  };

  return (
    <Layout>
      {hasWindow && (
        <div className="flex flex-col items-center">
          <div className="p-4 text-xl">Live</div>
          <div className="w-[40rem] lg:w-[80rem]">
            <ReactPlayer
              url={LIVEURL}
              ref={videoRef}
              width="100%"
              height="100%"
              controls={true}
              playing={playing}
              muted={muted}
              volume={volume}
              playbackRate={playbackRate}
              config={{
                file: {
                  forceHLS: true,
                  hlsOptions: {},
                },
              }}
              onReady={() => {
                videoRef.current &&
                  console.log(videoRef.current.getInternalPlayer("hls"));
                //level controller 안에 _levels 조절로 해상도 조절
              }}
            />
          </div>

          <div className="space-x-4 pt-5 text-xl">
            <button onClick={pbSlower}>0.5배속</button>
            <button onClick={pbNormal}>1배속</button>
            <button onClick={pbFaster}>2배속</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
