"use client";

import { useEffect, useRef } from "react";

import type { HomeContent } from "@/lib/cms";

import { EditorialLink } from "./EditorialLink";
import { HeroVideo } from "./HeroVideo";

export function HomeHeroSequence({ home }: { home: HomeContent }) {
  const headlineWords = home.heroHeadline.trim().split(/\s+/);
  const headlineEnd = headlineWords.pop();
  const sequenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const cta = sequence?.querySelector<HTMLAnchorElement>(".editorial-link");
    if (!sequence || !cta) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let top = 0;
    let travel = 1;
    let lastProgress = -1;

    function update() {
      frame = 0;
      if (!sequence || !cta) return;
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / travel));
      if (progress === lastProgress) return;
      lastProgress = progress;
      const reveal = Math.min(1, Math.max(0, (progress - 0.1) / 0.8));
      const eased = reveal * reveal * (3 - 2 * reveal);
      sequence.style.setProperty("--home-panel-y", `${(1 - eased) * 100}%`);
      sequence.style.setProperty("--home-statement-opacity", "1");
      const hidden = !reducedMotion.matches && reveal > 0.9;
      sequence.toggleAttribute("data-cta-hidden", hidden);
      cta.tabIndex = hidden ? -1 : 0;
      document.documentElement.toggleAttribute(
        "data-home-header-on-milk",
        reducedMotion.matches ? window.scrollY >= top + window.innerHeight : reveal >= 0.9,
      );
    }

    function schedule() {
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / travel));
      if (progress === lastProgress) return;
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function measure() {
      if (!sequence) return;
      if (reducedMotion.matches) sequence.removeAttribute("data-scroll-active");
      else sequence.setAttribute("data-scroll-active", "true");
      document.documentElement.toggleAttribute("data-home-scroll-active", !reducedMotion.matches);
      top = window.scrollY + sequence.getBoundingClientRect().top;
      travel = reducedMotion.matches ? window.innerHeight : Math.max(sequence.offsetHeight - window.innerHeight, 1);
      lastProgress = -1;
      schedule();
    }

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
      cta.removeAttribute("tabindex");
      document.documentElement.removeAttribute("data-home-scroll-active");
      document.documentElement.removeAttribute("data-home-header-on-milk");
    };
  }, []);

  return (
    <div className="home-hero-sequence" ref={sequenceRef}>
      <div className="home-hero-sequence__stage">
        <section className="home-hero">
          <HeroVideo poster={home.heroPoster?.url} src={home.heroVideo?.url} />
          <div className="home-hero__copy">
            <h1>
              <span className="home-hero__lead">{headlineWords.join(" ")}</span>{" "}
              <span className="home-hero__era">
                {headlineEnd}
              </span>
            </h1>
            <EditorialLink href="/the-atelier">{home.heroCTA}</EditorialLink>
          </div>
        </section>

        <section
          aria-labelledby="home-positioning-title"
          className="home-positioning"
        >
          <div className="home-positioning__inner">
            <h2 id="home-positioning-title">
              {home.heroSupportingCopy.split("\n").map((line, index) => (
                <span key={index}>{line}{" "}</span>
              ))}
            </h2>
          </div>
        </section>

      </div>
    </div>
  );
}
