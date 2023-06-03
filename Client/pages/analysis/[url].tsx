import Layout from "@/components/layout";
import { NextRouter, withRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
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
    return (
        <Layout>
            {hasWindow&&(
                <div className="flex flex-col items-center">
                    <div className="w-[20rem] lg:w-[50rem]">
                        <ReactPlayer
                            className="absoulte"
                            url={decodeURIComponent(query.url as string)}
                            width="100%"
                            height="75%"
                            controls={false}
                            config={{
                                file: {
                                    forceHLS: true,
                                    hlsOptions: {
                                        startPosition: 3.7,
                                    },
                                },
                            }}
                        />
                    </div>
                    <div>
                        여기 그래프
                    </div>
                    <Link
                        href={{ pathname: `../lists`}}
                    >
                        뒤로가기
                    </Link>
                </div>
            )}


        </Layout>
    );
}

export default withRouter(Media);
