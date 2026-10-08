import assert from "node:assert/strict";
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
console.log("Inquiry validation checks passed.");
