import Layout from "@/components/layout";
import { NextRouter, withRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";

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
  const [videoReady, setVideoReady] = useState(false);
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

  const { playing, muted, volume, playbackRate } = state;

  const onChangePlaybackrate = (event: any) => {
    setState({
      ...state,
      playbackRate: 1 * event.target.value,
    });
  };

  const onChangeBitrate = (event: any) => {
    const internalPlayer = videoRef.current?.getInternalPlayer("hls");
    if (internalPlayer) {
      // currentLevel expect to receive an index of the levels array
      internalPlayer.currentLevel = 1 * event.target.value;
      const currentVideo = internalPlayer.levels[internalPlayer.currentLevel];
      //level.width, level.height level.bitrate
      const endOfUrl = currentVideo.url[0].lastIndexOf('/',currentVideo.url[0].lastIndexOf('/')-1);
      const url = currentVideo.url[0].substring(0,endOfUrl);

      const data={
        url:myUrl,
        width:currentVideo.width,
        height:currentVideo.height,
        bitrate:currentVideo.bitrate,
        time:Date()
      }
      console.log(data);

      fetch('http://localhost:3001/playedInfo',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': "no-cache, no-store, must-revalidate"
        },
        body:JSON.stringify(data)
      });


    }
  };

  const myUrl: string = decodeURIComponent(query.url as string);
  return (
    <Layout>
      {hasWindow && query.id && (
        <div className="flex flex-col items-center">
          <div className="p-4 text-xl">Media {+query.id}</div>
          <div className="w-[20rem] lg:w-[50rem]">
            <ReactPlayer
              url={query.url}
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
                console.log(videoRef.current?.getInternalPlayer("hls").levels);
                setVideoReady(true);
              }}
            />
          </div>
          <div className="space-y-2 pt-2 text-center">
            <div>
              PlaybackRate:
              <select onChange={onChangePlaybackrate}>
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate, id) => (
                  <option key={id} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Quality:
              <select onChange={onChangeBitrate}>
                {videoReady &&
                  videoRef.current
                    ?.getInternalPlayer("hls")
                    ?.levels.map((level: any, id: number) => (
                      <option key={id} value={id}>
                        {level.width}x{level.height}
                      </option>
                    ))}
              </select>
            </div>
            <div>check console to look streaming quality data</div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withRouter(Media);
