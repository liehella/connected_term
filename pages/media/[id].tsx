import Layout from "@/components/layout";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
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

function movie({ router: { query } }) {
  const [num, setNum] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNum(+query.id - 1);
    setLoading(false);
  }, [query]);

  return (
    <Layout>
      {loading ? (
        "loading..."
      ) : (
        <div className="flex flex-col items-center">
          <div className="p-4 text-xl">Media {num + 1}</div>
          <ReactPlayer
            url={urls[num]}
            width="800px"
            height="500px"
            controls={true}
          />
          <div></div>
        </div>
      )}
    </Layout>
  );
}

export default withRouter(movie);
