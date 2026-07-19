import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/^\/+|\/+$/g, "");
const basePath = configuredBasePath ? `/${configuredBasePath}` : "";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? basePath : undefined,
  trailingSlash: isGitHubPages,
  images: { unoptimized: isGitHubPages },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
