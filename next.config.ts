import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  // output: "export", // Generasi folder .next/standalone
  // reactStrictMode: true,
};

export default withFlowbiteReact(nextConfig);
