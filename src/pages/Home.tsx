import Faq1 from "@/components/FAQ";
import MasonryPage from "@/components/MasonryPage";
import ModalVideo from "@/components/ModalVideo";
import Pricing from "@/components/Pricing";
import RotateText from "@/components/RotateText";
import RotatingText from "@/components/RotatingText";
import { Services } from "@/components/Services";

import Image from "next/image";
import VideoThumb from "../assets/modal-video-thumb.jpg";
import video from "../assets/video.mp4";
import ServiceLogos from "@/components/ServiceLogos";
import Looper from "@/components/Looper";
import WishList from "@/components/WishList";
import { motion } from "motion/react";
import { useState } from "react";
import noise from "../assets/noise.webp";

import { WobbleCard } from "../components/ui/wobble-card";

const Index = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center relative">
      {/* <div className="flex flex-row items-center space-x-3">
        <p>Hello</p>
        <RotatingText
          texts={["React", "Bits", "Is🚀", "Cool!😙"]}
          mainClassName="px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 justify-center rounded-lg text-9xl subpixel-antialiased font-bold"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div> */}

      <div className="space-y-20 mt-10">
        <RotateText />
        <WishList />
        {/* <ModalVideo
          thumb={VideoThumb}
          thumbWidth={768}
          thumbHeight={432}
          thumbAlt="Modal video thumbnail"
          video={video}
          videoWidth={1920}
          videoHeight={1080}
          /> */}
        {/* <Looper /> */}
        <Pricing />
        <WobbleCardDemo />
        <ServiceLogos />
        <Services />
        <MasonryPage />
        <Faq1 />
      </div>
    </main>
  );
};

export default Index;

const navigation = [{ name: "Home" }, { name: "About" }, { name: "Services" }];

export const SquigglyUnderline = () => {
  const [selectedLink, setSelectedLink] = useState("Home");

  return (
    <div className="flex gap-16">
      {navigation.map((item) => {
        const isSelected = item.name === selectedLink;
        return (
          // biome-ignore lint/a11y/useValidAnchor: <explanation>
          <a
            key={item.name}
            href="#"
            className={`relative text-sm leading-6 no-underline ${
              isSelected ? "font-semibold text-white" : "text-gray-500"
            }`}
            onClick={() => setSelectedLink(item.name)}
          >
            {item.name}
            {isSelected ? (
              <motion.div className="absolute -bottom-[1px] left-0 right-0 h-[1px]">
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                  <motion.path
                    d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                    stroke="#7043EC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      strokeDasharray: 84.20591735839844,
                      strokeDashoffset: 84.20591735839844,
                    }}
                    animate={{
                      strokeDashoffset: 0,
                    }}
                    transition={{
                      duration: 1,
                    }}
                  />
                </svg>
              </motion.div>
            ) : null}
          </a>
        );
      })}
    </div>
  );
};

function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full border-2 border-red-500">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Gippity AI powers the entire universe
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
        {/* <img
          src={noise}
          width={500}
          height={500}
          alt="lineardemomage"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        /> */}
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI
            wrapper today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
       
      </WobbleCard>
    </div>
  );
}
