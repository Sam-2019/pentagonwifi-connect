"use client";

import { Download, Gem, Headset, Rocket, Vault, Wallet } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Rocket className="h-6 w-6" />,
      id: 1,
      // icon: "🚀",
      title: "High-Speed WiFi",
      description:
        "Enjoy lightning-fast internet designed for heavy-duty browsing, smooth video calls, online classes, binge-watching, and low-latency gaming. No lags, no buffering — just blazing speed, every time.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      id: 2,
      // icon: "📥",
      title: "Truly Unlimited Downloads",
      description:
        "Download lecture slides, stream endless shows, or update your game library — all without worrying about data limits or speed throttling. Every package is 100% unlimited.",
    },
    {
      icon: <Vault className="h-6 w-6" />,
      id: 3,
      // icon: "🔐",
      title: "Secure Network Access",
      description:
        "Your privacy matters. Our encrypted WiFi protects your personal data, online activity, and devices with industry-standard security protocols.",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      id: 6,
      // "icon": "💡",
      title: "Student-friendly offers",
      description:
        "Our internet plans are student-friendly, offering reliable connectivity at a price that fits your budget.",
    },
    {
      icon: <Headset className="h-6 w-6" />,
      id: 4,
      // icon: "🧰",
      title: "24/7 Tech Support",
      description:
        "Whether it’s 2 PM or 2 AM, our support team is always on standby. Get real help from real humans whenever you need it.",
    },
    {
      icon: <Gem className="h-6 w-6" />,
      id: 5,
      // icon: "🖨️",
      title: "Exclusive Student Perks",
      description:
        "Enjoy exclusive student benefits like free printing, early promo access, and priority tech support with our Premium plan.",
    },
  ];

  const heading =
    "Affordable, high-performance solutions to keep you connected.";

  return (
    <section className="">
      <div className="container">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            {/* <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Services
            </h2> */}

            <h1 className="mb-4 text-3xl font-semibold md:mb-11 text-center text-primary">
              {heading}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="border-border space-y-4 rounded-lg border p-8 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full p-3">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Services };
