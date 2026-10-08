import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Local Wrangler processes share SQLite state; serialize offline build workers.
    ...(process.env.PAYLOAD_CLOUDFLARE_LOCAL === "1" ? { cpus: 1 } : {}),
    globalNotFound: true,
  },
  images: {
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
      {
        pathname: "/design/assets/**",
      },
      {
        pathname: "/media/**",
      },
    ],
  },
  outputFileTracingExcludes: {
    "**/*": ["next/dist/compiled/@vercel/og/**/*"],
  },
  serverExternalPackages: ["jose", "pg-cloudflare"],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
