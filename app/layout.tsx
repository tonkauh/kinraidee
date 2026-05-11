import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "วันนี้กินไรดี?",
  description: "คิดไม่ออกใช่ไหมว่ามื้อนี้จะกินอะไรดี? ตอบคำถามง่ายๆ แล้วเราจะเลือกให้เอง!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${prompt.variable} h-full antialiased`}
    >
      <body className={`${prompt.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
