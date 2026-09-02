const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
