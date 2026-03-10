import type { NextConfig } from "next";

const host = process.env.NEXT_PUBLIC_DOMAIN || "localhost";

const protocols = ["http", "https"] as const;

const hosts = [host, "tascen.site"];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: protocols.flatMap((protocol) =>
      hosts.map((hostname) => ({
        protocol,
        hostname,
        pathname: "/**",
      }))
    ),
  },
};

export default nextConfig;
