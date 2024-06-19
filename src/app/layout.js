import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Auth",
  description: "created by faizan rasheed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10 ">
          
          <Navbar />
          {children}

        </div>

      </body>
    </html>
  );
}
