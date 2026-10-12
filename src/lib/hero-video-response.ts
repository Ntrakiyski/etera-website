const heroVideoKey = "site/etera-hero-20261012.mp4";

export async function heroVideoResponse(request: Request, bucket: Pick<R2Bucket, "head" | "get">) {
  const metadata = await bucket.head(heroVideoKey);
  if (!metadata) return new Response("Video unavailable", { status: 404 });
  const headers = new Headers({
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
    "ETag": metadata.httpEtag,
    "Last-Modified": metadata.uploaded.toUTCString(),
    "Content-Length": String(metadata.size),
  });
  if (request.method === "HEAD") return new Response(null, { headers });

  const ifRange = request.headers.get("if-range");
  const matches = !ifRange || ifRange === metadata.httpEtag ||
    (!ifRange.startsWith('"') && Date.parse(ifRange) >= Math.floor(metadata.uploaded.getTime() / 1000) * 1000);
  const range = matches ? /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "") : null;
  let start = 0;
  let end = metadata.size - 1;
  if (range && (range[1] || range[2])) {
    start = range[1] ? Number(range[1]) : Math.max(0, metadata.size - Number(range[2]));
    end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= metadata.size) {
      headers.set("Content-Range", `bytes */${metadata.size}`);
      headers.set("Content-Length", "0");
      return new Response(null, { status: 416, headers });
    }
  }
  // Ignore malformed/multiple ranges; a full response is allowed by HTTP.
  const partial = Boolean(range && (range[1] || range[2]));
  const object = await bucket.get(heroVideoKey, partial ? { range: { offset: start, length: end - start + 1 } } : undefined);
  if (!object || !("body" in object)) return new Response("Video unavailable", { status: 503 });
  if (partial) {
    headers.set("Content-Range", `bytes ${start}-${end}/${metadata.size}`);
    headers.set("Content-Length", String(end - start + 1));
  }
  return new Response(object.body, { status: partial ? 206 : 200, headers });
}
