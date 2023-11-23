import { NextRequest, NextResponse } from "next/server";
import { getNotionData } from "../../notion";

//create new thread
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const rawIds = searchParams.get("ids");
    const ids = rawIds?.split(",").filter(Boolean);
    const activities = await getNotionData(ids);
    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
