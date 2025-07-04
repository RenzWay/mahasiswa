"use client";
import { useState } from "react";
import Link from "next/link";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      alert("Semua field harus diisi.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      localStorage.setItem("userName", name);
      localStorage.setItem("useruid", userCredential.user.uid);
      alert("Registrasi berhasil!");
      window.location.href = "/auth/login";
    } catch (error) {
      alert("Gagal daftar: " + error.message);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center">
          Register
        </h2>
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-center text-blue-700">
          Sudah punya akun?{" "}
          <Link href="/auth/login" className="underline">
            Login di sini
          </Link>
        </p>
        <input
          type="submit"
          value="Daftar"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 cursor-pointer"
        />
      </form>
    </section>
  );
}
