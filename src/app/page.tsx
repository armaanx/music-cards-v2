"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Music, Paintbrush } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsSpotify } from "react-icons/bs";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="w-full relative flex flex-col items-center justify-center">
      <div className="relative w-full py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tighter font-semibold leading-tight">
                Music Cards
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-md mx-auto lg:mx-0">
                Transform your Spotify listening history into a beautiful card.
                See your top tracks and artists in a unique, shareable format.
              </p>

              <div className="flex flex-row gap-4 justify-center lg:justify-start">
                {!session?.user ? (
                  <button
                    onClick={() => signIn("spotify", { callbackUrl: "/main" })}
                    className="flex flex-row items-center justify-center gap-2 border bg-[#1ed760] text-black p-3 px-4 rounded-full font-semibold hover:text-white hover:bg-stone-900 trasnsition duration-200"
                  >
                    Login with Spotify
                    <BsSpotify className="text-2xl" />
                  </button>
                ) : (
                  <Button
                    className="rounded-full font-semibold text-lg sm:text-xl"
                    variant="outline"
                    size="lg"
                    onClick={() => router.push("/main")}
                  >
                    Continue <ArrowRight className="ml-2" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="transform hover:scale-105 transition-all duration-300 w-full max-w-sm">
                <div className="bg-white p-6 sm:p-8 rounded-lg border-[8px] shadow-xl md:rotate-[-3deg]">
                  <div className="text-black">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold">TOP STATS</h4>
                      <p className="text-sm text-gray-600">
                        Your Music Summary
                      </p>
                      <hr className="my-2 border-gray-300" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base">
                          1. Top Song
                        </span>
                        <span className="text-sm sm:text-base">$9.99</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base">
                          2. Another Hit
                        </span>
                        <span className="text-sm sm:text-base">$8.99</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base">
                          3. Favorite Track
                        </span>
                        <span className="text-sm sm:text-base">$7.99</span>
                      </div>
                      <hr className="my-2 border-gray-300" />
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-sm sm:text-base">
                          TOTAL PLAYS
                        </span>
                        <span className="text-sm sm:text-base">1,234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to showcase your music taste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border p-6 rounded-lg shadow-lg hover:scale-105 transition-all bg-white dark:bg-background">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <Paintbrush className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Multiple Card Styles
              </h3>
              <p className="text-muted-foreground">
                Choose from various beautifully designed card layouts to
                showcase your music taste in style.
              </p>
            </div>

            <div className="border p-6 rounded-lg shadow-lg hover:scale-105 transition-all bg-white dark:bg-background">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Music className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Stats</h3>
              <p className="text-muted-foreground">
                See your most played songs/artists and discover your music
                patterns over time.
              </p>
            </div>

            <div className="border p-6 rounded-lg shadow-lg hover:scale-105 transition-all bg-white dark:bg-background">
              <div className="w-12 h-12 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Download</h3>
              <p className="text-muted-foreground">
                Download your card in a click and share it across social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
