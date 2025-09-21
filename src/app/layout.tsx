import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "yizhe Blog",
    template: "%s - yizhe",
  },
  description:
    "記錄技術、生活與旅行的每個故事。",
  keywords: ["Web Development", "Next.js", "TypeScript", "Blog", "Travel"],
  authors: [{ name: "yizhe" }],
  creator: "yizhe",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://phoenixbaker.com",
    title: "yizhe Blog",
    description:
      "記錄技術分享、生活日常與旅行故事，體現設計與開發的美好。",
    siteName: "yizhe Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "yizhe Blog",
    description:
      "探索開發、生活與旅遊的精彩片段。",
    creator: "@phoenixbaker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
