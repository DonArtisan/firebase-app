import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { authOptions } from "@/components/auth";
import SessionProvider from "./SessionProvider";
import Login from "./login/page";
import Home from "./page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Firebase project",
  description: "Generated by Nerdify app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? <Login /> : <Home />}
        </SessionProvider>
      </body>
    </html>
  );
}
