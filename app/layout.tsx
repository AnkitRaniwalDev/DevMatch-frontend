import Providers from "@/components/Providers";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased ">
        <Providers> 
        <main className="">
          {children}
        </main>
        <Footer />
        </Providers>
      </body>
    </html>
  );
}