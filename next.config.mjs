/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/dash-api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
