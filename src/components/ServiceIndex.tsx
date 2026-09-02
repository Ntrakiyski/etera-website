"use client";

import { useMemo, useState } from "react";

import type { ServiceSummary } from "@/lib/cms";

type ServiceGroup = {
  area: string;
  items: ServiceSummary[];
};

function groupServices(services: ServiceSummary[]) {
  const groups = new Map<string, ServiceGroup>();

  for (const service of services) {
    const group = groups.get(service.area);

    if (group) {
      group.items.push(service);
    } else {
      groups.set(service.area, { area: service.area, items: [service] });
    }
  }

  return [...groups.values()];
}

export function ServiceIndex({
  services,
  tone = "light",
}: {
  services: ServiceSummary[];
  tone?: "dark" | "light";
}) {
  const groups = useMemo(() => groupServices(services), [services]);
  const [openGroup, setOpenGroup] = useState<string | null>(
    groups[0]?.area ?? null,
  );

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className="service-index" data-tone={tone}>
      {groups.map((group, index) => {
        const open = openGroup === group.area;
        const triggerId = `service-trigger-${index}`;
        const panelId = `service-panel-${index}`;

        return (
          <div className="service-index__item" key={group.area}>
            <button
              aria-controls={panelId}
              aria-expanded={open}
              className="service-index__button"
              id={triggerId}
              onClick={() => setOpenGroup(open ? null : group.area)}
              type="button"
            >
              <span className="service-index__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="service-index__name">{group.area}</span>
              <span aria-hidden="true" className="service-index__plus" />
            </button>
            <div
              aria-hidden={!open}
              aria-labelledby={triggerId}
              className="service-index__panel"
              data-open={open}
              id={panelId}
              role="region"
            >
              <div className="service-index__panel-inner">
                {group.items.map((item) => (
                  <div className="service-index__detail" key={item.id}>
                    {item.name !== group.area ? <h3>{item.name}</h3> : null}
                    <p>{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
