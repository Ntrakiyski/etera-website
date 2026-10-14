"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { calEmbedConfig, calUIConfig } from "@/lib/cal-booking";

export function BookingCalendar({ calLink, title }: { calLink: string; title: string }) {
  useEffect(() => {
    let active = true;
    void getCalApi({ namespace: "first-meeting" }).then(cal => {
      if (active) cal("ui", calUIConfig);
    });
    return () => { active = false; };
  }, [calLink]);
  return <Cal namespace="first-meeting" calLink={calLink} config={calEmbedConfig} aria-label={title} style={{ width: "100%" }} />;
}
