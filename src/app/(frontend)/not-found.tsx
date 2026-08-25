import Link from "next/link";

import { ArrowIcon } from "@/components/ArrowIcon";

export default function NotFound() {
  return (
    <main className="route-not-found" id="main-content" tabIndex={-1}>
      <div>
        <p>Error / 404</p>
        <h1>The missing element isn’t here.</h1>
      </div>
      <div className="route-not-found__aside">
        <p>The page you’re looking for could not be found.</p>
        <Link className="editorial-link" href="/">
          <span>Return to ETÉRA</span>
          <ArrowIcon />
        </Link>
      </div>
    </main>
  );
}
