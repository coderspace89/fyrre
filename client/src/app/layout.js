import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const myFont = localFont({
  src: [
    {
      path: "../../public/Fonts/OTF/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Fonts/OTF/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Fonts/OTF/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Fonts/OTF/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata = {
  title: "Fyrre Magazine Website",
  description: "A Magazine Website built with Next.js and Strapi CMS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
