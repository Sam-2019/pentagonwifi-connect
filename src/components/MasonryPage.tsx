"use client";
// biome-ignore assist/source/organizeImports: <explanation>
import Testimonial from "./Testimonial";
import useMasonry from "../hooks/useMasonry";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";

export function HoverBorderGradientDemo() {
  return (
    <div className="m-5 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>Feedback</span>
      </HoverBorderGradient>
    </div>
  );
}

const testimonials = [
  {
    name: "Abena O.",
    level: 300,
    block: "C",
    review:
      "Before switching to Pentagon WiFi, I used to rely on mobile data which would run out at the worst times. Now, I attend Zoom classes, submit assignments, and stream Netflix without any interruptions. Truly the internet that never sleeps!",
    id: 1,
  },
  {
    name: "Daniel K.",
    level: 200,
    block: "Nairobi",
    review:
      "I’m a late-night gamer, and lag used to ruin my sessions. Since I subscribed to Pentagon WiFi’s weekly plan, I’ve had smooth gameplay and no rage-quits. The speed and stability are just next level!",
    id: 2,
  },
  {
    name: "Nana Yaa A.",
    level: 400,
    block: "A",
    review:
      "I love that I can pay weekly or monthly depending on my budget. Even better, I don’t have to worry about data caps or surprise charges. The rollover feature is a bonus!",
    id: 3,
  },
  {
    name: "Kobby T.",
    level: 200,
    block: "Kampala",
    review:
      "Our group project was due at midnight and my roommates were all using the net at the same time. Pentagon WiFi still held up – no buffering, no crashes. We uploaded everything on time. Thank you!",
    id: 4,
  },
  {
    name: "Mavis B.",
    level: 100,
    block: "Dar es Salaam",
    review:
      "I once had a minor connection glitch at 11 PM, and to my surprise, tech support responded in under 10 minutes. Problem solved while I was still in my pajamas.",
    id: 5,
  },
  {
    name: "Linda M.",
    level: 300,
    block: "B",
    review:
      "I’m a huge K-drama fan, and nothing’s worse than constant buffering during a cliffhanger. Since getting Pentagon WiFi, I can stream all night without a hitch. It’s like having VIP internet!",
    id: 6,
  },
  {
    name: "Francis D.",
    level: 100,
    block: "A",
    review:
      "I used to dread online classes because my video would freeze and my audio would cut out. Pentagon WiFi fixed that completely. Now I’m the first to join – and stay – in class!",
    id: 7,
  },
  {
    name: "Amina J.",
    level: 200,
    block: "Dar es Salaam",
    review:
      "I was hesitant at first, but honestly, Pentagon WiFi has made school life so much easier. I download lecture slides fast, join live streams, and even FaceTime home without issues.",
    id: 8,
  },
  {
    name: "Kojo S.",
    level: 400,
    block: "C",
    review:
      "I run a small YouTube channel, and uploading videos used to take hours. Now with Pentagon WiFi, uploads are done in minutes. It’s helped me grow my channel way faster.",
    id: 9,
  },
  // {
  //   "name": "Ewura E.",
  //   "level": 300,
  //   "block": "Nairobi",
  //   "review": "Exams were online this semester and I was so stressed about the internet cutting out. But Pentagon WiFi didn’t disappoint. It stayed strong through all my submissions and quizzes!",
  //   "id": 10
  // },
  // {
  //   "name": "Jason N.",
  //   "level": 100,
  //   "block": "Kampala",
  //   "review": "My study group meets every evening on Google Meet. With Pentagon WiFi, there’s no delay or dropped calls, even with all of us talking at once. It’s crystal clear.",
  //   "id": 11
  // },
  // {
  //   "name": "Adwoa P.",
  //   "level": 200,
  //   "block": "B",
  //   "review": "I like that I can choose a plan that matches my weekly budget. Plus, I don’t need to buy extra bundles anymore. Pentagon WiFi just gets student life!",
  //   "id": 12
  // },
  // {
  //   "name": "Michael T.",
  //   "level": 300,
  //   "block": "Dar es Salaam",
  //   "review": "I never thought I’d find WiFi this fast in the hall. I stream anime in HD with zero issues. Pentagon WiFi is a dream come true for anime fans like me.",
  //   "id": 13
  // },
  // {
  //   "name": "Serwaa K.",
  //   "level": 400,
  //   "block": "Kampala",
  //   "review": "Peak times used to crash my old internet. But now, even when the whole block is online, I still get full bars. Pentagon WiFi is built different!",
  //   "id": 14
  // },
  // {
  //   "name": "Derrick O.",
  //   "level": 100,
  //   "block": "C",
  //   "review": "I once had a router issue and didn’t expect help till the next day. Pentagon’s team was at my door in under 20 minutes. Super fast, super friendly!",
  //   "id": 15
  // },
  // {
  //   "name": "Selam H.",
  //   "level": 400,
  //   "block": "Addis Ababa",
  //   "review": "The connection is incredibly reliable for my research. I can access international journals and databases without any latency issues, which is crucial for my final year project.",
  //   "id": 16
  // }
];

export default function MasonryPage() {
  const heading = "See what our customers are saying";
  const masonryContainer = useMasonry();

  return (
    <section className="">
      <div className="container">
        <div className="mx-auto max-w-5xl border-red-500">
          <HoverBorderGradientDemo />
          <div className="space-y-12">
            <h1 className="mb-4 text-3xl font-semibold md:mb-11 text-center text-primary">
              {heading}
            </h1>
            <div
              ref={masonryContainer}
              className="grid items-start gap-4 sm:grid-cols-3 md:gap-6 border-200 border-red-500"
            >
              {testimonials.map((testimonial) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Testimonial key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
