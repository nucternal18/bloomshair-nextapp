import { Footer, Navbar, RootLayoutWrapper } from "./components";

import Provider from "@app/providers/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
