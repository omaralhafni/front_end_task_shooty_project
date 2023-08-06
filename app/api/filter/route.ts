import { NextResponse } from "next/server";
import filter from "./data.json";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(filter);
}
