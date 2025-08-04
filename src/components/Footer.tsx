export default function Footer() {
  return (
    <footer className="w-full pt-4 pb-8 md:py-6 text-center text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} Pentagon WiFi - Powered by Kuanos Cloud
        <br />
        All rights reserved
      </p>
    </footer>
  );
}
