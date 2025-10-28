import Faq1 from "@/components/FAQ";
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
