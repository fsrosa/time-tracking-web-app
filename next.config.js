/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    VERCEL_URL: process.env.VERCEL_URL,
  },
}

module.exports = nextConfig
