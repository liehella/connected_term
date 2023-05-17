import Layout from "@/components/layout";
import { NextRouter, withRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";

const urls = [
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  "https://cdn.jwplayer.com/manifests/pZxWPRg4.m3u8",
  "https://test-streams.mux.dev/test_001/stream.m3u8",
  "https://test-streams.mux.dev/dai-discontinuity-deltatre/manifest.m3u8",
  "https://playertest.longtailvideo.com/adaptive/issue666/playlists/cisq0gim60007xzvi505emlxx.m3u8",
  "https://playertest.longtailvideo.com/adaptive/captions/playlist.m3u8",
  "https://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8",
  "https://playertest.longtailvideo.com/adaptive/vod-with-mp3/manifest.m3u8",
  "https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8",
  "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
  "https://cdn.theoplayer.com/video/elephants-dream/playlist.m3u8",
  "https://test-streams.mux.dev/pts_shift/master.m3u8",
  "https://playertest.longtailvideo.com/adaptive/artbeats/manifest.m3u8",
  "https://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8",
];

interface Query {
  router: NextRouter;
}

function Media({ router: { query } }: Query) {
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
      {hasWindow && query.id && (
        <div className="flex flex-col items-center">
          <div className="p-4 text-xl">Media {+query.id}</div>
          <div className="w-[20rem] lg:w-[50rem]">
            <ReactPlayer
              url={urls[+query.id - 1]}
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

export default withRouter(Media);
