import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: number;
  question: string;
  answer: string | JSX.Element;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const topup_url = "https://pentagonwifi.vercel.app/topup";
const FAQ = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: 1,
      question: "What is Pentagon WiFi?",
      answer:
        "Pentagon WiFi is a high-speed, secure, and affordable internet service designed exclusively for students at the African Union Hall, University of Ghana. We provide fast, unlimited internet right in your room—so you can stay connected for classes, entertainment, and more.",
    },
    {
      id: 2,
      question: "How do I connect to the WiFi?",
      answer:
        "Once you’ve subscribed to a package, we’ll send you your login credentials via email or SMS. Just connect to the “PentagonWiFi” network, log in using the credentials, and you're online in seconds!",
    },
    {
      id: 4,
      question: "Can I roll over unused data?",
      answer:
        "No! Your data allocation is unlimited for the period of the subscription plan.",
    },
    {
      id: 5,
      question: "What should I do if my internet isn't working?",
      answer:
        "Don’t worry—we’ve got your back. Reach out to our 24/7 tech support team via phone, email, or WhatsApp. Most issues are resolved in minutes!",
    },
    {
      id: 6,
      question: "How do I pay for a subscription?",
      answer: (
        <>
          Visit{" "}
          <a
            href={topup_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:underline"
          >
            here
          </a>
          , complete the form and follow the prompts to pay via mobile money.
        </>
      ),
    },
    {
      id: 7,
      question: "Can I use my subscription on multiple devices?",
      answer:
        "No. You can connect one device per session. Logout on your current device to use the service on another device ",
    },
    {
      id: 8,
      question: "Is the connection secure?",
      answer:
        "Absolutely. Our network uses encrypted protocols to ensure your data and devices stay protected while you browse, stream, or study.",
    },
    {
      id: 9,
      question: "What happens when my plan expires?",
      answer: (
        <>
          Once your plan expires, you’ll be automatically logged out. You can
          easily renew your subscription via{" "}
          <a
            href={topup_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:underline"
          >
            here
          </a>
          .
        </>
      ),
    },
    // {
    //   id: 10,
    //   question: "Do I get a receipt or confirmation after payment?",
    //   answer:
    //     "Yes, you’ll receive a digital receipt and confirmation email/SMS once payment is completed.",
    // },
  ],
}: Faq1Props) => (
  <section className="">
    <div className="container max-w-5xl">
      <div className="space-y-12">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 text-center text-primary">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item) => (
            <AccordionItem key={item.id} value={`item-${item.id}`}>
              <AccordionTrigger className="font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
