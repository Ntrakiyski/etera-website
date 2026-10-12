import { cloudflare } from "@/payload.config";
import { heroVideoResponse } from "@/lib/hero-video-response";

export const dynamic = "force-dynamic";

async function respond(request: Request) {
  try {
    return await heroVideoResponse(request, cloudflare.env.R2);
  } catch {
    return new Response("Video temporarily unavailable", { status: 503 });
  }
}

export const GET = respond;
export const HEAD = respond;
