import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const compiled = ts.transpileModule(
  readFileSync(new URL("../components/MethodSequence.tsx", import.meta.url), "utf8"),
  { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } },
).outputText;
const exports: { MethodSequence?: (props: { steps: { label: string; description: string }[] }) => ReturnType<typeof createElement> } = {};
runInNewContext(compiled, { exports, require: createRequire(import.meta.url) });
const MethodSequence = exports.MethodSequence!;

test("Method expands only approved descriptions and leaves empty steps as readable labels", () => {
  const html = renderToStaticMarkup(createElement(MethodSequence, {
    steps: [
      { label: "Discover", description: "Approved discovery description." },
      { label: "Define", description: "" },
      { label: "Create", description: "  " },
    ],
  }));
  assert.equal((html.match(/<details>/g) ?? []).length, 1);
  assert.match(html, /<summary>.*Discover.*<\/summary>/);
  assert.match(html, /Approved discovery description\./);
  assert.match(html, /method-sequence__label.*Define/);
  assert.match(html, /method-sequence__label.*Create/);
  assert.doesNotMatch(html, /<details open/);
});

test("Method escapes CMS descriptions rather than rendering HTML", () => {
  const html = renderToStaticMarkup(createElement(MethodSequence, {
    steps: [{ label: "<Discover>", description: "<script>alert('test')</script>" }],
  }));
  assert.match(html, /&lt;Discover&gt;/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
});
