"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotifyTrack } from "@/types";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
//import html2canvas from "html2canvas";

interface SpotifyTicketProps {
  tracks: SpotifyTrack[];
  timeRange: string;
  username: string;
  userImg: string;
}

const SpotifyTicket = ({
  tracks,
  timeRange,
  username,
  userImg,
}: SpotifyTicketProps) => {
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

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full flex flex-col gap-4 mx-auto items-center justify-center">
      <Card className="w-full max-w-[400px] text-foreground" ref={receiptRef}>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center justify-start gap-2">
              <Image
                src={userImg}
                alt={username + "profile image"}
                height={40}
                width={40}
                priority
                unoptimized={true}
                className="rounded-sm"
              />
              <p>{username.concat("'s ")}Top Tracks</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" text-sm">
            <div className="flex justify-between border-b border-stone-600 pb-2 mb-2">
              <span>
                Card #{Math.random().toString(36).slice(2, 7).toUpperCase()}
              </span>
              <span>{formatTimeRange(timeRange)}</span>
            </div>

            <div className=" pb-3 pt-3 text-left">
              {tracks.map((track, index) => (
                <div key={track.id} className="mb-1 last:mb-0">
                  <div className="flex justify-between gap-2">
                    <span className="">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate">{track.name}</span>
                    <span>{formatDuration(track.duration_ms)}</span>
                  </div>
                  <div className=" text-xs truncate pl-6 text-muted-foreground">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 pt-2 border-t border-stone-600 flex flex-row items-center justify-between">
              <div>{formatDate(new Date())}</div>
              <Image
                priority
                quality={100}
                unoptimized
                className="dark:filter dark:invert"
                width={80}
                alt="spotify logo"
                height={80}
                src={"/spotify_logo.png"}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={onButtonClick}
        size={"lg"}
        className="mb-4  bg-green-600 text-white  hover:bg-green-700 transition "
      >
        Download Card <Download className="ml-2" />
      </Button>
    </div>
  );
};

export default SpotifyTicket;
