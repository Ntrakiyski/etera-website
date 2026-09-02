type SocialIconProps = {
  label: string;
};

export function SocialIcon({ label }: SocialIconProps) {
  const name = label.toLowerCase();

  if (name.includes("instagram")) {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <rect height="18" rx="5" width="18" x="3" y="3" />
        <circle cx="12" cy="12" r="4.1" />
        <circle className="social-icon__fill" cx="17.4" cy="6.7" r="1" />
      </svg>
    );
  }

  if (name.includes("facebook")) {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <path d="M14.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.8-.1-1.7-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2H8v3h2.8v8h3.4Z" />
      </svg>
    );
  }

  if (name.includes("linkedin")) {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <circle className="social-icon__fill" cx="8" cy="8" r="1.25" />
        <path d="M7 10.5V17M11 17v-6.5M11 13.3c.6-1.8 5-2.4 5 1.1V17" />
      </svg>
    );
  }

  if (name.includes("tiktok")) {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <path d="M14 4v10.2a4.2 4.2 0 1 1-3.2-4.1M14 4c.6 2.8 2.2 4.3 5 4.6" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5S14.3 18.1 12 20.5M12 3.5C9.7 5.9 8.5 8.7 8.5 12s1.2 6.1 3.5 8.5" />
    </svg>
  );
}
