"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const primaryNavigation = [
  { href: "/the-atelier", label: "The Atelier" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="menu-glyph" data-open={open}>
      <span />
      <span />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const overlaysHero = pathname === "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".footer-directory--navigation");
    if (!footer) return;
    // Hide when the black footer reaches the bottom edge of the sticky header.
    const updateFooterVisibility = () => {
      const headerHeight = navigationRef.current?.closest("header")?.getBoundingClientRect().height ?? 0;
      setFooterVisible(footer.getBoundingClientRect().top <= headerHeight + 1);
    };
    updateFooterVisibility();
    window.addEventListener("scroll", updateFooterVisibility, { passive: true });
    window.addEventListener("resize", updateFooterVisibility);
    return () => {
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const navigation = navigationRef.current;
    const focusableElements = navigation
      ? Array.from(
          navigation.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];

    focusableElements[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header
      className="site-header"
      data-footer-visible={footerVisible && !open}
      inert={footerVisible && !open}
      data-menu-open={open}
      data-overlay={overlaysHero}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-logo" aria-label="ETÉRA home">
          <Image
            alt="ETÉRA Creative Atelier"
            className="site-logo__red"
            src="/design/assets/logo-etera-red.svg"
            width={177}
            height={80}
            unoptimized
          />
          <Image
            alt=""
            aria-hidden="true"
            className="site-logo__milk"
            src="/design/assets/logo-etera-white.svg"
            width={177}
            height={80}
            unoptimized
          />
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="menu-button"
          onClick={() => setOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <MenuGlyph open={open} />
        </button>

        <nav
          aria-label="Main navigation"
          className="site-nav"
          data-open={open}
          id="site-navigation"
          ref={navigationRef}
        >
          <div className="site-nav__links">
            {primaryNavigation.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className="site-nav__link"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Link
            className="site-nav__action"
            href="/contact#inquiry"
            onClick={() => setOpen(false)}
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
