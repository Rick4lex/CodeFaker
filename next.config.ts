
/** @type {import('next').NextConfig} */

const nextConfig: import('next').NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
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
      { // Added for Firebase Storage if you use it for user avatars or product images
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
      { // Added for Vercel avatar service (used in dummy comments)
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**',
      }
    ],
    // Vercel optimizes images by default, so `unoptimized: true` is not needed
    // and was removed in a previous step. If it's still here, ensure it's false or removed.
  },
  typescript: {
    ignoreBuildErrors: false, // Set to true temporarily if type errors block build during development
  },
  eslint: {
    ignoreDuringBuilds: true, // Set to false for stricter builds
  },
  // output: 'export', // This line was causing issues with Server Actions for Vercel deployment.
  // Vercel will handle the output mode correctly by default.
  // For Vercel, you generally don't need to specify `output: 'export'` unless you are certain you only want a static site.
  // Server Actions (like in `src/lib/actions.ts`) require a Node.js environment, not compatible with pure static export.
};

module.exports = nextConfig;
