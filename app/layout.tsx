import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "JS Quest | Learn JavaScript with confidence",
  description: "A friendly, interactive path from your first line of JavaScript to real coding confidence."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
