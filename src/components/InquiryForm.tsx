"use client";

import { useRef, useState } from "react";

import { InquiryTurnstile } from "@/components/InquiryTurnstile";

import type { InquiryLabels } from "@/lib/cms";
import {
  validateInquiry,
  type InquiryDraft,
  type InquiryErrors,
} from "@/lib/inquiry-validation";

type InquiryTextField = Exclude<keyof InquiryDraft, "services">;

const emptyDraft: InquiryDraft = {
  additional: "",
  brand: "",
  budget: "",
  email: "",
  name: "",
  project: "",
  services: [],
};

export function InquiryForm({
  email,
  labels,
  serviceOptions,
  siteKey,
}: {
  email: string;
  labels: InquiryLabels;
  serviceOptions: string[];
  siteKey: string;
}) {
  const [draft, setDraft] = useState<InquiryDraft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [website, setWebsite] = useState("");
  const submissionId = useRef<string | null>(null);
  const inFlight = useRef(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationReset, setVerificationReset] = useState(0);

  function changed() {
    submissionId.current = null;
    setReady(false);
    setSendError("");
  }

  function update(field: InquiryTextField, value: string) {
    const next = { ...draft, [field]: value };
    setDraft(next);
    if (errors[field])
      setErrors((current) => ({
        ...current,
        [field]: validateInquiry(next)[field],
      }));
    changed();
  }

  function updateService(service: string, checked: boolean) {
    setDraft((current) => ({
      ...current,
      services: checked
        ? [...current.services, service]
        : current.services.filter((item) => item !== service),
    }));
    changed();
    setErrors((current) => ({ ...current, services: undefined }));
  }

  return (
    <form
      className="inquiry-form"
      id="inquiry"
      noValidate
      aria-busy={sending}
      onSubmit={async (event) => {
        event.preventDefault();
        if (inFlight.current || ready) return;

        const nextErrors = validateInquiry(draft);
        setErrors(nextErrors);
        const firstInvalid = Object.keys(nextErrors)[0];
        if (firstInvalid) {
          event.currentTarget
            .querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
            ?.focus();
          return;
        }
        if (!turnstileToken) {
          setSendError(labels.verificationError);
          return;
        }
        submissionId.current ??= crypto.randomUUID();
        inFlight.current = true;
        setSending(true);
        setSendError("");
        try {
          const response = await fetch("/api/inquiry", {
            method: "POST",
            signal: AbortSignal.timeout(30000),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...draft, submissionId: submissionId.current, website, turnstileToken }),
          });
          const result = await response.json().catch(() => null) as { success?: boolean; code?: string } | null;
          if (!response.ok || result?.success !== true) {
            setSendError(response.status === 429
              ? labels.rateLimitError
              : result?.code === "verification" ? labels.verificationError : labels.sendError);
            return;
          }
          setReady(true);
        } catch {
          setSendError(labels.sendError);
        } finally {
          inFlight.current = false;
          setSending(false);
          setTurnstileToken("");
          setVerificationReset((value) => value + 1);
        }
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </label>
      </div>
      <div className="inquiry-form__intro">
        <h2>{labels.heading}</h2>
        <p>{labels.help}</p>
      </div>

      <div className="inquiry-form__fields">
        <label>
          <span>{labels.name}</span>
          <input
            disabled={sending}
            autoComplete="name"
            aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            name="name"
            maxLength={120}
            onChange={(event) => update("name", event.target.value)}
            required
            value={draft.name}
          />
          {errors.name ? (
            <span
              className="inquiry-form__error"
              id="inquiry-name-error"
              role="alert"
            >
              {labels.nameError}
            </span>
          ) : null}
        </label>
        <label>
          <span>{labels.brand}</span>
          <input
            disabled={sending}
            autoComplete="organization"
            name="brand"
            maxLength={200}
            onChange={(event) => update("brand", event.target.value)}
            value={draft.brand}
          />
        </label>
        <label>
          <span>{labels.email}</span>
          <input
            disabled={sending}
            autoComplete="email"
            aria-describedby={errors.email ? "inquiry-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            name="email"
            maxLength={254}
            onChange={(event) => update("email", event.target.value)}
            required
            type="email"
            value={draft.email}
          />
          {errors.email ? (
            <span
              className="inquiry-form__error"
              id="inquiry-email-error"
              role="alert"
            >
              {labels.emailError}
            </span>
          ) : null}
        </label>
        <fieldset
          disabled={sending}
          aria-describedby={
            errors.services ? "service-choice-error" : undefined
          }
          aria-invalid={Boolean(errors.services)}
          className="inquiry-form__services inquiry-form__wide"
        >
          <legend>
            {labels.services}
            <span>{labels.servicesHelp}</span>
          </legend>
          <div className="inquiry-form__service-options">
            {serviceOptions.map((option) => (
              <label key={option}>
                <input
            disabled={sending}
                  checked={draft.services.includes(option)}
                  name="services"
                  onChange={(event) =>
                    updateService(option, event.target.checked)
                  }
                  type="checkbox"
                  value={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.services ? (
            <p
              className="inquiry-form__error"
              id="service-choice-error"
              role="alert"
            >
              {labels.servicesError}
            </p>
          ) : null}
        </fieldset>
        <label className="inquiry-form__wide">
          <span>{labels.project}</span>
          <textarea
            disabled={sending}
            aria-describedby={
              errors.project ? "inquiry-project-error" : undefined
            }
            aria-invalid={Boolean(errors.project)}
            name="project"
            maxLength={6000}
            onChange={(event) => update("project", event.target.value)}
            required
            rows={5}
            value={draft.project}
          />
          {errors.project ? (
            <span
              className="inquiry-form__error"
              id="inquiry-project-error"
              role="alert"
            >
              {labels.projectError}
            </span>
          ) : null}
        </label>
        <label>
          <span>{labels.budget}</span>
          <input
            disabled={sending}
            name="budget"
            maxLength={200}
            onChange={(event) => update("budget", event.target.value)}
            value={draft.budget}
          />
        </label>
        <label>
          <span>{labels.additional}</span>
          <input
            disabled={sending}
            name="additional"
            maxLength={3000}
            onChange={(event) => update("additional", event.target.value)}
            value={draft.additional}
          />
        </label>
      </div>

      {!ready ? <InquiryTurnstile siteKey={siteKey} reset={verificationReset} onToken={setTurnstileToken} /> : null}
      <div aria-live="polite" className="inquiry-form__actions">
        <button className="primary-action" type="submit" disabled={sending || ready}>
          {sending ? labels.sending : labels.submit}
        </button>
        {ready ? (
          <div className="inquiry-form__ready" role="status">
            <p>{labels.ready}</p>
          </div>
        ) : null}
        {sendError ? (
          <div className="inquiry-form__error" role="alert">
            <p>{sendError}</p>
            <a className="editorial-link" href={`mailto:${email}`}>{email}</a>
          </div>
        ) : null}
      </div>
    </form>
  );
}
