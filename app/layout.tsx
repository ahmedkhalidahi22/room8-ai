import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Roboto } from "next/font/google";
import "./globals.css";
import QueryProvider from "../lib/QueryProvider";
import Header from "@/components/header";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Room8 AI",
  description: "Find your next roommate using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} `}>
          <SignedIn>
            <Header />
            <QueryProvider>{children}</QueryProvider>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </body>
    </html>
    </ClerkProvider>
  );
}