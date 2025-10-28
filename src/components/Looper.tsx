import LogoLoop from "./LogoLoop";
import TestimonialImg02 from "../assets/masonry-02.jpg";


const imageLogos = [
  {
    src: TestimonialImg02,
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: TestimonialImg02,
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: TestimonialImg02,
    alt: "Company 3",
    href: "https://company3.com",
  },
];

const Looper = () => {
  return (
    <LogoLoop
      logos={imageLogos}
      speed={120}
      direction="left"
      logoHeight={48}
      gap={40}
      pauseOnHover
      scaleOnHover
      fadeOut
      fadeOutColor="#ffffff"
      ariaLabel="Technology partners"
    />
  );
};

export default Looper;
