/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Isse production build mein saari TypeScript errors ignore ho jayengi
    ignoreBuildErrors: true,
  },
};

export default nextConfig;