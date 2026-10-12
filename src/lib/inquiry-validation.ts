import { inquiryIndustries } from "./inquiry-industries.ts";

export type InquiryDraft = {
  additional: string;
  brand: string;
  budget: string;
  email: string;
  industry?: string;
  name: string;
  project: string;
  services: string[];
};

export type InquiryErrors = Partial<Record<keyof InquiryDraft, string>>;

export function validateInquiry(draft: InquiryDraft): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!draft.name.trim()) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!draft.services.length) errors.services = "Select at least one service.";
  if (!draft.project.trim()) errors.project = "Tell us about your project.";
  if (draft.industry?.trim() && !inquiryIndustries.includes(draft.industry.trim())) {
    errors.industry = "Choose a valid industry.";
  }
  return errors;
}
