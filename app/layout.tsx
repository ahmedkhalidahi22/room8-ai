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
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

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
      <ToastProvider>
      <html lang="en">
        <body className={`${roboto.className} `}>
          <SignedIn>
            <Header />
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </body>
      </html>
      </ToastProvider>
    </ClerkProvider>
  );
}