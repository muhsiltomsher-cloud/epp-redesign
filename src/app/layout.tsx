import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emirates Pride | Premium Fragrances & Perfumes",
  description: "Discover premium fragrances, perfumes, and aromatic products at Emirates Pride. Shop our exclusive collection of luxury scents with delivery across the UAE.",
  openGraph: {
    title: "Emirates Pride | Premium Fragrances & Perfumes",
    description: "Discover premium fragrances, perfumes, and aromatic products at Emirates Pride. Shop our exclusive collection of luxury scents with delivery across the UAE.",
    type: "website",
    images: ["https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@emiratespride",
    title: "Emirates Pride | Premium Fragrances & Perfumes",
    description: "Discover premium fragrances, perfumes, and aromatic products at Emirates Pride. Shop our exclusive collection of luxury scents with delivery across the UAE.",
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
    <html lang="en" className="overflow-x-clip">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
