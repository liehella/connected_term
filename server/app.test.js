const request = require('supertest');
const app = require('./app');

describe('TEST GET /urls VOD', () => {
    it("should return urls of requested type", async () => {
        const response = await request(app).get("/urls?type=VOD");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                "urls": [
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
                    "https://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_stereo_subs.m3u8"
                ]
            }
        );
    });
});

describe('TEST GET /urls Live', () => {
    it("should return urls of requested type", async () => {
        const response = await request(app).get("/urls?type=LIVE");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            {
                "urls": [
                    "https://cdn-vos-ppp-01.vos360.video/Content/HLS_HLSCLEAR/Live/channel(PPP-LL-2HLS)/index.m3u8"
                ]
            }
        );
    });
});

describe('Test GET /analysis/count',()=>{
    it("should return count of url", async ()=>{
        const res = await request(app).get("/analysis/count?url=https%3A%2F%2Fcdn.jwplayer.com%2Fmanifests%2FpZxWPRg4.m3u8");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            "count": 4
        });
    })
})

describe('Test GET /analysis/resolution',()=>{
    it("should return count of url", async ()=>{
        const res = await request(app).get("/analysis/resolution?url=https%3A%2F%2Fcdn.jwplayer.com%2Fmanifests%2FpZxWPRg4.m3u8");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            "type": "VOD",
            "resolution": {
                "640x360": 2,
                "1920x1080": 1,
                "1280x720": 1
            },
            "bitrate": {
                "960000": 2,
                "2580000": 1,
                "5220000": 1
            }
        });
    })
})