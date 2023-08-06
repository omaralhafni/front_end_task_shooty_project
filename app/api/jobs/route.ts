import fs from "fs";
import { NextResponse } from "next/server";
import jobs from "./data.json";
import path from "path";
import { IncomingMessage, ServerResponse } from "http";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(jobs);
}

interface Job {
  id: number;
  title: string;
  sector: string;
  country: string;
  city: string;
  description: string;
}

export async function POST(response: any): Promise<NextResponse> {
  const { title, sector, country, city, description } = await response.json();

  const dataFilePath = path.join(process.cwd(), "./app/api/jobs/data.json");
  const rawData = fs.readFileSync(dataFilePath, "utf8");
  const jobs: Job[] = JSON.parse(rawData);

  const newJob: Job = {
    id: jobs.length + 1,
    title,
    sector,
    country,
    city,
    description,
  };

  jobs.push(newJob);

  fs.writeFileSync(dataFilePath, JSON.stringify(jobs, null, 2), "utf8");
  return NextResponse.json(jobs);
}

export async function DELETE(response: any): Promise<NextResponse> {
  const id: number = await response.json();

  const dataFilePath = path.join(process.cwd(), "./app/api/jobs/data.json");
  const rawData = fs.readFileSync(dataFilePath, "utf8");
  const jobs: Job[] = JSON.parse(rawData);

  const newJobs: Job[] = jobs.filter((job) => job.id !== id);

  fs.writeFileSync(dataFilePath, JSON.stringify(newJobs, null, 2), "utf8");
  return NextResponse.json(newJobs);
}
