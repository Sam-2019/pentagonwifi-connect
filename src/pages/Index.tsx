import RegistrationForm from '@/components/RegistrationForm';
import LightningBackground from '@/components/WaveBackground';
import Logo from '@/components/Logo';

const Index = () => {
  return (
    <div>
      <LightningBackground />
      <header className="w-full text-center text-sm text-gray-500 z-10">
        <div className="max-w-7xl mx-auto mb-3">
          <Logo />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Connect to Pentagon WiFi
          </h1>
          <p className="text-gray-600 mb-6">
            Fill out the form below to register for blazing-fast internet service.
          </p>
        </div>

        <div className="w-full rounded-lg md:p-0 p-4">
          <RegistrationForm />
        </div>
      </main>

      <footer className="w-full py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Pentagon WiFi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
