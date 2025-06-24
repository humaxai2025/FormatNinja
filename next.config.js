/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true, // Enable the app directory
  },
  images: {
    domains: [],
  },
}

module.exports = nextConfig