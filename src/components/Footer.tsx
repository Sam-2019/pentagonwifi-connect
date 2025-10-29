export default function Footer() {
  return (
    <footer className="w-full pt-4 pb-8 md:py-6 text-center text-sm text-gray-500 relative">
      {/* <div className="flex justify-center items-center space-x-5 border-2 my-2">
        <p className="items-center">* Terms and Conditions *</p>
        <p>* Privacy *</p>
      </div> */}

      <div className="flex flex-row justify-center text-gray-500 items-center mb-4">
        <p> * </p>
        <a
          className="px-2 text-base text-primary underline"
          href="https://drive.google.com/file/d/1Sa48Zz4cwM00RyNyT07Vu_ZloIR6DpUc/view"
          target="blank"
        >
          Terms & Conditions
        </a>
        <p> * </p>
        <a
          className="px-2 text-base text-primary underline"
          href="https://drive.google.com/file/d/1xOFsoIbicIegMnpxC-aPKZladzSJMp4N/view?usp=sharing"
          target="blank"
        >
          Privacy
        </a>
        <p> * </p>
      </div>

      <p>
        © {new Date().getFullYear()} Pentagon WiFi - Powered by Kuanos Cloud
        <br />
        All rights reserved
      </p>
    </footer>
  );
}
