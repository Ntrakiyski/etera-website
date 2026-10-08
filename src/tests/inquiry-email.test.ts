import assert from "node:assert/strict";
import test from "node:test";
import { buildInquiryEmail } from "../lib/inquiry-email.ts";

const draft = {
  name: "Ali", email: "ali@example.com", brand: "My brand", budget: "€5,000",
  services: ["Brand strategy", "Creative direction"], project: "New launch\nIn Sofia", additional: "Next month",
};

test("branded email includes all submitted details and a complete plain-text version", () => {
  const email = buildInquiryEmail(draft);
  for (const value of [draft.name, draft.email, draft.brand, draft.budget, ...draft.services, draft.additional]) {
    assert.ok(email.html.includes(value));
    assert.ok(email.text.includes(value));
  }
  assert.ok(email.html.includes("New launch<br>In Sofia"));
  assert.ok(email.text.includes(draft.project));
  assert.ok(email.html.includes("https://etera.trakiyski.work/email-logo-etera-red.png"));
  assert.ok(email.html.includes("max-width:620px"));
  assert.ok(email.html.includes("#741018"));
  assert.ok(email.html.includes("#f9f4f4"));
  assert.ok(!email.html.includes("ystoyanova@"));
  assert.ok(!email.html.includes("adjurdjevic@"));
});

test("escapes every visitor field and sanitises the subject", () => {
  const unsafe = '<script>alert("x")</script>&\'test\'';
  const email = buildInquiryEmail({ ...draft, name: "Ali\r\nBcc: victim@example.com", project: unsafe, brand: unsafe, services: [unsafe], budget: unsafe, additional: unsafe });
  assert.ok(!email.html.includes("<script>"));
  assert.ok(email.html.includes("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;&amp;&#39;test&#39;"));
  assert.ok(email.text.includes(unsafe));
  assert.ok(!/[\r\n]/.test(email.subject));
  assert.ok(email.subject.length < 150);
});

test("omits blank optional fields", () => {
  const email = buildInquiryEmail({ ...draft, brand: " ", budget: "", additional: "\n" });
  for (const label of ["Brand / organisation", "Budget", "Additional details"]) {
    assert.ok(!email.html.includes(label));
    assert.ok(!email.text.includes(label));
  }
});
