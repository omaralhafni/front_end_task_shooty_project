import { NextResponse } from "next/server";
import jobs from "../data.json";

interface Job {
  sector: string;
  country: string;
  city: string;
}

function filterData(query: string): Job[] {
  const queryParams = new URLSearchParams(query);
  const sectors = queryParams.getAll("sector");
  const countries = queryParams.getAll("country");
  const cities = queryParams.getAll("city").map((city) => city.toLowerCase());

  if (!sectors.length && !countries.length && !cities.length) {
    return jobs;
  }

  const matches = jobs.filter((item) => {
    return (
      sectors.includes(item.sector) ||
      countries.includes(item.country.toLowerCase()) ||
      cities.includes(item.city.toLowerCase())
    );
  });

  return matches;
}

export async function GET(request: Request): Promise<NextResponse> {
  const { search } = new URL(request.url);
  const data = await filterData(search);
  return NextResponse.json(data);
}
