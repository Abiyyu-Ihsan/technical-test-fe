/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  env: {
    API_URL: process.env.API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  images: {
    domains: ["/icons/*"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false
};

module.exports = nextConfig;
