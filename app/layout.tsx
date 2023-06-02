import { Footer, Navbar, RootLayoutWrapper } from "./components";

import Provider from "./providers/provider";
import "./styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-auto">
        <Provider>
          <Navbar />
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
