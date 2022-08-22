/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src/components/', 'src/lib/', 'src/pages/'],
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
