import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "PackUp",
  description: "Situation-based packing checklist starter app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
