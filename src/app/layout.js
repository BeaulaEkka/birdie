import Navbar from "@/components/Navbar";
import "./globals.css";
import "react-quill/dist/quill.snow.css";
import { Inter, Freehand } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const freehand = Freehand({
  weight: "400",
  preload: false,
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-${inter} ${freehand}`}>
        <Navbar />
        <div className="min-h-screen flex grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
