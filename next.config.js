/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['images.microcms-assets.io'],
    // domains: ['images.unsplash.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.microcms-assets.io',
    //     port: '',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
