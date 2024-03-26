import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Text Highlighter CSS Generator",
  description:
    "Save time highlighting text on webpages. Generate custom CSS code to highlight text and easily copy it to your clipboard.",
  alternates: {
    canonical: "https://www.highlightcss.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rchardkovacs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative min-h-screen min-w-[375px] ${inter.className}`}
      >
        <div className="absolute flex items-center top-4 right-4 gap-4">
          <Image
            src="/richard-kovacs.webp"
            alt="Richard Kovacs"
            className="w-12 h-12 rounded-full"
            width={48}
            height={48}
          />
          <a
            href="https://twitter.com/rchardkovacs"
            target="_blank"
            className="text-lg font-semibold text-[#1da1f2]"
          >
            Follow Me on X
          </a>
        </div>
        {children}
        <Toaster />
        <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
          Built by{" "}
          <a
            href="https://richardkovacs.dev"
            target="_blank"
            className="underline"
          >
            Richard Kovacs
          </a>
        </footer>
      </body>
    </html>
  );
}
