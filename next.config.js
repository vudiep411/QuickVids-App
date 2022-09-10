/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GOOGLE_TOKEN: process.env.GOOGLE_TOKEN,
    SANITY_TOKEN: process.env.SANITY_TOKEN,
    PUBLIC_URL: process.env.PUBLIC_URL
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'cdn.sanity.io'
    ]
  }
}

module.exports = nextConfig
