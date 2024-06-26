import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "../components/theme-provider";
import { DarkModeToggle } from "@/components/dark-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Analytics from "@/components/analytics";

const inter = Inter({ subsets: ["latin"] });

const titleText = "Free Online Text Highlighter CSS Generator";
const descriptionText =
  "Save time highlighting text on webpages. Generate custom CSS code to highlight text and easily copy it to your clipboard.";

export const metadata: Metadata = {
  title: titleText,
  description: descriptionText,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "https://www.highlightcss.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rchardkovacs",
    description: descriptionText,
    title: titleText,
    images: [
      {
        url: "https://www.highlightcss.com/cover.png",
        width: 1200,
        height: 630,
        alt: titleText,
      },
    ],
  },
  keywords: [
    "highlight",
    "highlighter",
    "text",
    "css",
    "generator",
    "mark",
    "html",
    "copy",
    "free",
    "online",
  ],
  creator: "Richard Kovacs",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://www.highlightcss.com",
    title: titleText,
    description: descriptionText,
    siteName: "Highlight CSS",
    images: [
      {
        url: "https://www.highlightcss.com/cover.png",
        width: 1200,
        height: 630,
        alt: titleText,
      },
    ],
  },
  category: "Web Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={`relative min-h-screen min-w-[375px] ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute flex items-center top-4 right-4 gap-4">
            <DarkModeToggle />
            <Avatar>
              <AvatarImage src="/richard-kovacs.webp" alt="Richard Kovacs" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
