"use client";
import Link from "next/link";

export default function SideBar() {
  return (
    <nav className="h-[100vh] border-r-2 px-7 border-black flex flex-col items-center">
      <Link
        className=" bg-blue-500 hover:bg-blue-300 w-full text-center px-4"
        href={"/pages"}
      >
        Dashboard
      </Link>
      <Link
        className=" bg-blue-500 hover:bg-blue-300 w-full text-center px-4"
        href={"/pages/tugas"}
      >
        tugas
      </Link>
    </nav>
  );
}
