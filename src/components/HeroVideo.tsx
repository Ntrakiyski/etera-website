"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!video) {
      return;
    }

    const heroVideo = video;

    function syncPlayback() {
      if (reducedMotion.matches) {
        heroVideo.pause();
        heroVideo.currentTime = 0;
        return;
      }

      void heroVideo.play().catch(() => undefined);
    }

    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);

    return () => reducedMotion.removeEventListener("change", syncPlayback);
  }, []);

  return (
    <video
      aria-hidden="true"
      autoPlay
      className="home-hero__video"
      loop
      muted
      playsInline
      poster="/media/etera-hero-poster.jpg"
      preload="metadata"
      ref={videoRef}
      tabIndex={-1}
    >
      <source src="/media/etera-hero.mp4" type="video/mp4" />
    </video>
  );
}
