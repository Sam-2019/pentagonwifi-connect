import { BackgroundLines } from "@/components/ui/background-lines";

const WishList = () => {
  return (
    <section className="flex items-center justify-center overflow-hidden py-32">
      <BackgroundLines className="flex w-full flex-col items-center justify-center px-4 md:h-full bg-transparent">
        <h2 className="z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
          Join the Waitlist
        </h2>
        <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </BackgroundLines>
    </section>
  );
};

export default WishList;
