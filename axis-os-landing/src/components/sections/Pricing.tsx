"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionReveal } from "@/components/SectionReveal";
import { Check, Star } from "lucide-react";

const tiers = [
  {
    name: "Core Growth",
    price: "$2,500 - $3,000",
    period: "/mo",
    description: "Essential advertising and optimization for brands ready to grow.",
    features: [
      "Meta Ads management & creative",
      "Landing page design & optimization",
      "Weekly performance reporting",
      "Bi-weekly strategy calls",
      "Audience research & targeting",
    ],
    popular: false,
    gradient: "from-slate-800/50 to-slate-900/50",
    border: "border-slate-800",
    buttonVariant: "outline" as const,
  },
  {
    name: "Growth + Automation",
    price: "$3,500 - $4,500",
    period: "/mo",
    description:
      "Full growth system with automation for maximum efficiency.",
    features: [
      "Everything in Core Growth",
      "Email & SMS automation sequences",
      "AI chatbot for lead qualification",
      "CRM setup & pipeline management",
      "Lead nurturing workflows",
      "A/B testing & optimization",
    ],
    popular: true,
    gradient: "from-cyan-500/10 to-blue-600/10",
    border: "border-cyan-500/30",
    buttonVariant: "default" as const,
  },
  {
    name: "Full System",
    price: "$5,000+",
    period: "/mo",
    description:
      "Complete growth infrastructure for brands scaling aggressively.",
    features: [
      "Everything in Growth + Automation",
      "Advanced sales funnels",
      "Full CRM build-out & management",
      "Multi-platform ad management",
      "Custom integrations & workflows",
      "Priority support & weekly calls",
    ],
    popular: false,
    gradient: "from-slate-800/50 to-slate-900/50",
    border: "border-slate-800",
    buttonVariant: "outline" as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-3">
              Pricing
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Invest in{" "}
              <span className="gradient-text">Predictable Growth</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Transparent pricing for every stage of growth. Every plan includes
              a dedicated strategist and weekly optimization.
            </p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <SectionReveal key={tier.name} delay={0.1 + i * 0.1}>
              <Card
                className={`relative bg-gradient-to-b ${tier.gradient} border ${tier.border} hover:scale-[1.02] hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
                  tier.popular ? "hover:shadow-cyan-500/10" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      <Star size={12} fill="currentColor" />
                      POPULAR
                    </span>
                  </div>
                )}
                <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {tier.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">
                        {tier.price}
                      </span>
                      <span className="text-slate-500">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            tier.popular ? "text-cyan-400" : "text-slate-500"
                          }`}
                        />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className={`w-full transition-transform hover:scale-105 ${
                      tier.popular
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0"
                        : "border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                    variant={tier.buttonVariant}
                  >
                    <a href="#contact">Get Started</a>
                  </Button>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
