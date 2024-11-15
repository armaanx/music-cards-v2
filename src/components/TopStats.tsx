"use client";
import { getTopArtists } from "@/actions/getTopArtists";
import { getTopTracks } from "@/actions/getTopTracks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SpotifyArtistsReceipt from "./SpotifyArtistsReceipt";
import SpotifyArtistsTicket from "./SpotifyArtistsTicket";
import SpotifyReceipt from "./SpotifyReceipt";
import SpotifyTicket from "./SpotifyTicket";

export default function TopStats({
  username,
  userImg,
}: {
  username: string;
  userImg: string;
}) {
  const [stat, setStat] = useState<"tracks" | "artists">("tracks");
  const [timeRange, setTimeRange] = useState<
    "short_term" | "medium_term" | "long_term"
  >("short_term");
  const [style, setStyle] = useState<"modern" | "classic">("modern");
  const {
    data: tracksData,
    isLoading: tracksLoading,
    error: tracksError,
  } = useQuery({
    queryKey: ["top-tracks", timeRange],
    queryFn: async () => getTopTracks(timeRange, 10),
    staleTime: 18000000,
    gcTime: 18000000,
    enabled: stat === "tracks",
  });

  const {
    data: artistsData,
    isLoading: artistsLoading,
    error: artistsError,
  } = useQuery({
    queryKey: ["top-artists", timeRange],
    queryFn: async () => getTopArtists(timeRange, 10),
    staleTime: 18000000,
    gcTime: 18000000,
    enabled: stat === "artists",
  });

  if (tracksLoading || artistsLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  if (tracksError && stat === "tracks")
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {tracksError.message}
      </div>
    );
  if (artistsError && stat === "artists")
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {artistsError.message}
      </div>
    );

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col-reverse items-center justify-center gap-4">
        {stat === "tracks" ? (
          style === "modern" ? (
            <SpotifyTicket
              timeRange={timeRange}
              tracks={tracksData!}
              username={username}
              userImg={userImg}
            />
          ) : (
            <SpotifyReceipt
              tracks={tracksData!}
              timeRange={timeRange}
              username={username}
            />
          )
        ) : style === "modern" ? (
          <SpotifyArtistsTicket
            artists={artistsData!}
            timeRange={timeRange}
            username={username}
            userImg={userImg}
          />
        ) : (
          <SpotifyArtistsReceipt
            artists={artistsData!}
            timeRange={timeRange}
            username={username}
          />
        )}
        <div className="mb-8 text-center flex flex-row flex-wrap items-center justify-center gap-4">
          <Select
            defaultValue="tracks"
            value={stat}
            onValueChange={(value) => {
              setStat(value as "tracks" | "artists");
            }}
          >
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Select Stat" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Stat</SelectLabel>
                <SelectItem value="tracks">Top Tracks</SelectItem>
                <SelectItem value="artists">Top Artists</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            defaultValue="short_term"
            onValueChange={(value) => {
              setTimeRange(value as "short_term" | "medium_term" | "long_term");
            }}
            value={timeRange}
          >
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Range</SelectLabel>
                <SelectItem value="short_term">Last 4 Weeks</SelectItem>
                <SelectItem value="medium_term">Last 6 Months</SelectItem>
                <SelectItem value="long_term">Last Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            defaultValue="modern"
            onValueChange={(value) => {
              setStyle(value as "modern" | "classic");
            }}
            value={style}
          >
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Card Style</SelectLabel>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
