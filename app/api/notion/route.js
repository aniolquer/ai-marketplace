import { NextRequest, NextResponse } from "next/server";
import { getNotionData } from "../../notion";

// Create new thread
export async function GET(req) {
  try {
    // Extract search parameters from the request URL
    const searchParams = req.nextUrl.searchParams;

    // Get the 'ids' parameter and split it into an array
    const rawIds = searchParams.get("ids");
    const ids = rawIds?.split(",").filter(Boolean);

    // Fetch data from Notion using the extracted IDs
    const activities = await getNotionData(ids);

    // Return the fetched data as a JSON response
    return NextResponse.json(activities);
  } catch (error) {
    // Return an error message with a 400 status code if an exception occurs
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
