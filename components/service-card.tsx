"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calculator,
  FileText,
  Receipt,
  ShieldCheck,
  X,
} from "lucide-react";

import { CardsCarousel } from "@/components/cards-carousel";
import { ContentImage } from "@/components/content-image";

type IconComponent = typeof ShieldCheck;

const serviceIcons: Record<string, IconComponent> = {
  ShieldCheck,
  Receipt,
  Briefcase,
  BarChart3,
  FileText,
  Calculator,
};

export type ServiceCardModel = {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon: string;
};

export function ServiceCards({ cards }: { cards: ServiceCardModel[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <CardsCarousel
      ariaLabel="Services"
      prevLabel="Previous services"
      nextLabel="Next services"
      className="mt-12"
      clipClassName="pb-12 lg:pb-0"
      onNavigate={() => setOpenId(null)}
    >
      {cards.map((card) => (
        <ServiceCard
          key={card.id}
          card={card}
          open={openId === card.id}
          onOpen={() => setOpenId(card.id)}
          onClose={() => setOpenId((current) => (current === card.id ? null : current))}
        />
      ))}
    </CardsCarousel>
  );
}

function ServiceCard({
  card,
  open,
  onOpen,
  onClose,
}: {
  card: ServiceCardModel;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const Icon = serviceIcons[card.icon] ?? ShieldCheck;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className="group relative h-[300px] w-full lg:[perspective:1000px]">
      <div className="relative h-[300px] w-full lg:transition-transform lg:duration-500 lg:[transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] lg:[backface-visibility:hidden]">
          {card.image ? (
            <ContentImage
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 360px"
              curvy={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-secondary-muted)]">
              <Icon className="h-8 w-8 text-[var(--color-primary)]" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 px-5">
            <h3 className="rounded-full border border-white px-4 py-1.5 text-center text-lg font-bold text-white drop-shadow">
              {card.title}
            </h3>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center rounded-xl bg-[var(--color-primary)] p-6 pb-10 text-center lg:flex lg:group-hover:pointer-events-auto lg:[backface-visibility:hidden] lg:[transform:rotateY(180deg)]">
          {card.image ? (
            <span className="relative block h-11 w-11 overflow-hidden rounded-lg">
              <ContentImage
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="44px"
                curvy={false}
              />
            </span>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/20 text-white">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <h3 className="mt-5 text-xl font-bold text-white">{card.title}</h3>
          <p className="mt-3 text-[15px] leading-6 text-blue-100">{card.description}</p>
          <Link
            href="/services"
            className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-lg border border-white bg-white px-5 py-2.5 text-[15px] font-semibold text-[var(--color-primary)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-blue-50"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div
        className={`absolute inset-0 z-20 overflow-hidden rounded-xl lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label={`Close ${card.title} details`}
          className={`absolute inset-0 bg-slate-950/50 transition-opacity duration-[350ms] ease-out ${open ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${card.id}-sheet-title`}
          className={`absolute inset-x-0 bottom-0 flex max-h-full flex-col overflow-y-auto rounded-t-xl bg-[var(--color-primary)] px-5 pb-6 pt-8 text-center shadow-[0px_-8px_24px_rgba(0,0,0,0.18)] transition-transform duration-[350ms] ease-out ${open ? "translate-y-0" : "translate-y-full"}`}
        >
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
          <h3 id={`${card.id}-sheet-title`} className="text-xl font-bold text-white">
            {card.title}
          </h3>
          <p className="mt-3 text-[15px] leading-6 text-blue-100">{card.description}</p>
          <Link
            href="/contact"
            tabIndex={open ? 0 : -1}
            className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-lg border border-white bg-white px-5 py-2.5 text-[15px] font-semibold text-[var(--color-primary)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-blue-50"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${card.id}-sheet-title`}
        className={`absolute bottom-0 left-1/2 z-10 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-lg border border-[var(--color-primary)] bg-white px-5 py-2.5 text-[15px] font-semibold text-[var(--color-primary)] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition hover:bg-blue-50 lg:hidden ${open ? "pointer-events-none opacity-0" : ""}`}
        onClick={onOpen}
      >
        Know More
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
