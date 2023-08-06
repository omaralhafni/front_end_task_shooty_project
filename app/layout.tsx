import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JobsProvider } from "./Context/Jobs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Front End Task Manager",
  description: "task for the benefit of GHADEER Future Accelerators",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JobsProvider>{children}</JobsProvider>
      </body>
    </html>
  );
}
