import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import clsx from "clsx";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Sora } from "next/font/google";
import "./globals.css";

const inter = Sora({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Cards",
  description: "Get your Spotify stats in aesthetic formats!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          inter.className,
          "antialiased flex flex-col min-h-screen overflow-x-hidden grainy-light dark:bg-none"
        )}
      >
        <Providers session={session!}>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
