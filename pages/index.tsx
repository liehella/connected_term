import Layout from "@/components/layout";
import Link from "next/link";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

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

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="pb-10 text-3xl">Media</div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-5 lg:gap-x-7">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (_, i) => (
              <Link
                key={i}
                href={{ pathname: `/media/${i}`, query: { id: i } }}
                as={`/media/${i + 1}`}
              >
                <div className="aspect-[2/3] h-40 bg-black text-center text-white lg:h-60">
                  {i + 1}
                  <ReactPlayer
                    className="absoulte"
                    url={urls[i]}
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
          <Link href={`/media/live`}>
            <div className="aspect-[2/3] h-40 bg-black text-center text-white lg:h-60">
              LIVE
              <ReactPlayer
                className=""
                url="https://cdn-vos-ppp-01.vos360.video/Content/HLS_HLSCLEAR/Live/channel(PPP-LL-2HLS)/index.m3u8"
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
        </div>
      </div>
    </Layout>
  );
}
