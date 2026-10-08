import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { legalBlocksToBody, normalizeLegalContent } from "../lib/legal-normalization.ts";

const approved = { title: "Approved policy", body: legalBlocksToBody([{ kind: "paragraph", text: "Approved text" }]) };

test("partial legal groups retain approved title and body; intentional empty body remains", () => {
  for (const value of [null, undefined, {}, { title: " " }, { body: null }, { body: { root: {} } }]) {
    assert.deepEqual(normalizeLegalContent(value, approved), approved);
  }
  assert.deepEqual(normalizeLegalContent({ title: "Edited" }, approved), { ...approved, title: "Edited" });
  const empty = legalBlocksToBody([]);
  assert.deepEqual(normalizeLegalContent({ body: empty }, approved).body, empty);
});

test("approved legal documents preserve every line and heading/list structure in rich text", () => {
  for (const name of ["terms-and-conditions", "privacy-policy", "cookie-policy"]) {
    const document = JSON.parse(readFileSync(new URL(`../content/legal/${name}.json`, import.meta.url), "utf8"));
    const body = legalBlocksToBody(document.blocks);
    const recovered: { kind: string; text: string }[] = [];
    for (const node of body.root.children) {
      const element = node as unknown as { type: string; tag?: string; children: { type: string; text?: string; children?: { type: string; text?: string }[] }[] };
      const text = (nodes: { type: string; text?: string }[]) => nodes.map((child) => child.type === "linebreak" ? "\n" : child.text ?? "").join("");
      if (element.type === "list") {
        for (const item of element.children) recovered.push({ kind: "item", text: text(item.children!) });
      } else {
        recovered.push({ kind: element.tag === "h2" ? "heading" : element.tag === "h3" ? "subheading" : "paragraph", text: text(element.children) });
      }
    }
    assert.deepEqual(recovered, document.blocks);
  }
});
