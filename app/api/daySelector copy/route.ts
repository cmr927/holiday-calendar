import { NextResponse } from "next/server";
import { daySelector } from "../Models/DaySelector/DaySelectorInstance";


export async function GET() {
  const res = daySelector.getDay(new Date('12/25/2025'))
  console.log(res)
  return NextResponse.json(res);
}
