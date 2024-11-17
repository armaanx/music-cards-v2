"use client";
import { formatDate } from "@/lib/utils";
import { SpotifyArtists } from "@/types";
import clsx from "clsx";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { Courier_Prime } from "next/font/google";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

interface SpotifyArtistsReceiptProps {
  artists: SpotifyArtists[];
  timeRange: string;
  username: string;
}

const font = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

export default function SpotifyArtistsReceipt({
  artists,
  timeRange,
  username,
}: SpotifyArtistsReceiptProps) {
  const [loading, setLoading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const onButtonClick = () => {
    if (receiptRef.current === null) {
      return;
    }

    toPng(receiptRef.current, { quality: 1, cacheBust: false, pixelRatio: 2 })
      .then((dataUrl) => {
        setLoading(true);
        const link = document.createElement("a");
        link.download = "music_card_" + new Date().getTime() + ".png";
        link.href = dataUrl;
        link.click();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const formatTimeRange = (range: string) => {
    switch (range) {
      case "short_term":
        return "Last 4 Weeks";
      case "medium_term":
        return "Last 6 Months";
      case "long_term":
        return "Last Year";
      default:
        return range;
    }
  };

  return (
    <div className="grid w-full place-items-center gap-4">
      <div
        ref={receiptRef}
        className={clsx(
          "w-full max-w-[380px] bg-[url('/paper.jpg')] bg-auto bg-white text-black p-3 shadow-lg pt-6",
          font.className
        )}
      >
        <div className="grid">
          {/* Header Section */}
          <div className="grid gap-1 border-b border-dashed border-black pb-2 text-center">
            <div className="font-bold text-lg">
              {username.concat("'s ")}Top Artists
            </div>
            <div className="text-sm">{formatDate(new Date())}</div>
            <div className="text-sm">
              {formatTimeRange(timeRange).toUpperCase()}
            </div>
          </div>

          {/* Artists List Section */}
          <div className="grid gap-2 border-b border-dashed border-black py-2">
            {artists.map((artist, index) => (
              <div key={artist.id} className="grid">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <span>
                    {(index + 1).toString().padStart(2, "0").concat(".")}
                  </span>
                  <span className="truncate">{artist.name}</span>
                  <div className="relative h-10 w-10">
                    <Image
                      crossOrigin="anonymous"
                      src={artist.images[0].url}
                      alt={artist.name}
                      fill
                      priority
                      unoptimized={true}
                      className="h-full w-full object-cover filter grayscale"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="flex flex-col items-center justify-center pt-2 text-center pb-2 gap-1">
            <div>
              Card #{Math.random().toString(36).slice(2, 7).toUpperCase()}
            </div>
            <Image
              crossOrigin="anonymous"
              priority
              quality={100}
              unoptimized
              className=""
              width={90}
              alt="spotify logo"
              height={90}
              src={"/spotify_logo.png"}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={onButtonClick}
        disabled={loading}
        size="lg"
        className="bg-green-600 text-white transition hover:bg-green-700"
      >
        Download Card <Download className="ml-2" />
      </Button>
    </div>
  );
}
