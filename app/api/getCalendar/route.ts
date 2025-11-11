import { NextResponse } from "next/server";
import { daySelector } from "../Models/DaySelector/DaySelectorInstance";


export async function GET() {
  const res = daySelector.getCalendar(new Date('01/01/2025'), new Date('12/31/2025'))
  return NextResponse.json(res);
}
