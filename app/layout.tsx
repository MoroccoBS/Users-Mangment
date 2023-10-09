import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import SessionContextProvider from "../context/SessionProvider";
import NavBar from "@/components/NavBar";
import ToasterContext from "@/context/ToasterContext";
const quicksand = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Users Management App",
  description: "A simple users management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <SessionContextProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterContext />
            <NavBar />
            {children}
          </ThemeProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
