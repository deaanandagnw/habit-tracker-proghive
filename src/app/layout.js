import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@/styles/globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title:
    "Habit Tracker | Proghive's Final Project",
  description:
    "Habit Tracker | Proghive's Final Project",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-row bg-white`}>
        <Sidebar />
        {children}
        </body>
    </html>
  );
}
