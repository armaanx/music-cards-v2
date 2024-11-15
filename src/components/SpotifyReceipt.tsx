"use client";
import { SpotifyTrack } from "@/types";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Courier_Prime } from "next/font/google";
import clsx from "clsx";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface SpotifyReceiptProps {
  tracks: SpotifyTrack[];
  timeRange: string;
  username: string;
}
const font = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"] });

export default function SpotifyReceipt({
  tracks,
  timeRange,
  username,
}: SpotifyReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const onButtonClick = () => {
    if (receiptRef.current === null) {
      return;
    }

    toPng(receiptRef.current, { quality: 1, cacheBust: false, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
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

  // const handleDownload = async () => {
  //   if (!receiptRef.current) return;

  //   try {
  //     const canvas = await html2canvas(receiptRef.current, {
  //       scale: 2,
  //       logging: false,
  //       useCORS: true,
  //       allowTaint: true,
  //       backgroundColor: "#ffffff",
  //     });

  //     const image = canvas.toDataURL("image/jpeg");
  //     const link = document.createElement("a");
  //     link.href = image;
  //     link.download = `spotify-receipt-${timeRange}-${new Date().getTime()}.jpeg`;
  //     link.click();
  //   } catch (error) {
  //     console.error("Error generating receipt:", error);
  //   }
  // };

  const totalDuration = tracks.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  );
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center   text-black gap-4 w-full justify-center"
      )}
    >
      <div
        ref={receiptRef}
        className={clsx(
          "max-w-[380px] bg-white py-3 px-2 leading-tight shadow-lg bg-[url('/paper.jpg')] bg-auto w-full",
          font.className
        )}
      >
        <div className="text-center border-b border-black border-dashed pb-2 space-y-1">
          <div className="font-bold text-lg">
            {username.concat("'s ")}Top Tracks
          </div>
          <div className="text-sm">{formatDate(new Date())}</div>
          <div className="text-sm">
            {formatTimeRange(timeRange).toUpperCase()}
          </div>
        </div>

        <div className="border-b border-black border-dashed pb-3 pt-3">
          {tracks.map((track, index) => (
            <div key={track.id} className="mb-1 last:mb-0">
              <div className="flex justify-between gap-2">
                <span className="">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="flex-1 truncate">{track.name}</span>
                <span>{formatDuration(track.duration_ms)}</span>
              </div>
              <div className=" text-xs truncate pl-7">
                {track.artists.map((artist) => artist.name).join(", ")}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 text-center">
          <div className="flex justify-between">
            <span>TOTAL TIME:</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
          <div className="flex justify-between">
            <span>TRACKS:</span>
            <span>{tracks.length}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-dashed border-black flex flex-col items-center justify-center w-full gap-1">
            Card #{Math.random().toString(36).slice(2, 7).toUpperCase()}
            <Image
              priority
              unoptimized
              quality={100}
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
        size={"lg"}
        className="mb-4  bg-green-600 text-white  hover:bg-green-700 transition "
      >
        Download Card <Download className="ml-2" />
      </Button>
    </div>
  );
}
