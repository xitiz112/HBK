"use client";

import { useEffect, useState } from "react";

import { ContentImage } from "@/components/content-image";
import { ds } from "@/components/design-system";
import ScrollReveal from "@/components/scroll-reveal";
import type { ProcessStepData } from "@/lib/content";

const RIPPLE_MS = 3600;

function StepCircle({
  step,
  active,
  size,
  centered = false,
}: {
  step: ProcessStepData;
  active: boolean;
  size: "lg" | "sm";
  centered?: boolean;
}) {
  const isImage = Boolean(step.image);
  const circle =
    size === "lg"
      ? isImage
        ? "h-16 w-16"
        : "h-10 w-10 text-sm"
      : isImage
        ? "h-12 w-12"
        : "h-8 w-8 text-xs";

  return (
    <span
      className={`relative inline-flex ${circle} items-center justify-center ${centered ? "mx-auto" : ""}`}
    >
      {active ? (
        <>
          <span className="hbk-process-ring" aria-hidden />
          <span className="hbk-process-ring hbk-process-ring--late" aria-hidden />
        </>
      ) : null}
      {step.image ? (
        <span className={`relative z-10 block overflow-hidden rounded-full ${circle}`}>
          <ContentImage src={step.image} alt={step.title} fill className="object-cover" sizes="64px" curvy={false} />
        </span>
      ) : (
        <span
          className={`relative z-10 flex ${circle} items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-white`}
        >
          {step.number}
        </span>
      )}
    </span>
  );
}

export function ProcessSteps({ steps }: { steps: ProcessStepData[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (steps.length < 2) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return;
    }
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, RIPPLE_MS);
    return () => window.clearInterval(id);
  }, [steps.length]);

  return (
    <>
      <div className="relative mt-14 hidden lg:block">
        <div className="absolute left-[12%] right-[12%] top-5 h-0.5 bg-[var(--color-accent-soft)]" />
        <div className="relative grid grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.id ?? step.number} variant="fade-up" delay={200 + index * 160}>
              <div className="text-center">
                <StepCircle step={step} active={active === index} size="lg" centered />
                <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className={`mt-2 ${ds.bodySm}`}>{step.summary}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:hidden">
        {steps.map((step, index) => (
          <ScrollReveal key={step.id ?? step.number} variant="fade-up" delay={200 + index * 140}>
            <div className={`${ds.card} p-5`}>
              <StepCircle step={step} active={active === index} size="sm" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className={`mt-2 ${ds.bodySm}`}>{step.summary}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
