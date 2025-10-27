import LogoLoop from "./LogoLoop";
// import TestimonialImg01 from "../assets/masonry-01.jpg
import TestimonialImg02 from "../assets/masonry-02.jpg";
import TestimonialImg03 from "../assets/masonry-03.jpg";
import TestimonialImg04 from "../assets/masonry-04.jpg";
import TestimonialImg05 from "../assets/masonry-05.jpg";
import TestimonialImg06 from "../assets/masonry-06.jpg";
import TestimonialImg07 from "../assets/masonry-07.jpg";
import TestimonialImg08 from "../assets/masonry-08.jpg";
import TestimonialImg09 from "../assets/masonry-09.jpg";


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
