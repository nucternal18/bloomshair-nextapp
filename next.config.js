const { withSentryConfig } = require("@sentry/nextjs");
const withTm = require("next-transpile-modules")([
  "@square/web-sdk",
  "react-square-web-payments-sdk",
]);
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
const nextConfig = withTm({
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
  swcMinify: true,
});

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  hideSourceMaps: true,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
  withPWA(nextConfig),
  sentryWebpackPluginOptions
);
