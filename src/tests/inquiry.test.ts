import assert from "node:assert/strict";
import { inquiryIndustries } from "../lib/inquiry-industries.ts";
import { validateInquiry } from "../lib/inquiry-validation.ts";

const draft = {
  name: "Niki",
  email: "niki@example.com",
  services: ["Brand Strategy", "Creative Direction"],
  project: "A launch",
  brand: "",
  budget: "",
  additional: "",
};
assert.deepEqual(validateInquiry(draft), {});
assert.deepEqual(
  Object.keys(
    validateInquiry({
      ...draft,
      name: " \n",
      email: "wrong@",
      services: [],
      project: "\t",
    }),
  ),
  ["name", "email", "services", "project"],
);
assert.deepEqual(
  validateInquiry({ ...draft, email: " niki@example.com " }),
  {},
);
assert.equal(inquiryIndustries.length, 14);
assert.equal(new Set(inquiryIndustries).size, 14);
assert.deepEqual(validateInquiry({ ...draft, industry: "" }), {});
for (const industry of inquiryIndustries) {
  assert.deepEqual(validateInquiry({ ...draft, industry }), {});
}
assert.equal(validateInquiry({ ...draft, industry: "Unrecognized" }).industry, "Choose a valid industry.");
console.log("Inquiry validation checks passed.");
