"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src = "/media/etera-hero.mp4",
  poster = "/media/etera-hero-poster.jpg",
}: { src?: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;

    function syncPlayback() {
      if (!video) return;
      if (reducedMotion.matches || !visible || document.hidden) {
        video.pause();
        return;
      }
      video.muted = true;
      // Keep the poster visible when browser policy blocks autoplay.
      void video.play().catch(() => {});
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
      observer.disconnect();
      video.pause();
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
        preload="metadata"
        ref={videoRef}
        tabIndex={-1}
      >
        <source src={src} />
      </video>
    </>
  );
}
