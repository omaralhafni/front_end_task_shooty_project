import { NextResponse } from "next/server";
import jobs from "../data.json";

interface Job {
  title: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const filteredJobs: Job[] = jobs.filter((job: Job) => {
    return job.title.toLowerCase().includes(query?.toLowerCase() ?? "");
  });

  return NextResponse.json(filteredJobs);
}
