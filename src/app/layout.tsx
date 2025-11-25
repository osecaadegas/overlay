import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twitch OAuth - User Permissions",
  description: "Manage user permissions with Twitch authentication",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
