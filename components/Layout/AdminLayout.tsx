import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Sidebar from "../navigation/Sidebar";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="description" content="Blooms Hair admin site" />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Sidebar />
      <main className="relative md:ml-64">{children}</main>
      <ToastContainer />
    </div>
  );
};

AdminLayout.defaultProps = {
  title: "Welcome to Blooms Hair | Admin",
};

export default AdminLayout;
