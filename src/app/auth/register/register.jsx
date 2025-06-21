"use client";
import Link from "next/link";
import { auth } from "@/firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { use, useEffect, useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      localStorage.setItem("userName", name);
      alert("registrasi berhasil:", name);
    } catch (e) {
      alert(`Gagal register ${e}`);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
          Register
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-blue-700 font-medium">
            Nama
          </label>
          <input
            className="border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full text-blue-700 placeholder-blue-300"
            type="text"
            id="name"
            placeholder="Nama Lengkap"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-blue-700 font-medium">
            Email
          </label>
          <input
            className="border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full text-blue-700 placeholder-blue-300"
            type="email"
            id="email"
            placeholder="you@example.com"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-blue-700 font-medium">
            Password
          </label>
          <input
            className="border border-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full text-blue-700 placeholder-blue-300"
            type="password"
            id="password"
            placeholder="••••••••"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center text-blue-700">
          <p>or</p>
          <Link href="/auth/login" className="underline hover:text-blue-900">
            Login di sini
          </Link>
        </div>
        <input
          type="submit"
          value="Daftar"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md p-2 cursor-pointer transition"
        />
      </form>
    </section>
  );
}
