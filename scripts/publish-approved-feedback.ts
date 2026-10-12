import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { getPayload } from 'payload';
import config from '../src/payload.config';

assert.ok(['0','1'].includes(process.env.PAYLOAD_CLOUDFLARE_LOCAL ?? ''), 'Choose explicit local or remote bindings.');
const payload = await getPayload({ config });
const home = await payload.findGlobal({ slug: 'home-page', depth: 0, draft: true });
const atelier = await payload.findGlobal({ slug: 'atelier-page', depth: 0, draft: true });
assert.notEqual(home._status, 'draft', 'Publish or resolve existing Home draft first.');
assert.notEqual(atelier._status, 'draft', 'Publish or resolve existing Atelier draft first.');
const approved = new Map([
  ['Discover', 'Understand the brand, audience and context.'],
  ['Define', 'Set the strategic direction and creative brief.'],
  ['Create', 'Develop the identity, content and experiences.'],
  ['Elevate', 'Refine and bring the work into the world.'],
]);
const steps = atelier.methodSteps ?? [];
assert.equal(steps.length, 4);
assert.equal(new Set(steps.map(step => step.label)).size, 4);
for (const step of steps) {
  assert.ok(approved.has(step.label));
  assert.ok(!step.description?.trim() || step.description === approved.get(step.label), `Review existing custom copy for ${step.label}.`);
}
const target = process.env.PAYLOAD_CLOUDFLARE_LOCAL === '1' ? 'local' : 'production';
await writeFile(`/tmp/etera-feedback-content-before-${target}.json`, JSON.stringify({ homeImage: home.atelierPreviewImage, methodSteps: steps }), { mode: 0o600 });
const mediaIds = [];
for (const [filename, alt] of [
  ['etera-moodboard-color.webp', 'The ETÉRA founders discussing creative direction at their studio moodboard'],
  ['etera-moodboard-monochrome.webp', 'Black-and-white photograph of the ETÉRA founders at their studio moodboard'],
]) {
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 });
  let media = existing.docs[0];
  if (!media) {
    const data = await readFile(`public/media/${filename}`);
    media = await payload.create({ collection: 'media', data: { alt }, file: { data, mimetype: 'image/webp', name: filename, size: data.length } });
  }
  mediaIds.push(media.id);
}
await payload.updateGlobal({ slug: 'home-page', data: { atelierPreviewImage: mediaIds[0], _status: 'published' } });
await payload.updateGlobal({ slug: 'atelier-page', data: { methodSteps: steps.map(step => ({ ...step, description: approved.get(step.label)! })), _status: 'published' } });
const savedHome = await payload.findGlobal({ slug: 'home-page', draft: false, depth: 0 });
const savedAtelier = await payload.findGlobal({ slug: 'atelier-page', draft: false, depth: 0 });
assert.equal(savedHome.atelierPreviewImage, mediaIds[0]);
for (const step of savedAtelier.methodSteps ?? []) assert.equal(step.description, approved.get(step.label));
console.log(`Approved Method descriptions and color Home photo published to ${target}; monochrome alternative available in Media.`);
process.exit(0);
