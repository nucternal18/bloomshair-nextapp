/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.SITE_URL || "https://bloomshair.co.uk";

module.exports = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  // ...other options
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/admin" },
      { userAgent: "*", disallow: "/api" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`], // <==== Add her],
  },
  exclude: ["/api", "/admin", "/server-sitemap.xml"],
};
