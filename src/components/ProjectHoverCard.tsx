"use client";

import {
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import { ArrowIcon } from "./ArrowIcon";

type ProjectHoverCardProps = {
  children: ReactNode;
  className: string;
  layout?: "offset" | "wide";
  orientation?: "landscape" | "portrait";
};

type CursorPosition = {
  x: number;
  y: number;
};

export function ProjectHoverCard({
  children,
  className,
  layout,
  orientation,
}: ProjectHoverCardProps) {
  const boundsRef = useRef<DOMRect | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 });

  useEffect(
    () => () => {
      window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  function scheduleCursorPosition() {
    if (frameRef.current) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      const cursor = cursorRef.current;

      if (!cursor) {
        return;
      }

      cursor.style.setProperty(
        "--project-cursor-x",
        `${positionRef.current.x.toFixed(2)}px`,
      );
      cursor.style.setProperty(
        "--project-cursor-y",
        `${positionRef.current.y.toFixed(2)}px`,
      );
    });
  }

  function updateCursor(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    const bounds =
      boundsRef.current ?? event.currentTarget.getBoundingClientRect();
    const cursorRadius = (cursorRef.current?.offsetWidth ?? 112) / 2;
    const inset = cursorRadius + 8;
    const maxX = Math.max(inset, bounds.width - inset);
    const maxY = Math.max(inset, bounds.height - inset);

    positionRef.current = {
      x: Math.min(maxX, Math.max(inset, event.clientX - bounds.left)),
      y: Math.min(maxY, Math.max(inset, event.clientY - bounds.top)),
    };
    scheduleCursorPosition();
  }

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    boundsRef.current = event.currentTarget.getBoundingClientRect();
    updateCursor(event);
    event.currentTarget.setAttribute("data-cursor-active", "true");
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    boundsRef.current = null;
    event.currentTarget.removeAttribute("data-cursor-active");
    event.currentTarget.removeAttribute("data-cursor-pressed");
  }

  return (
    <article
      className={`${className} project-hover-card`}
      data-layout={layout}
      data-orientation={orientation}
      onPointerCancel={handlePointerLeave}
      onPointerDown={(event) =>
        event.currentTarget.setAttribute("data-cursor-pressed", "true")
      }
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={updateCursor}
      onPointerUp={(event) =>
        event.currentTarget.removeAttribute("data-cursor-pressed")
      }
    >
      {children}
      <div
        aria-hidden="true"
        className="project-hover-card__cursor"
        ref={cursorRef}
      >
        <span>Read more</span>
        <ArrowIcon />
      </div>
    </article>
  );
}
