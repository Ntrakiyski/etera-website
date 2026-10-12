"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src = "/api/hero-video",
  poster = "/media/etera-hero-poster.jpg",
}: { src?: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let active = true;

    function syncPlayback() {
      if (!video) return;
      if (reducedMotion.matches || !visible || document.hidden) {
        video.pause();
        return;
      }
      video.defaultMuted = true;
      video.muted = true;
      // Keep the poster visible when browser policy blocks autoplay.
      void video.play().catch(() => {
        // Safari may require a real gesture; retry on the next tap without covering the hero.
        if (active) document.addEventListener("pointerdown", syncPlayback, { once: true });
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    syncPlayback();
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    video.addEventListener("canplay", syncPlayback);
    return () => {
      active = false;
      observer.disconnect();
      video.pause();
      document.removeEventListener("pointerdown", syncPlayback);
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("canplay", syncPlayback);
    };
  }, [src]);

  return (
    <>
      <video
        aria-hidden="true"
        autoPlay
        className="home-hero__video"
        loop
        muted
        playsInline
        poster={poster}
        preload="auto"
        ref={videoRef}
        tabIndex={-1}
      >
        <source src={src} type={src === "/api/hero-video" ? "video/mp4" : undefined} />
      </video>
    </>
  );
}
