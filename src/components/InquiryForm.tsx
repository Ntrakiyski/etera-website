"use client";

import { useMemo, useState } from "react";

const serviceOptions = [
  "Brand Strategy",
  "Brand Identity",
  "Creative Direction",
  "Campaigns",
  "Social Media",
  "Content Production",
  "Influencer Marketing",
  "PR & Communications",
  "Events & Experiences",
  "Partnerships",
  "Performance Marketing",
  "Email Marketing & CRM",
  "Website / Landing Page",
  "Other",
];

type InquiryDraft = {
  additional: string;
  brand: string;
  budget: string;
  email: string;
  name: string;
  project: string;
  service: string;
};

const emptyDraft: InquiryDraft = {
  additional: "",
  brand: "",
  budget: "",
  email: "",
  name: "",
  project: "",
  service: "",
};

function buildMailto(recipient: string, draft: InquiryDraft) {
  const subject = `Project inquiry from ${draft.name}${draft.brand ? `, ${draft.brand}` : ""}`;
  const body = [
    `Full name: ${draft.name}`,
    `Company / Brand: ${draft.brand || "Not provided"}`,
    `Email: ${draft.email}`,
    `What can we help with?: ${draft.service}`,
    `Budget: ${draft.budget || "Not provided"}`,
    "",
    "Project details:",
    draft.project,
    "",
    "Additional information:",
    draft.additional || "Not provided",
  ].join("\n");

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function InquiryForm({ email }: { email: string }) {
  const [draft, setDraft] = useState<InquiryDraft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const mailto = useMemo(() => buildMailto(email, draft), [draft, email]);

  function update(field: keyof InquiryDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setReady(false);
  }

  return (
    <form
      className="inquiry-form"
      id="inquiry"
      onSubmit={(event) => {
        event.preventDefault();
        setReady(true);
      }}
    >
      <div className="inquiry-form__intro">
        <h2>Tell us what you are shaping.</h2>
        <p>
          Direct form delivery is awaiting ETÉRA&apos;s workflow decision. For
          this draft, the form prepares a complete email without sending or
          storing your information.
        </p>
      </div>

      <div className="inquiry-form__fields">
        <label>
          <span>Full Name</span>
          <input
            autoComplete="name"
            name="name"
            onChange={(event) => update("name", event.target.value)}
            required
            value={draft.name}
          />
        </label>
        <label>
          <span>Company / Brand</span>
          <input
            autoComplete="organization"
            name="brand"
            onChange={(event) => update("brand", event.target.value)}
            value={draft.brand}
          />
        </label>
        <label>
          <span>Email Address</span>
          <input
            autoComplete="email"
            name="email"
            onChange={(event) => update("email", event.target.value)}
            required
            type="email"
            value={draft.email}
          />
        </label>
        <label>
          <span>What can we help with?</span>
          <select
            name="service"
            onChange={(event) => update("service", event.target.value)}
            required
            value={draft.service}
          >
            <option disabled value="">
              Select a focus
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="inquiry-form__wide">
          <span>Tell us about the project</span>
          <textarea
            name="project"
            onChange={(event) => update("project", event.target.value)}
            required
            rows={5}
            value={draft.project}
          />
        </label>
        <label>
          <span>Budget (optional)</span>
          <input
            name="budget"
            onChange={(event) => update("budget", event.target.value)}
            value={draft.budget}
          />
        </label>
        <label>
          <span>Additional information (optional)</span>
          <input
            name="additional"
            onChange={(event) => update("additional", event.target.value)}
            value={draft.additional}
          />
        </label>
      </div>

      <div aria-live="polite" className="inquiry-form__actions">
        <button className="primary-action" type="submit">
          Send Inquiry
        </button>
        {ready ? (
          <div className="inquiry-form__ready" role="status">
            <p>
              Your inquiry draft is ready. Open it in your email app and send
              it to complete the inquiry.
            </p>
            <a className="editorial-link" href={mailto}>
              Open email draft
            </a>
          </div>
        ) : null}
      </div>
    </form>
  );
}
