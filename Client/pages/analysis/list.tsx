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
            <div className="flex flex-col items-center">
                <div className="pb-10 text-3xl">Media</div>
                <div className="grid grid-cols-4 gap-x-4 gap-y-5 lg:gap-x-7">
                    <table>
                        <tbody>
                        {VODUrls.map(
                            (_, i) => {
                                const encodedUrl = encodeURIComponent(VODUrls[i]);
                                return (
                                    <tr>
                                        <td>
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
                                        <td>
                                            {countList[i]}
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
                                        <td>
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
                                        <td>
                                            {countList[i+VODUrls.length]}
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                    <Link
                        href={{ pathname: `../` }}
                        replace
                    >
                        뒤로가기
                    </Link>

                </div>
            </div>
        </Layout>
    )
}
