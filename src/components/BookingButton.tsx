"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { ArrowIcon } from "./ArrowIcon";
import { calEmbedConfig, calUIConfig } from "@/lib/cal-booking";

export function BookingButton({ calLink, label, className = "" }: { calLink: string; label: string; className?: string }) {
  useEffect(() => {
    let active = true;
    void getCalApi({ namespace: "first-meeting-modal" }).then(cal => {
      if (active) cal("ui", calUIConfig);
    });
    return () => { active = false; };
  }, []);

  return (
    <a href={`https://cal.com/${calLink}`} className={`booking-action ${className}`} aria-haspopup="dialog" onClick={event => {
      // Keep the direct booking link if the SDK is blocked or the visitor opens a new tab.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !window.Cal?.loaded) return;
      const cal = window.Cal.ns["first-meeting-modal"];
      if (!cal) return;
      event.preventDefault();
      cal("ui", calUIConfig);
      cal("modal", { calLink, config: calEmbedConfig });
    }}>
      <span>{label}</span><ArrowIcon />
    </a>
  );
}
