# Impeccable Workflow For This Repo

This repo follows the design workflow from [pbakaus/impeccable](https://github.com/pbakaus/impeccable), inspected at commit `78b50aa4160616fa12c465a571ac39a0819c434d` on August 25, 2026.

We are using Impeccable as process discipline, not as an aesthetic. Do not copy Impeccable's Neo Kinpaku visual style into ETÉRA.

## What We Adopt

- `PRODUCT.md` for durable product truth.
- `DESIGN.md` for formal design tokens and design rules.
- Surface modes: Persuade, Operate, Read, Experience.
- Named anti-patterns and finish checks.
- Bounded visual QA: inspect desktop and mobile, fix in batches, then stop.

## Local Workflow

Before changing public UI:

1. Read `PRODUCT.md`.
2. Read `DESIGN.md`.
3. Read `design/page-briefs.md` for the target page.
4. Use `design/tokens.css` or the matching values in `src/app/globals.css`.
5. Apply `design/quality-checklist.md` before finishing.

## Tooling Status

The Impeccable detector hook is not installed in this repo yet. The GitHub repo source is present in the referenced upstream, but the installable provider `dist/` output is generated at build time and was not present in the cloned snapshot.

If we decide to add the hook later, use the current upstream install path deliberately, verify the generated files, and commit that as a separate tooling change.
