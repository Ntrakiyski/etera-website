export type InquiryDraft = {
  additional: string;
  brand: string;
  budget: string;
  email: string;
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
  return errors;
}
