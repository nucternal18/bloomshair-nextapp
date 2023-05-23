const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
  buildExcludes: [/middleware-manifest\.json$/, /_middleware\.js$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    appDir: true,
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
