/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      }
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true
  },
}

module.exports = nextConfig
