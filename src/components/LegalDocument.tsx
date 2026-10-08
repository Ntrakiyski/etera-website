import Link from "next/link";

type Block = { kind: string; text: string };

export function LegalDocument({ title, blocks }: { title: string; blocks: Block[] }) {
  const sections: React.ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.kind === "item") {
      const items: string[] = [block.text];
      while (blocks[i + 1]?.kind === "item") items.push(blocks[++i].text);
      sections.push(<ul key={i}>{items.map((text, index) => <li key={index}>{text}</li>)}</ul>);
    } else if (block.kind === "heading") {
      sections.push(<h2 key={i}>{block.text}</h2>);
    } else if (block.kind === "subheading") {
      sections.push(<h3 key={i}>{block.text}</h3>);
    } else {
      sections.push(<p key={i}>{block.text}</p>);
    }
  }
  return (
    <main id="main-content" className="legal-document">
      <article>
        <h1>{title}</h1>
        {sections}
      </article>
      <nav aria-label="Related policies" className="legal-document__links">
        <Link href="/terms-and-conditions">Website Terms of Use</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/cookie-policy">Cookie Policy</Link>
      </nav>
    </main>
  );
}
