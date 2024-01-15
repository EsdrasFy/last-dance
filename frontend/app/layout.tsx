import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header/header";
import NextAuthSessionProvider from "./providers/sessionProvider";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./api/auth/[...nextauth]/route";
import ProductQuery from "./api/ProductQuery";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Urban Vogue",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.className} flex w-full justify-center min-h-screen items-center`}>
        
          <NextAuthSessionProvider>
            <Header href={session ? "/my-account" : "/login"} />
            {children}
          </NextAuthSessionProvider>
      </body>
    </html>
  );
}