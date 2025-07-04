"use client";
import { useEffect } from "react";
import MainContent from "./pages/page";

export default function Home() {
  useEffect(() => {
    const uid = localStorage.getItem("useruid");
    if (!uid) {
      window.location.href = "/auth/register";
    }
  }, []);
  return (
    <section>
      <MainContent></MainContent>
    </section>
  );
}
