"use client";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function ReviewsMinimal() {
  const reduce = useReducedMotion();

  const reviews = useMemo(
    () => [
      {
        quote:
          "Taş dokunun içinde ama modern konforla… konum mükemmel ve sessizlik inanılmazdı.",
        who: "Verified Airbnb Guest",
      },
      {
        quote:
          "Teras sabahları bambaşka… balonlar ve Ortahisar silüeti unutulmazdı.",
        who: "Verified Airbnb Guest",
      },
      {
        quote:
          "Gerçekten 'ev gibi' hissettiren nadir yerlerden. Mutfak ve mahremiyet harika.",
        who: "Verified Airbnb Guest",
      },
      {
        quote:
          "Ortahisar'da kalmak çok doğruymuş. Göreme kalabalığına uzak ama her yere yakın.",
        who: "Verified Airbnb Guest",
      },
    ],
    []
  );

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;

    const t = setInterval(() => {
      setI((x) => (x + 1) % reviews.length);
    }, 8000);

    return () => clearInterval(t);
  }, [reduce, paused, reviews.length]);

  const prev = () => setI((x) => (x - 1 + reviews.length) % reviews.length);
  const next = () => setI((x) => (x + 1) % reviews.length);

  return (
    <Section tone="warm">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3">
            <p className="text-ink text-4xl md:text-6xl font-light tracking-wide font-serif">
              4.86 / 5
            </p>
            <p className="text-ink-2 text-base md:text-lg">
              1046+ doğrulanmış misafir yorumu
            </p>
          </div>
        </Reveal>

        <div
          className="mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white/60 rounded-sm p-8 shadow-sm"
            >
              <p className="text-ink leading-relaxed text-lg md:text-xl font-light">
                "{reviews[i].quote}"
              </p>
              <p className="mt-6 text-sm text-ink-2">{reviews[i].who}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="rounded-md border border-line px-3 py-2 text-sm text-ink hover:bg-white/70 transition"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-md border border-line px-3 py-2 text-sm text-ink hover:bg-white/70 transition"
              aria-label="Next review"
            >
              →
            </button>

            <div className="ml-2 flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  className={`h-1.5 rounded-full transition ${
                    idx === i ? "w-8 bg-ink" : "w-3 bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <a
              href="https://www.airbnb.com/rooms/2953140"
              className="text-ink underline underline-offset-4 hover:opacity-80 transition"
            >
              Airbnb'de tüm yorumları görüntüle
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
