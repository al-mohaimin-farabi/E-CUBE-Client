import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', '@xyflow/react'],
  },
  reactCompiler: true,
};

export default nextConfig;
