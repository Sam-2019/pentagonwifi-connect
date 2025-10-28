import { useState } from "react";
import Faq1 from "@/components/FAQ";
import { motion } from "motion/react";
import Pricing from "@/components/Pricing";
import { Services } from "@/components/Services";
import MasonryPage from "@/components/MasonryPage";
import ServiceLogos from "@/components/ServiceLogos";

export function BackgroundRippleEffectDemo() {
  return (
    <div
      className="relative flex w-full flex-col items-start justify-center overflow-hidden mt-10 
     mx-auto backdrop-blur-sm shadow-lg rounded-xl p-6 md:p-8 border border-blue-100 sm"
    >
      <div className="w-full">
        <h2 className="relative z-10 mx-auto max-w-5xl text-center text-3xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
          Internet That Never 🚀Sleeps
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-4xl text-center text-muted-foreground leading-relaxed lg:text-lg">
          Pentagon WiFi was born from a simple realization: students at African
          Union Hall needed better internet—faster, more reliable, and built for
          the demands of modern campus life. We launched with one mission in
          mind: to eliminate digital barriers for students and provide an
          always-on connection that supports learning, creativity, and
          entertainment—day and night.
        </p>
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center relative">
      <div className="space-y-20 mt-20">
        {/* <WishList /> */}
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
        {/* <WobbleCardDemo /> */}

        <BackgroundRippleEffectDemo />

        <Pricing />
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
