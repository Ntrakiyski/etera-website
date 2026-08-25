import type {
  PartnerSummary,
  PersonSummary,
  ProjectSummary,
} from "./cms";

// These records are documented in docs/cms-validation.md as permanent
// end-to-end validation fixtures. They remain editable in Payload, but must not
// be presented to a client as portfolio, partner or team proof.
const VALIDATION_PROJECT_SLUGS = new Set(["etera-digital-atelier"]);
const VALIDATION_PERSON_NAMES = new Set(["ETÉRA Creative Team"]);
const VALIDATION_PARTNER_NAMES = new Set(["ETÉRA Creative Network"]);
const VALIDATION_PROJECT_IDS = new Set([
  "1df42de2-257b-4163-8fb1-9c1782bc30fe",
]);
const VALIDATION_PERSON_IDS = new Set([
  "4b0a6ba7-e241-4aa0-b4be-faca7c1ffe2d",
]);
const VALIDATION_PARTNER_IDS = new Set([
  "0e6add21-9ec3-4a25-92c2-cc39cf6dda3e",
]);

export function isLaunchReadyProject(project: ProjectSummary) {
  return Boolean(
    project.heroImage &&
      !VALIDATION_PROJECT_IDS.has(project.id) &&
      !VALIDATION_PROJECT_SLUGS.has(project.slug),
  );
}

export function isLaunchReadyPerson(person: PersonSummary) {
  return Boolean(
    person.portrait &&
      person.bio &&
      !VALIDATION_PERSON_IDS.has(person.id) &&
      !VALIDATION_PERSON_NAMES.has(person.name),
  );
}

export function isLaunchReadyPartner(partner: PartnerSummary) {
  return Boolean(
    partner.logo &&
      !VALIDATION_PARTNER_IDS.has(partner.id) &&
      !VALIDATION_PARTNER_NAMES.has(partner.name),
  );
}
