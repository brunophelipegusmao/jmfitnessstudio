import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const notoSans = localFont({
  src: [
    { path: "../fonts/NotoSans-Variable.ttf", style: "normal" },
    { path: "../fonts/NotoSans-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-sans",
  weight: "100 900",
});

const roboto = localFont({
  src: [
    { path: "../fonts/Roboto-Variable.ttf", style: "normal" },
    { path: "../fonts/Roboto-Italic-Variable.ttf", style: "italic" },
  ],
  variable: "--font-heading",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JM Fitness Studio",
  description: "JM Fitness Studio — treine com a gente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${notoSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full min-w-full flex flex-col">{children}</body>
    </html>
  );
}
