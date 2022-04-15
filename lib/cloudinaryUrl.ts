import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

export function buildImage(src: string) {
  return cld.image(src).quality("auto").format("auto");
}
