import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import Maps from "./GoogleMaps";

const containerStyle = {
  height: "200px",
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="bottom-0 left-0 w-full py-4 mb-0 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-900 ">
        <div className="grid grid-cols-1 gap-2 px-4 py-2 mx-auto my-0 container-lg sm:mx-8 sm:py-6 sm:px-6 lg:grid-cols-4">
          <div className="w-full mb-4 sm:mb-0">
            <h2 className="mb-4 text-xl font-bold">ABOUT BLOOMS HAIR</h2>
            <p className="mb-4 text-sm font-hairline text-gray-500">
              At Blooms Hair, we are passionate about making you feel special,
              every day. That’s why we offer a wide selection of quality
              services in our salon in Islington London. We have Wella Colour
              Master experts on hand that can deliver full hair colours to
              balayage’s and highlights, achieving your perfect shade is simple.
            </p>
          </div>
          <div className="px-2 mb-4 w-ful sm:mb-0">
            <h1 className="mb-4 text-xl font-bold">OPENING HOURS</h1>
            <ul className="font-thin text-gray-500">
              <li className="flex justify-between mb-4">
                Monday:{" "}
                <p>
                  <strong className="ml-6">Closed</strong>
                </p>
              </li>
              <li className="flex flex-row justify-between mb-4 text-base">
                Tuesday:
                <p>
                  <strong>11.00am - 20.00pm</strong>
                </p>
              </li>
              <li className="flex justify-between mb-2 text-base">
                Wednesday:
                <p className="">
                  <strong>11.00am - 20.00pm</strong>
                </p>
              </li>
              <li className="flex flex-row justify-between mb-4">
                Thursday:
                <p>
                  <strong>11.00am - 20.00pm</strong>
                </p>
              </li>
              <li className="flex flex-row justify-between mb-4">
                Friday:
                <p>
                  <strong>11.00am - 20.00pm</strong>
                </p>
              </li>
              <li className="flex flex-row justify-between mb-4">
                Saturday:
                <p>
                  <strong>10.00am - 18.00pm</strong>
                </p>
              </li>
              <li className="flex flex-row justify-between mb-4">
                Sunday:
                <p>
                  <strong>Closed</strong>
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full mb-4 sm:mb-0">
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
            <p className="mb-4 font-thin text-gray-500">
              A: 9 Lever Street, London EC1V 3QU
            </p>
            <div className="w-full">
              <Maps containerStyle={containerStyle} zoom={17} />
            </div>
          </div>
          <div className="w-full mb-4 sm:mb-0">
            <h1 className="mb-4 text-xl font-bold">
              FOLLOW US ON SOCIAL MEDIA
            </h1>
            <div className="z-50 mb-6">
              <ul className="flex flex-row text-white ">
                <li className="px-1 py-2 m-1 text-xl hover:text-blue-500">
                  <a href="https://www.facebook.com/bloomshair">
                    <FaFacebook />
                  </a>
                </li>
                <li className="px-1 py-2 m-1 text-xl hover:text-blue-500">
                  <a href="https://www.instagram.com/blooms_hair/">
                    <FaInstagram />
                  </a>
                </li>
                <li className="px-1 py-2 m-1 text-xl hover:text-blue-500">
                  <a href="https://www.google.com/maps/place/Blooms+Hair/@51.526503,-0.0994912,15z/data=!4m5!3m4!1s0x0:0x7abe1309f8f21d14!8m2!3d51.526503!4d-0.0994912">
                    <FaGoogle />
                  </a>
                </li>
              </ul>
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
