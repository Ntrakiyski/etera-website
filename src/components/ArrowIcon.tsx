export function ArrowIcon({ direction = "right" }: { direction?: "down" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      {direction === "right" ? (
        <>
          <path d="M4 12h15" />
          <path d="m14 7 5 5-5 5" />
        </>
      ) : (
        <>
          <path d="M12 4v15" />
          <path d="m7 14 5 5 5-5" />
        </>
      )}
    </svg>
  );
}
