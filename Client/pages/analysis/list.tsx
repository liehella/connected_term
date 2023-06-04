import Layout from "@/components/layout";
import { NextRouter, withRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";
import Link from "next/link";

export default function List(){
    const [VODUrls, setVOD] = useState([]);
    const [LiveUrls, setLive] = useState([]);
    const [countList, setCountList] = useState([] as number[]);

    const FetchUrls = () => {
        const entries = performance.getEntriesByType("navigation")[0];
        const entriesNavigationTiming = entries as PerformanceNavigationTiming
        console.log(entriesNavigationTiming.type);
        if(entriesNavigationTiming.type != "reload"){
            window.location.reload();
        }
        const fetchData = async () => {
            const res = await fetch('http://localhost:3001/urls?type=VOD', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': "no-cache, no-store, must-revalidate"
                }
            });
            const result = res.json();
            return result;
        }
        fetchData().then(res => setVOD(res.urls));

        const fetchData2 = async () => {
            const res = await fetch('http://localhost:3001/urls?type=LIVE', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': "no-cache, no-store, must-revalidate"
                }
            });
            const result = res.json();
            return result;
        }
        fetchData2().then(res => setLive(res.urls));
    }
    useEffect(()=>{
        FetchUrls()
    }, []);

    const FetchCount = async() => {
        const list = [] as number[];
        await Promise.all(
            VODUrls.map(async (_, i) => {
                const res = await fetch(`http://localhost:3001/analysis/count?url=${encodeURIComponent(VODUrls[i])}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': "no-cache, no-store, must-revalidate"
                    }
                });
                const result = await (res.json());
                console.log("result",result.count);
                list.push(result.count);
            })
        )
        await Promise.all(
            LiveUrls.map(async (_, i) => {
                const res = await fetch(`http://localhost:3001/analysis/count?url=${encodeURIComponent(LiveUrls[i])}`, {
                    method: "GET",
                });
                const result = await (res.json());
                list.push(result.count);
            })
        )
        setCountList(list);
    }
    useEffect(()=>{
        FetchCount();
    },[VODUrls, LiveUrls]);






    return(
        <Layout>
                <div className="w-full">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">영상</th>
                                <th className="py-2 px-4 border-b">조회수</th>
                                <th className="py-2 px-4 border-b">TYPE</th>
                            </tr>
                        </thead>
                        <tbody>
                        {VODUrls.map(
                            (_, i) => {
                                const encodedUrl = encodeURIComponent(VODUrls[i]);
                                return (
                                    <tr>
                                        <td className = "py-2 px-4 border-b text-center flex justify-center">
                                            <Link
                                                key={i+20}
                                                href={{ pathname: `/analysis/${encodedUrl}`, query: { id: i, url:encodedUrl}}}
                                                as={`/analysis/${encodedUrl}`}

                                            >
                                                <div className="h-25 aspect-square bg-black text-center text-white lg:aspect-[2/3] lg:h-60">
                                                    {i + 1}
                                                    <ReactPlayer
                                                        className="absoulte"
                                                        url={VODUrls[i]}
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
                                            </Link>
                                        </td>
                                        <td className = "py-2 px-4 border-b text-center">
                                            {countList[i]}
                                        </td>
                                        <td className = "py-2 px-4 border-b text-center">
                                            VOD
                                        </td>
                                    </tr>

                                )}
                        )}
                        {LiveUrls.map(
                            (_, i) => {
                                const liveIdx:number = i +VODUrls.length;
                                const encodedUrl = encodeURIComponent(VODUrls[i]);
                                return(
                                    <tr>
                                        <td className = "py-2 px-4 border-b text-center flex justify-center">
                                            <Link
                                                key={liveIdx+20}
                                                href={{ pathname: `/analysis/${encodedUrl}`, query: { id: liveIdx, url:encodedUrl } }}
                                                as={`/media/${encodedUrl}`}
                                            >
                                                <div className="h-25 aspect-square bg-black text-center text-white lg:aspect-[2/3] lg:h-60">
                                                    {liveIdx + 1}
                                                    <ReactPlayer
                                                        className="absoulte"
                                                        url={LiveUrls[i]}
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
                                            </Link>
                                        </td>
                                        <td className = "py-2 px-4 border-b text-center">
                                            {countList[i+VODUrls.length]}
                                        </td>
                                        <td className = "py-2 px-4 border-b text-center">
                                            LIVE
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>
        </Layout>
    )
}
