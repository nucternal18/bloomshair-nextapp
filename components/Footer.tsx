import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import Maps from "./GoogleMaps";

const containerStyle = {
  height: "200px",
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="bottom-0 left-0 w-full py-4 mb-0 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900">
        <div className="flex w-full">
          <div className="container mx-auto w-ful">
            <div className="grid grid-cols-1 gap-2 px-4 py-2 mx-auto my-0 container-lg sm:mx-8 sm:py-6 sm:px-6 lg:grid-cols-3">
              <div className="w-full mb-4 sm:mb-0 col-span-1">
                <h2 className="mb-4 text-xl font-bold">ABOUT BLOOMS HAIR</h2>
                <p className="mb-4 text-sm font-hairline text-gray-500">
                  At Blooms Hair, we are passionate about making you feel
                  special, every day. That’s why we offer a wide selection of
                  quality services in our salon in Islington London. We have
                  Wella Colour Master experts on hand that can deliver full hair
                  colours to balayage’s and highlights, achieving your perfect
                  shade is simple.
                </p>
              </div>

              <div className="w-full mb-4 sm:mb-0 col-span-1">
                <h1 className="mb-4 text-xl font-bold">CONTACT BLOOMS HAIR</h1>
                <p className="mb-4 font-thin text-gray-500">
                  T: <a href="tel:07838849597">07838849597</a>
                </p>
                <p className="mb-4 font-thin text-gray-500">
                  E:{" "}
                  <a href="mailto:appointments@bloomshair.co.uk">
                    appointments@bloomshair.co.uk
                  </a>
                </p>
              </div>
              <div className="w-full mb-4 sm:mb-0 col-span-1">
                <h1 className="mb-4 text-xl font-bold">
                  FOLLOW US ON SOCIAL MEDIA
                </h1>
                <div className="z-50 mb-6">
                  <ul className="flex flex-row">
                    <li className="px-1 py-2 m-1 text-xl hover:text-blue-500">
                      <a href="https://www.facebook.com/bloomshair">
                        <FaFacebook />
                      </a>
                    </li>
                    <li className="px-1 py-2 m-1 text-xl hover:text-pink-700">
                      <a href="https://www.instagram.com/blooms_hair/">
                        <FaInstagram fontSize={21} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center py-2 sm:flex-row">
          <div>
            <p className="text-xs text-center text-gray-500">
              &copy;Copyright {year} Blooms Hair. All rights reserved. |
            </p>
          </div>
          <div>
            <p className="text-xs text-center text-gray-500 sm:ml-2">
              maintained by aolausoro.tech
            </p>
          </div>
        </div>
        <div className="text-xs text-center text-gray-500">
          <a href="https://www.freepik.com/vectors/frame">
            Frame vector created by BiZkettE1 - www.freepik.com
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
