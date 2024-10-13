"use client"; // Client Component

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation"; // Use next/navigation
import "@/styles/globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return (
      <html lang="en">
        <body className={`${inter.className}`}> {children} </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-white`}>
        <Sidebar className="w-64" />
        <main className="flex-1"> {children} </main>
      </body>
    </html>
  );
}
