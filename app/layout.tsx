import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quiz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "종합퀴즈 - 다양한 분야의 퀴즈를 풀어보세요",
    template: "%s | 종합퀴즈",
  },
  description:
    "국기, 수도, 역사, 과학 등 다양한 분야의 퀴즈를 풀어보세요! 난이도별로 즐길 수 있는 재미있고 교육적인 퀴즈 게임입니다.",
  keywords: [
    "퀴즈",
    "종합퀴즈",
    "상식퀴즈",
    "국기퀴즈",
    "수도퀴즈",
    "역사퀴즈",
    "과학퀴즈",
    "교육게임",
    "trivia",
    "quiz game",
  ],
  authors: [{ name: "종합퀴즈" }],
  creator: "종합퀴즈",
  publisher: "종합퀴즈",
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
  icons: {
    icon: [
      {
        url: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "종합퀴즈",
    title: "종합퀴즈 - 다양한 분야의 퀴즈를 풀어보세요",
    description:
      "국기, 수도, 역사, 과학 등 다양한 분야의 퀴즈를 풀어보세요! 재미있고 교육적인 퀴즈 게임입니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "종합퀴즈 - 다양한 분야의 퀴즈를 풀어보세요",
    description:
      "국기, 수도, 역사, 과학 등 다양한 분야의 퀴즈를 풀어보세요! 재미있고 교육적인 퀴즈 게임입니다.",
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6366F1" },
    { media: "(prefers-color-scheme: dark)", color: "#8B5CF6" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark", "ocean", "sunset", "forest", "lavender", "rose", "midnight"]}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
