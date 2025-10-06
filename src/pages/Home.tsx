import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <div className="text-center mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Connect to Pentagon WiFi
        </h1>
        <p className="text-gray-600 mb-6 px-2">
          Fill out the form below to register for blazing-fast internet service.
        </p>
      </div>

      <div className="w-full rounded-lg md:p-0 p-4">
        <RegistrationForm />
      </div>
    </main>
  );
};

export default Index;
