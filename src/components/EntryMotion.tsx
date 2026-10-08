"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function EntryMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const motion = window.matchMedia("(max-width: 700px) and (prefers-reduced-motion: no-preference)");
    if (!motion.matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("entry-revealed");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll(".method-sequence > li, .aether-media, .service-index__item").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
