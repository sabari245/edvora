/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    transpileOnly: true, // same as ts-node --transpile-only
  },
};

module.exports = nextConfig;
