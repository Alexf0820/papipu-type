import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev only: allow phones/tablets on the same LAN to load Next.js client bundles.
   * Without this the dev chunks are blocked, React never hydrates, and the quiz
   * choice buttons stop responding even though the page renders.
   * Update the IP to your machine's local address (e.g. from `ipconfig` / `ifconfig`).
   * Example phone URL: http://192.168.11.47:3000/ja/camp-gear
   */
  allowedDevOrigins: ["192.168.11.47"],
};

export default nextConfig;
