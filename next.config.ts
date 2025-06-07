/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuración para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/CodeFaker' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/CodeFaker/' : '',
};

module.exports = nextConfig
