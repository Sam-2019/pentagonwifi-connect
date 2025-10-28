"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface Pricing2Props {
  heading?: string;
  description?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const Pricing = ({
  heading = "Choose a plan that fits your needs",
  subtitle = "No hidden fees. No data caps. Just pure, high speed connection built for students.",
  plans = [
    {
      id: 0,
      name: "Weekly",
      description: "For 24 hours",
      price: "Ghc 20",
      features: [
        { text: "Non-Stop Unlimited Data" },
        {
          text: "Enjoy unlimted access to Facebook, Instgram, Youtube , Tiktok and more",
        },
        { text: "Perfect for quick, on-the-go connectivity" },
      ],
      button: {
        text: "Go Daily",
        url: "/register",
      },
    },
    {
      id: 1,
      name: "Weekly",
      description: "For 7 days",
      price: "Ghc 100",
      features: [
        { text: "Non-Stop Unlimited Data" },
        {
          text: "Enjoy unlimted access to Facebook, Instgram, Youtube , Tiktok and more",
        },
        {
          text: "Ideal for heavy users who need uninterrupted access for a full week",
        },
      ],
      button: {
        text: "Go Weekly",
        url: "/register",
      },
    },
  ],
}: Pricing2Props) => {
  return (
    <section className="">
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-semibold text-center text-primary ">
            {heading}
          </h1>
          <div className="flex flex-col">
            <span className="text-muted-foreground leading-relaxed lg:text-lg">
              {subtitle}
            </span>
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row w-full">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="flex w-full flex-col justify-between text-left"
              >
                <CardHeader>
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  {/* {plan.id === 1 && (
                    <p className="mb-3 font-semibold">
                      Everything in Plus, and:
                    </p>
                  )} */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
