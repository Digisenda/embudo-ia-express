import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // ⬇️ Desactivar ESLint en builds (sin afectar el dev)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
