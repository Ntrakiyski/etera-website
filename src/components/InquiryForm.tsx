"use client";

import { useMemo, useState } from "react";

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

function buildMailto(recipient: string, draft: InquiryDraft) {
  const subject = `Project inquiry from ${draft.name}${draft.brand ? `, ${draft.brand}` : ""}`;
  const body = [
    `Full name: ${draft.name}`,
    `Company Name: ${draft.brand || "Not provided"}`,
    `Email: ${draft.email}`,
    `What can we help with?: ${draft.services.join(", ")}`,
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

export function InquiryForm({
  email,
  labels,
  serviceOptions,
}: {
  email: string;
  labels: InquiryLabels;
  serviceOptions: string[];
}) {
  const [draft, setDraft] = useState<InquiryDraft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const mailto = useMemo(() => buildMailto(email, draft), [draft, email]);

  function update(field: InquiryTextField, value: string) {
    const next = { ...draft, [field]: value };
    setDraft(next);
    if (errors[field])
      setErrors((current) => ({
        ...current,
        [field]: validateInquiry(next)[field],
      }));
    setReady(false);
  }

  function updateService(service: string, checked: boolean) {
    setDraft((current) => ({
      ...current,
      services: checked
        ? [...current.services, service]
        : current.services.filter((item) => item !== service),
    }));
    setReady(false);
    setErrors((current) => ({ ...current, services: undefined }));
  }

  return (
    <form
      className="inquiry-form"
      id="inquiry"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();

        const nextErrors = validateInquiry(draft);
        setErrors(nextErrors);
        const firstInvalid = Object.keys(nextErrors)[0];
        if (firstInvalid) {
          event.currentTarget
            .querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
            ?.focus();
          return;
        }
        setDraft((current) => ({
          ...current,
          name: current.name.trim(),
          email: current.email.trim(),
          project: current.project.trim(),
        }));

        setReady(true);
      }}
    >
      <div className="inquiry-form__intro">
        <h2>{labels.heading}</h2>
        <p>{labels.help}</p>
      </div>

      <div className="inquiry-form__fields">
        <label>
          <span>{labels.name}</span>
          <input
            autoComplete="name"
            aria-describedby={errors.name ? "inquiry-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            name="name"
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
            autoComplete="organization"
            name="brand"
            onChange={(event) => update("brand", event.target.value)}
            value={draft.brand}
          />
        </label>
        <label>
          <span>{labels.email}</span>
          <input
            autoComplete="email"
            aria-describedby={errors.email ? "inquiry-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            name="email"
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
            aria-describedby={
              errors.project ? "inquiry-project-error" : undefined
            }
            aria-invalid={Boolean(errors.project)}
            name="project"
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
            name="budget"
            onChange={(event) => update("budget", event.target.value)}
            value={draft.budget}
          />
        </label>
        <label>
          <span>{labels.additional}</span>
          <input
            name="additional"
            onChange={(event) => update("additional", event.target.value)}
            value={draft.additional}
          />
        </label>
      </div>

      <div aria-live="polite" className="inquiry-form__actions">
        <button className="primary-action" type="submit">
          {labels.submit}
        </button>
        {ready ? (
          <div className="inquiry-form__ready" role="status">
            <p>{labels.ready}</p>
            <a className="editorial-link" href={mailto}>
              {labels.openDraft}
            </a>
          </div>
        ) : null}
      </div>
    </form>
  );
}
