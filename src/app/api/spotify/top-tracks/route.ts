import { getTopTracks } from "@/actions/getTopTracks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeRange =
      (searchParams.get("timeRange") as
        | "short_term"
        | "medium_term"
        | "long_term") || "medium_term";
    const limit = parseInt(searchParams.get("limit")!, 10);

    const tracks = await getTopTracks(timeRange, limit);
    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Error in top tracks API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch top tracks" },
      { status: 500 }
    );
  }
}
