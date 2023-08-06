"use client";
import React from "react";
import { Container } from "./Components/Container";
import { Sidebar } from "./Components/Sidebar";

export default function Home() {
  return (
    <main>
      <Sidebar />
      <Container />
    </main>
  );
}
