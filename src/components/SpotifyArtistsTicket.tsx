"use client";
import { formatDate } from "@/lib/utils";
import { SpotifyArtists } from "@/types";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SpotifyArtistsTicketProps {
  artists: SpotifyArtists[];
  timeRange: string;
  username: string;
  userImg: string;
}

export default function SpotifyArtistsTicket({
  artists,
  timeRange,
  username,
  userImg,
}: SpotifyArtistsTicketProps) {
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

  return (
    <div className="grid w-full place-items-center gap-4">
      <Card className="w-full max-w-[400px] text-foreground" ref={receiptRef}>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row items-center justify-start gap-2">
              <Image
                src={userImg}
                alt={username + "profile image"}
                height={45}
                width={45}
                priority
                unoptimized={true}
                className="rounded-sm"
              />
              <p>{username.concat("'s ")}Top Artists</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid text-sm">
            <div className="flex justify-between border-b border-stone-600 pb-2 mb-1">
              <span>
                Card #{Math.random().toString(36).slice(2, 7).toUpperCase()}
              </span>
              <span>{formatTimeRange(timeRange)}</span>
            </div>

            <div className=" pt-2 text-left grid gap-  border-black">
              {artists.map((artist, index) => (
                <div key={artist.id} className="mb-1 last:mb-0">
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                    <span className="">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate">{artist.name}</span>
                    <div className="relative w-10 h-10">
                      <Image
                        src={artist.images[0].url}
                        alt={artist.name}
                        fill
                        priority
                        unoptimized={true}
                        className="rounded-sm w-full h-full object-cover"
                      />
                    </div>
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
}
