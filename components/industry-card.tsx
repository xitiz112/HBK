"use client";

import { useState } from "react";

import { CardsCarousel } from "@/components/cards-carousel";
import { ContentImage } from "@/components/content-image";

export type IndustryCardModel = {
  id: string;
  name: string;
  summary: string;
  examples: string;
  image?: string;
};

export function IndustryCards({ cards }: { cards: IndustryCardModel[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <CardsCarousel
      ariaLabel="Industries served"
      prevLabel="Previous industries"
      nextLabel="Next industries"
      className="mt-12"
      onNavigate={() => setOpenId(null)}
    >
      {cards.map((card) => (
        <IndustryCard
          key={card.id}
          card={card}
          open={openId === card.id}
          onToggle={() => setOpenId((current) => (current === card.id ? null : card.id))}
        />
      ))}
    </CardsCarousel>
  );
}

function IndustryCard({
  card,
  open,
  onToggle,
}: {
  card: IndustryCardModel;
  open: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const expanded = open || hovered;

  return (
    <article
      className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-0 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0px_6px_16px_0px_rgba(99,99,99,0.25)]"
      onMouseEnter={() => {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {card.image ? (
        <ContentImage
          src={card.image}
          alt={card.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 33vw"
          curvy={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-secondary-muted)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/10" />

      <div className="absolute inset-0 z-10 flex flex-col">
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1" aria-hidden />
          <h3 className="pointer-events-none shrink-0 px-6 text-center text-[18px] font-bold text-white drop-shadow-[0_1px_8px_rgba(15,23,42,0.55)]">
            {card.name}
          </h3>
          <div
            className={`pointer-events-none shrink-0 transition-[flex-grow,height] duration-300 ease-out ${
              expanded ? "h-4 grow-0" : "min-h-0 flex-1"
            }`}
            aria-hidden
          />
        </div>

        <div
          className={`shrink-0 overflow-hidden transition-[max-height] duration-300 ease-out ${
            expanded ? "max-h-80" : "max-h-0"
          }`}
          data-industry-panel=""
        >
          <div className="px-3 pb-3">
            <div className="rounded-xl bg-white p-4 shadow-[0px_4px_16px_rgba(15,23,42,0.16)]">
              <p className="text-[15px] leading-6 text-slate-600">{card.summary}</p>
              {card.examples ? (
                <p className="mt-2 text-[15px] leading-6 text-slate-500">{card.examples}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? `Hide ${card.name} details` : `Show ${card.name} details`}
        className="absolute inset-0 z-30 lg:hidden"
        onClick={onToggle}
      />
    </article>
  );
}
