import Layout from "@/components/layout";
import Link from "next/link";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import {set} from "zod";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });



export default function Home() {
  const [VODUrls, setVOD] = useState([]);
  const [LiveUrls, setLive] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('http://localhost:3001/urls?type=VOD');
      const result = res.json();
      return result;
    }
    fetchData().then(res => setVOD(res));

    const fetchData2 = async() => {
      const res = await fetch('http://localhost:3001/urls?type=Live');
      const result = res.json();
      return result;
    }
    fetchData2().then(res => setLive(res));

  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="pb-10 text-3xl">Media</div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5 lg:gap-x-7">
          {VODUrls.map(
            (_, i) => (
              <Link
                key={i}
                href={{ pathname: `/media/${i}`, query: { id: i } }}
                as={`/media/${i + 1}`}
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
            )
          )}
          {LiveUrls.map(
              (_, i) => (
                  <Link
                      key={i}
                      href={{ pathname: `/media/${i}`, query: { id: i } }}
                      as={`/media/${i + 1}`}
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
              )
          )}

        </div>
      </div>
    </Layout>
  );
}
