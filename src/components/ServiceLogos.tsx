/** biome-ignore-all lint/a11y/useAltText: <explanation> */
import hbo from "@/assets/apps/hbo.svg";
import hulu from "@/assets/apps/hulu.svg";
import kick from "@/assets/apps/kick.svg";
import xbox from "@/assets/apps/xbox.png";
import tiktok from "@/assets/apps/tiktok.svg";
import twitch from "@/assets/apps/twitch.svg";
import disney from "@/assets/apps/disney+.svg";
import youtube from "@/assets/apps/youtube.svg";
import showmax from "@/assets/apps/showmax.svg";
import netflix from "@/assets/apps/netflix.png";
import spotify from "@/assets/apps/spotify.svg";
import apple_tv from "@/assets/apps/apple_tv.png";
import apple_music from "@/assets/apps/apple_music.svg";
import playstation from "@/assets/apps/playstation.png";
import prime_video from "@/assets/apps/prime_video.png";

const SERVICE_DATA = [
  { name: "Netflix", logo: netflix, url: "https://www.netflix.com" },
  { name: "Apple TV", logo: apple_tv, url: "https://tv.apple.com" },
  { name: "Prime Video", logo: prime_video, url: "https://www.primevideo.com" },
  { name: "Disney+", logo: disney, url: "https://www.disneyplus.com" },
  { name: "HBO Max", logo: hbo, url: "https://www.hbo.com" },
  { name: "YouTube", logo: youtube, url: "https://www.youtube.com" },
  { name: "Hulu", logo: hulu, url: "https://www.hulu.com" },
  { name: "Showmax", logo: showmax, url: "https://www.showmax.com" },
  { name: "Playstation", logo: playstation, url: "https://www.playstation.com", },
  { name: "Xbox", logo: xbox, url: "https://www.xbox.com" },
  { name: "Spotify", logo: spotify, url: "https://www.spotify.com" },
  { name: "Apple Music", logo: apple_music, url: "https://www.applemusic.com" },
  { name: "Twitch", logo: twitch, url: "https://www.twitch.tv" },
  { name: "Kick", logo: kick, url: "https://kick.com" },
  { name: "TikTok", logo: tiktok, url: "https://www.tiktok.com" },
];

export default function ServiceLogos() {
  const BASE_CLASSES = "align-baseline text-center py-6 flex justify-center";

  return (
    <section className="">
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="hidden md:block font-semibold text-primary items-center">
            <h1 className="-mb-1 text-3xl text-center">
              No more waiting, no more buffering -{" "}
            </h1>
            <h1 className="-mb-1 text-3xl text-center">
              just pure, uninterrupted streaming. It's time to experience
            </h1>
            <div className="flex justify-center">
              {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                className="fill-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                width="310"
                height="4"
              >
                <path d="M98.865 1.961c-8.893.024-17.475.085-25.716.182-2.812.019-5.023.083-7.622.116l-6.554.067a2910.9 2910.9 0 0 0-25.989.38c-4.04.067-7.709.167-11.292.27l-1.34.038c-2.587.073-4.924.168-7.762.22-2.838.051-6.054.079-9.363.095-1.994.007-2.91-.08-3.106-.225l-.028-.028c-.325-.253.203-.463 1.559-.62l.618-.059c.206-.02.42-.038.665-.054l1.502-.089 3.257-.17 2.677-.132c.902-.043 1.814-.085 2.744-.126l1.408-.06c4.688-.205 10.095-.353 16.167-.444C37.413 1.22 42.753.98 49.12.824l1.614-.037C54.041.707 57.588.647 61.27.6l1.586-.02c4.25-.051 8.53-.1 12.872-.14C80.266.4 84.912.373 89.667.354l2.866-.01c8.639-.034 17.996 0 27.322.03 6.413.006 13.168.046 20.237.12l2.368.027c1.733.014 3.653.05 5.712.105l2.068.064c5.89.191 9.025.377 11.823.64l.924.09c.802.078 1.541.156 2.21.233 1.892.233.29.343-3.235.364l-3.057.02c-.446.003-.89.008-1.33.014a305.77 305.77 0 0 1-4.33-.004c-2.917-.005-5.864-.018-8.783-.019l-4.982.003a447.91 447.91 0 0 1-3.932-.02l-4.644-.023-4.647-.014c-9.167-.026-18.341-.028-26.923.03l-.469-.043Z" />
              </svg>
            </div>
            <h1 className="-mb-1 text-3xl text-center">
              what true smothness feels like.
            </h1>
          </div>

          <div className="md:hidden font-semibold text-primary items-center">
            <h1 className="-mb-1 text-3xl text-center">
              No more waiting, no more buffering - just pure, uninterrupted
              streaming. It's time to experience what true smothness feels like.
            </h1>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 h-auto">
              <a
                className={`border-b-2 md:border-b-2 border-r-2 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.netflix.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={netflix} className="w-50 h-14" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-0 md:border-r-2 ${BASE_CLASSES}`}
                href="https://tv.apple.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={apple_tv} className="w-50 h-14" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-2 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.primevideo.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={prime_video} width={170} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-0 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.disneyplus.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={disney} width={100} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-2 md:border-r-0 ${BASE_CLASSES}`}
                href="https://www.hbo.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={hbo} width={150} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-0 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.youtube.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={youtube} width={150} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-2 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.hulu.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={hulu} width={110} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-0 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.showmax.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={showmax} width={130} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-2 md:border-r-2 ${BASE_CLASSES}`}
                href="https://www.playstation.com/en-us/"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={playstation} width={130} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-2 border-r-0 md:border-r-0 ${BASE_CLASSES}`}
                href="https://www.xbox.com/en-US/"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={xbox} width={130} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-0 md:border-r-2 border-r-2 ${BASE_CLASSES}`}
                href="https://open.spotify.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={spotify} width={70} height="auto" />
              </a>
              <a
                className={`border-b-2 md:border-b-0 md:border-r-2 border-r-0 ${BASE_CLASSES}`}
                href="https://music.apple.com/us/new"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={apple_music} width={50} height="auto" />
              </a>
              <a
                className={`md:border-r-2 border-r-2 ${BASE_CLASSES}`}
                href="https://www.twitch.tv"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={twitch} width={130} height="auto" />
              </a>
              <a
                className={`md:border-r-2 border-r-0 ${BASE_CLASSES}`}
                href="https://www.kick.com"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={kick} width={130} height="auto" />
              </a>
              <a
                className="hidden text-center py-6 md:flex  border-r-2 md:border-r-0 justify-center"
                href="https://www.tiktok.com/explore"
                target="_"
                rel="noopener noreferrer"
              >
                <img src={tiktok} width={130} height="auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
