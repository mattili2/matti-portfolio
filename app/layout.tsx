import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/lib/i18n";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yuxin Portfolio",
  description:
    "Yuxin Li Matti — UX Designer / UX Researcher at Delft University of Technology.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const raw = headerList.get("x-locale") ?? defaultLocale;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const lang = locale === "zh" ? "zh-CN" : "en";

  return (
    <html
      lang={lang}
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
