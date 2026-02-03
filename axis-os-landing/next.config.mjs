/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use project root so Next doesn't pick up parent lockfile (C:\Users\thoma\)
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
};

export default nextConfig;
