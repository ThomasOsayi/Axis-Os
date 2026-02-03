"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionReveal } from "@/components/SectionReveal";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { Check, X, ArrowRight } from "lucide-react";

const forYou = [
  "You're ready to invest in a real system",
  "You want predictable, scalable revenue",
  "You value data-driven decisions",
  "You're done with inconsistent results",
];

const notForYou = [
  "You want overnight results with no commitment",
  "You're not willing to invest in growth",
  "You just want to \"go viral\"",
  "You're looking for the cheapest option",
];

export function Contact() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <FloatingOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to Build Your{" "}
              <span className="gradient-text">Growth System</span>?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We only work with brands that are serious about growth. See if
              we&apos;re the right fit.
            </p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <SectionReveal delay={0.1}>
            <Card className="bg-emerald-500/5 border-emerald-500/20 h-full">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">
                  This Is For People Who
                </h3>
                <ul className="space-y-3">
                  {forYou.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-emerald-400"
                      />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <Card className="bg-red-500/5 border-red-500/20 h-full">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-red-400 mb-4">
                  This Is NOT For
                </h3>
                <ul className="space-y-3">
                  {notForYou.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <X
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-red-400"
                      />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.3}>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 text-lg px-10 py-7 transition-transform hover:scale-105"
            >
              <a href="#contact">
                Book Your Strategy Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              Free 30-minute call. No commitment required.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
