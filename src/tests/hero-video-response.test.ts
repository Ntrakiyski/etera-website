import assert from "node:assert/strict";
import test from "node:test";
import { heroVideoResponse } from "../lib/hero-video-response.ts";

function bucket() {
  const bytes = new TextEncoder().encode("0123456789");
  let reads = 0;
  return {
    get reads() { return reads; },
    head: async () => ({ size: bytes.length, httpEtag: '"v1"', uploaded: new Date("2026-10-12T00:00:00Z") }),
    get: async (_key: string, options?: { range: { offset: number; length: number } }) => {
      reads++;
      const range = options?.range;
      return { body: range ? bytes.slice(range.offset, range.offset + range.length) : bytes };
    },
  };
}

async function request(headers: HeadersInit = {}, method = "GET") {
  const store = bucket();
  const response = await heroVideoResponse(new Request("https://example.com/api/hero-video", { headers, method }), store as unknown as Pick<R2Bucket, "head" | "get">);
  return { response, store };
}

test("video serves full GET and metadata-only HEAD", async () => {
  const { response } = await request();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("accept-ranges"), "bytes");
  assert.equal(await response.text(), "0123456789");
  const head = await request({}, "HEAD");
  assert.equal(head.store.reads, 0);
  assert.equal(head.response.headers.get("content-length"), "10");
  assert.equal(await head.response.text(), "");
});

test("video supports bounded, open-ended and suffix ranges", async () => {
  for (const [range, text, contentRange] of [
    ["bytes=0-1", "01", "bytes 0-1/10"],
    ["bytes=8-", "89", "bytes 8-9/10"],
    ["bytes=-3", "789", "bytes 7-9/10"],
    ["bytes=7-99", "789", "bytes 7-9/10"],
  ]) {
    const { response } = await request({ Range: range });
    assert.equal(response.status, 206);
    assert.equal(response.headers.get("content-range"), contentRange);
    assert.equal(response.headers.get("content-length"), String(text.length));
    assert.equal(await response.text(), text);
  }
});

test("video rejects unsatisfiable ranges and honors If-Range", async () => {
  for (const range of ["bytes=10-", "bytes=4-2", "bytes=-0"]) {
    const { response, store } = await request({ Range: range });
    assert.equal(response.status, 416);
    assert.equal(response.headers.get("content-range"), "bytes */10");
    assert.equal(store.reads, 0);
  }
  const mismatch = await request({ Range: "bytes=0-1", "If-Range": '"old"' });
  assert.equal(mismatch.response.status, 200);
  const match = await request({ Range: "bytes=0-1", "If-Range": '"v1"' });
  assert.equal(match.response.status, 206);
  const malformed = await request({ Range: "bytes=0-1,4-5" });
  assert.equal(malformed.response.status, 200);
});
