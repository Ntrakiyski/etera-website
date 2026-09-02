"use client";

import { useEffect, useRef } from "react";

import { EditorialLink } from "./EditorialLink";
import { HeroVideo } from "./HeroVideo";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function progressBetween(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start));
}

export function HomeHeroSequence() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const eraRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sequence = sequenceRef.current;
    const era = eraRef.current;
    const cta = sequence?.querySelector<HTMLAnchorElement>(".editorial-link");
    const eraColor = sequence?.querySelector<HTMLElement>(
      ".home-hero__era-color span",
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!sequence || !era || !cta || !eraColor) {
      return;
    }

    const sequenceElement = sequence;
    const eraElement = era;
    const eraColorElement = eraColor;
    const ctaElement = cta;
    let animationFrame = 0;
    let eraColorTranslate = 0;
    let eraTranslate = 0;
    let eraTranslateY = 0;

    function update() {
      animationFrame = 0;

      if (reducedMotion.matches) {
        sequenceElement.removeAttribute("data-scroll-active");
        sequenceElement.removeAttribute("data-cta-hidden");
        sequenceElement.style.removeProperty("--home-progress");
        document.documentElement.removeAttribute("data-home-scroll-active");
        document.documentElement.removeAttribute("data-home-header-hidden");
        document.documentElement.style.removeProperty("--home-header-opacity");
        ctaElement.removeAttribute("tabindex");
        return;
      }

      sequenceElement.setAttribute("data-scroll-active", "true");
      document.documentElement.setAttribute("data-home-scroll-active", "true");

      const sequenceTop =
        window.scrollY + sequenceElement.getBoundingClientRect().top;
      const travel = Math.max(
        sequenceElement.offsetHeight - window.innerHeight,
        1,
      );
      const progress = clamp((window.scrollY - sequenceTop) / travel);
      const leadProgress = progressBetween(progress, 0.06, 0.36);
      const eraCenterProgress = progressBetween(progress, 0.08, 0.36);
      const ctaProgress = progressBetween(progress, 0.08, 0.34);
      const wipeProgress = progressBetween(progress, 0.38, 0.82);
      const eraFadeProgress = progressBetween(progress, 0.75, 0.9);
      const statementProgress = progressBetween(progress, 0.8, 0.98);
      const eraRect = eraElement.getBoundingClientRect();
      const untransformedEraCenter =
        eraRect.left + eraRect.width / 2 - eraTranslate;
      const untransformedEraCenterY =
        eraRect.top + eraRect.height / 2 - eraTranslateY;
      const eraShift = window.innerWidth / 2 - untransformedEraCenter;
      const eraShiftY = window.innerHeight / 2 - untransformedEraCenterY;
      eraTranslate = eraShift * eraCenterProgress;
      eraTranslateY = eraShiftY * eraCenterProgress;
      const eraColorRect = eraColorElement.getBoundingClientRect();
      const untransformedEraColorCenter =
        eraColorRect.top + eraColorRect.height / 2 - eraColorTranslate;
      eraColorTranslate =
        untransformedEraCenterY + eraTranslateY - untransformedEraColorCenter;

      sequenceElement.style.setProperty("--home-progress", progress.toFixed(4));
      sequenceElement.style.setProperty(
        "--home-video-scale",
        (1 + progress * 0.04).toFixed(4),
      );
      sequenceElement.style.setProperty(
        "--home-overlay-alpha",
        (0.3 + progress * 0.1).toFixed(4),
      );
      sequenceElement.style.setProperty(
        "--home-lead-opacity",
        (1 - leadProgress).toFixed(4),
      );
      sequenceElement.style.setProperty(
        "--home-lead-y",
        `${(-5.5 * leadProgress).toFixed(3)}rem`,
      );
      sequenceElement.style.setProperty(
        "--home-era-x",
        `${eraTranslate.toFixed(2)}px`,
      );
      sequenceElement.style.setProperty(
        "--home-era-y",
        `${eraTranslateY.toFixed(2)}px`,
      );
      sequenceElement.style.setProperty(
        "--home-era-opacity",
        (1 - eraFadeProgress).toFixed(4),
      );
      sequenceElement.style.setProperty(
        "--home-era-color-y",
        `${eraColorTranslate.toFixed(2)}px`,
      );
      sequenceElement.style.setProperty(
        "--home-cta-opacity",
        (1 - ctaProgress).toFixed(4),
      );
      sequenceElement.style.setProperty(
        "--home-cta-clip",
        `${(ctaProgress * 50).toFixed(2)}%`,
      );
      sequenceElement.style.setProperty(
        "--home-panel-y",
        `${((1 - wipeProgress) * 100).toFixed(3)}%`,
      );
      sequenceElement.style.setProperty(
        "--home-era-clip",
        `${((1 - wipeProgress) * 100).toFixed(3)}%`,
      );
      sequenceElement.style.setProperty(
        "--home-statement-opacity",
        statementProgress.toFixed(4),
      );
      sequenceElement.style.setProperty(
        "--home-statement-y",
        `${((1 - statementProgress) * 2.5).toFixed(3)}rem`,
      );

      const ctaHidden = ctaProgress > 0.96;
      const headerOpacity = 1 - progressBetween(progress, 0.82, 0.96);
      sequenceElement.toggleAttribute("data-cta-hidden", ctaHidden);
      ctaElement.tabIndex = ctaHidden ? -1 : 0;
      document.documentElement.style.setProperty(
        "--home-header-opacity",
        headerOpacity.toFixed(4),
      );
      document.documentElement.toggleAttribute(
        "data-home-header-hidden",
        headerOpacity < 0.04,
      );
    }

    function scheduleUpdate() {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      ctaElement.removeAttribute("tabindex");
      document.documentElement.removeAttribute("data-home-scroll-active");
      document.documentElement.removeAttribute("data-home-header-hidden");
      document.documentElement.style.removeProperty("--home-header-opacity");
    };
  }, []);

  return (
    <div className="home-hero-sequence" ref={sequenceRef}>
      <div className="home-hero-sequence__stage">
        <section className="home-hero">
          <HeroVideo />
          <div className="home-hero__copy">
            <h1>
              <span className="home-hero__lead">Define your</span>{" "}
              <span className="home-hero__era" ref={eraRef}>
                era.
              </span>
            </h1>
            <EditorialLink href="/the-atelier">Enter the atelier</EditorialLink>
          </div>
        </section>

        <section
          aria-labelledby="home-positioning-title"
          className="home-positioning"
        >
          <div className="home-positioning__inner">
            <h2 id="home-positioning-title">
              <span>ETÉRA is a creative atelier that</span>{" "}
              <span>builds presence and shapes culture.</span>
            </h2>
          </div>
        </section>

        <div aria-hidden="true" className="home-hero__era-color">
          <span>era.</span>
        </div>
      </div>
    </div>
  );
}
