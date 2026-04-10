import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
 
export const metadata: Metadata = {
  title: "Transportes Azul — Viaja Seguro",
  description: "Conectando el norte del Perú con seguridad, confort y la mejor tecnología.",
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${poppins.className} bg-white text-gray-900 overflow-x-hidden`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
 