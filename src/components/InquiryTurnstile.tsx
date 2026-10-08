"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Turnstile = {
  render: (element: HTMLElement, options: {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
    action: string;
    theme: string;
    size: string;
  }) => string;
  remove: (widget: string) => void;
};

export function InquiryTurnstile({ siteKey, reset, onToken }: {
  siteKey: string;
  reset: number;
  onToken: (token: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const turnstile = (window as Window & { turnstile?: Turnstile }).turnstile;
    if (!loaded || !container.current || !turnstile || !siteKey) return;
    const widget = turnstile.render(container.current, {
      sitekey: siteKey,
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
      action: "inquiry",
      theme: "light",
      size: container.current.clientWidth < 300 ? "compact" : "flexible",
    });
    return () => turnstile.remove(widget);
  }, [loaded, onToken, reset, siteKey]);

  return <>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" onReady={() => setLoaded(true)} />
    <div ref={container} style={{ width: "100%", maxWidth: "var(--max-width)", marginInline: "auto", marginTop: "2rem", minHeight: 65 }} />
  </>;
}
