import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navigation from "./(marketing)/components/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Calex - Get Your NDAs Done Fast, Secure, and Reviewed by Real Lawyers",
  description: "Calex connects startups with law firms to draft, review, and approve NDAs instantly using AI-assisted workflows. Founders save time. Lawyers earn more.",
  keywords: ["NDA", "legal tech", "AI", "lawyers", "startups", "contracts", "document automation"],
  authors: [{ name: "Calex Team" }],
  creator: "Calex",
  publisher: "Calex",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Calex - AI-Powered NDA Platform",
    description: "Get your NDAs done fast, secure, and reviewed by real lawyers. Connect startups with law firms instantly.",
    siteName: "Calex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calex - AI-Powered NDA Platform",
    description: "Get your NDAs done fast, secure, and reviewed by real lawyers.",
    creator: "@calex",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1e293b",
              color: "#ffffff",
              border: "1px solid #334155",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#3b82f6",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}