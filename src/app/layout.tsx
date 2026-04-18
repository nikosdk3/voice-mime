import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const nunitoSansHeading = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Voice Mime",
    template: "%s | Voice Mime",
  },
  description: "Clone your voice with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        nunitoSansHeading.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <ClerkProvider>
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
