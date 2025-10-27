"use client";
// biome-ignore assist/source/organizeImports: <explanation>
import Testimonial from "./Testimonial";
import TestimonialImg01 from "../assets/masonry-01.jpg";
import TestimonialImg02 from "../assets/masonry-02.jpg";
import TestimonialImg03 from "../assets/masonry-03.jpg";
import TestimonialImg04 from "../assets/masonry-04.jpg";
import TestimonialImg05 from "../assets/masonry-05.jpg";
import TestimonialImg06 from "../assets/masonry-06.jpg";
import TestimonialImg07 from "../assets/masonry-07.jpg";
import TestimonialImg08 from "../assets/masonry-08.jpg";
import TestimonialImg09 from "../assets/masonry-09.jpg";
import useMasonry from "../hooks/useMasonry";

const testimonials = [
  {
    img: TestimonialImg01,
    name: "Peter Lowe",
    username: "@peterlowex",
    date: "May 19, 2027",
    content:
      "As a founder, having a visually appealing and user-friendly website is essential. This tool not only helped me achieve that but also improved my site's performance and SEO. But the most important thing is that it is easy to use and understand.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg02,
    name: "Rodri Alba",
    username: "@rodri_spn",
    date: "Apr 12, 2027",
    content:
      "Simple has revolutionized the way I manage my work. Its intuitive interface and seamless functionality make staying organized effortless. I can't imagine my life without it.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg03,
    name: "Michele Lex",
    username: "@MikyBrown",
    date: "Mar 04, 2027",
    content:
      "I've tried several website builders before, but none were as user-friendly and versatile as this one. From design to functionality, it exceeded my expectations! It is easy to use and understand.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg04,
    name: "Michael Ross",
    username: "@michjack",
    date: "Jan 15, 2027",
    content:
      "Simple lives up to its name in every way. It's incredibly easy to use yet powerful.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg05,
    name: "Mike Bryan",
    username: "@mike0point7",
    date: "Dec 02, 2026",
    content:
      "I've been using Simple for over a year now, and it has transformed the way I work. It's intuitive, efficient.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg06,
    name: "Sarah Rodriguez",
    username: "@sararodriguez",
    date: "Nov 11, 2026",
    content:
      "Simple has made a significant impact on my business. It has helped me streamline my workflow, improve my productivity, and grow my brand. I highly recommend it to anyone looking to do the same. ",
    channel: "Twitter",
  },
  {
    img: TestimonialImg07,
    name: "Duncan Mitch",
    username: "@lovingme_",
    date: "Oct 23, 2026",
    content:
      "I've been using Simple for a few months now, and I can't imagine my life without it. It has simplified my work process, increased my efficiency, and helped me achieve my goals faster.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg08,
    name: "Kavisha Mills",
    username: "@kavigirl99",
    date: "Sep 30, 2026",
    content:
      "Simple has been a game-changer for me. It has helped me stay organized, manage my tasks more efficiently, and improve my overall productivity. I can't recommend it enough! It has all the features I need to stay productive.",
    channel: "Twitter",
  },
  {
    img: TestimonialImg09,
    name: "Dante Luzzi",
    username: "@dante1987",
    date: "Aug 17, 2026",
    content:
      "I've been using Simple for a while now, and it has transformed the way I work. It's intuitive, efficient.",
    channel: "Twitter",
  },
];

export default function MasonryPage() {
  const masonryContainer = useMasonry();

  return (
    <section className="">
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-12">
          <div
            ref={masonryContainer}
            className="grid items-start gap-4 sm:grid-cols-3 md:gap-6 border-200 border-red-500"
          >
            {testimonials.map((testimonial, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Testimonial key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
