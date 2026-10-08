"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    let visible = true;

    function syncPlayback() {
      if (!video) return;
      if (reducedMotion.matches || !visible || document.hidden) {
        video.pause();
        return;
      }
      video.muted = true;
      void video.play().catch(() => {
        if (active) setPlaying(false);
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
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("canplay", syncPlayback);
    };
  }, []);

  return (
    <>
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
        onPlaying={() => setPlaying(true)}
        onPause={() => {
          // Safari can pause native autoplay after its play promise has resolved.
          if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setPlaying(false);
          }
        }}
      >
        <source src="/media/etera-hero.mp4" type="video/mp4" />
      </video>
      {!playing && (
        <button
          className="home-hero__play"
          type="button"
          onClick={() => void videoRef.current?.play().catch(() => setPlaying(false))}
        >
          Play background video
        </button>
      )}
    </>
  );
}
