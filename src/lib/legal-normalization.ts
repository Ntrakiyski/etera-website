import type { SerializedEditorState, SerializedLexicalNode } from "lexical";

type LegalBody = SerializedEditorState<SerializedLexicalNode & Record<string, unknown>> & Record<string, unknown>;

export type LegalBlocks = { kind: string; text: string }[];
export type LegalContent = { title: string; body: LegalBody };

export function legalBlocksToBody(blocks: LegalBlocks): LegalBody {
  const children: LegalBody["root"]["children"] = [];
  const textChildren = (text: string) => text.split("\n").flatMap((line, index) => [
    ...(index ? [{ type: "linebreak", version: 1 }] : []),
    { type: "text", version: 1, text: line, detail: 0, format: 0, mode: "normal", style: "" },
  ]);
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const base = { direction: null, format: "", indent: 0, version: 1 };
    if (block.kind === "item") {
      const items = [];
      do {
        items.push({ ...base, type: "listitem", value: items.length + 1, children: textChildren(blocks[i].text) });
        if (blocks[i + 1]?.kind !== "item") break;
        i++;
      } while (i < blocks.length);
      children.push({ ...base, type: "list", listType: "bullet", start: 1, tag: "ul", children: items });
    } else {
      children.push({
        ...base,
        type: block.kind === "heading" || block.kind === "subheading" ? "heading" : "paragraph",
        ...(block.kind === "heading" ? { tag: "h2" } : block.kind === "subheading" ? { tag: "h3" } : {}),
        children: textChildren(block.text),
      });
    }
  }
  return { root: { type: "root", version: 1, direction: null, format: "", indent: 0, children } };
}

export function normalizeLegalContent(value: unknown, fallback: LegalContent): LegalContent {
  const page = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const body = page.body as LegalBody | null | undefined;
  return {
    title: typeof page.title === "string" && page.title.trim() ? page.title : fallback.title,
    body: body?.root?.type === "root" && Array.isArray(body.root.children) ? body : fallback.body,
  };
}
