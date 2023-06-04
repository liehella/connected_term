import Layout from "@/components/layout";
import { NextRouter, withRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import React,{ PureComponent } from "react";
import ReactPlayer from "react-player";
import Link from "next/link";
import { BarChart, Bar,
    Cell, XAxis,
    YAxis, CartesianGrid,
    Tooltip, Legend,
    ResponsiveContainer } from 'recharts';

interface Query {
    router: NextRouter;
}

function Media({ router: { query } }: Query) {
    const [hasWindow, setHasWindow] = useState(false);
    const [graphData, setGraph] = useState({bitData:[]as object[],resData:[]as object[]});


    const bitrateData = [] as object[];
    const resolutionData = [] as object[]
    let type = "";
    const FetchData = async ()=>{
        const res = await fetch(`http://localhost:3001/analysis/resolution?url=${query.url}`,{
            method:"GET",
            headers:{
                'Cache-Control': "no-cache, no-store, must-revalidate"
            }
        });
        const result = await res.json();
        return result;
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);



    useEffect(()=>{
        FetchData().then((result)=>{
            type = result.type;
            for(let key in result.resolution){
                resolutionData.push({
                    name:key,
                    Resolution:result.resolution[key]
                });
            }
            for(let key in result.bitrate){
                bitrateData.push({
                    name:key,
                    Bitrate:result.bitrate[key]
                });
            }

            setGraph({bitData:bitrateData , resData: resolutionData});
        });
    },[hasWindow]);
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
                        <BarChart width={500} height={300} data={graphData.bitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Bitrate" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div>
                        <BarChart width={500} height={300} data={graphData.resData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Resolution" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            )}


        </Layout>
    );
}

export default withRouter(Media);
