// import Image, { StaticImageData } from "next/image";

// type TestimonialProps = {
//   testimonial: {
//     img: StaticImageData;
//     name: string;
//     username: string;
//     date: string;
//     content: string;
//   };
// };

export default function Testimonial({ testimonial }) {
  const userBlock = (data) => {
    switch (data) {
      case "A":
      case "B":
      case "C":
        return `Block ${data}`;
      default:
        return `${data} Court`;
    }
  };
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow shadow-slate-950/5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold leading-tight text-slate-900">
              {testimonial.name}
            </div>
          </div>
        </div>
      </header>
      <div className="grow text-sm text-slate-600">{testimonial.review}</div>
      <footer className="mt-4 flex items-center gap-2.5 text-slate-500">
        <div className="text-xs">
          {userBlock(testimonial.block)}, Level {testimonial.level}
        </div>
      </footer>
    </article>
  );
}
