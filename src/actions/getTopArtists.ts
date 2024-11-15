"use server";
import { authOptions } from "@/auth";
import { SpotifyArtists } from "@/types";
import { getServerSession } from "next-auth";

export async function getTopArtists(
  timeRange: "short_term" | "medium_term" | "long_term" = "short_term",
  limit: number = 5
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Not logged in");
    if (!session?.user?.accessToken) {
      throw new Error("No access token available");
    }
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Access token expired");
      }
      throw new Error("Failed to fetch top tracks");
    }
    const data = await response.json();
    return data.items as SpotifyArtists[];
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw error;
  }
}
