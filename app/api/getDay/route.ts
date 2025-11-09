import { NextResponse, NextRequest } from "next/server";
import { daySelector } from "../Models/DaySelector/DaySelectorInstance";


export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  const res = daySelector.getDay(date ? new Date(date): new Date())
  return NextResponse.json(res);
}
