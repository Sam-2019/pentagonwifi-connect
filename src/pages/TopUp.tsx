import TopUpForm from "@/components/TopUpForm";

const TopUp = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center relative">
      <div className="text-center mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Connect to Pentagon WiFi
        </h1>
        <p className="text-gray-600 mb-6 px-2">
          Need more data?
          <br />
          Complete the form below to top up instantly.
        </p>
      </div>

      <div className="w-full rounded-lg md:p-0 p-4">
        <TopUpForm />
      </div>
    </main>
  );
};

export default TopUp;
