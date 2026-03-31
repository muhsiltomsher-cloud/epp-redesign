import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emirates Pride | Luxury Arabic Perfumes",
  description: "Discover our exclusive collection of luxury fragrances and perfumes crafted in the UAE.",
  openGraph: {
    title: "Emirates Pride | Luxury Arabic Perfumes",
    description: "Discover our exclusive collection of luxury fragrances and perfumes crafted in the UAE.",
    type: "website",
    images: ["https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@emiratespride",
    title: "Emirates Pride | Luxury Arabic Perfumes",
    description: "Discover our exclusive collection of luxury fragrances and perfumes crafted in the UAE.",
    images: ["https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"],
  },
  icons: {
    icon: "https://emiratespride.com/wp-content/uploads/2023/11/cropped-favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Cairo:wght@200..1000&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
