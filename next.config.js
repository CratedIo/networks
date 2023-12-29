/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
          { hostname: 'cdn.sanity.io' },
          { hostname: 'source.unsplash.com' },
          { hostname: 'www.verdantix.com' },
        ],
    },
}

module.exports = nextConfig
