const description =
  "Hair Salon. We sell great hair care products and provide a good hair service";
const title = "Blooms Hair";
const url = "https://bloomshair.co.uk";

const seo = {
  title,
  titleTemplate: "%s | Blooms Hair",
  description,
  openGraph: {
    description,
    title,
    type: "website",
    url,
  },
  twitter: {
    handle: "@notrab",
    site: "@notrab",
  },
};

export { seo as defaultSEO, url as defaultUrl };
