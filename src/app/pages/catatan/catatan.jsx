"use client";

import ToolBar from "../tugas/toolbar";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar22 } from "@/app/utils/calendar.jsx";

export default function CatatanPage() {
  const quillRef = useRef(null);
  const [catatan, setCatatan] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contentQuill = quillRef.current?.root?.innerHTML ?? "";
    if (!title || !contentQuill || !date) {
      alert("Harap isi semua field sebelum menyimpan catatan.");
      return;
    }

    const id = randomId();
    const catatanObj = {
      id,
      title,
      content: contentQuill,
      category,
      date,
      favorite,
    };

    const data = localStorage.getItem("catatan");
    const catatanLama = data ? JSON.parse(data) : [];
    const catatanBaru = [...catatanLama, catatanObj];

    localStorage.setItem("catatan", JSON.stringify(catatanBaru));
    setCatatan(catatanBaru);

    setTitle("");
    setContent("");
    setCategory("");
    setDate("");
    setFavorite(false);

    if (quillRef.current) quillRef.current.root.innerHTML = "";
  };

  useEffect(() => {
    const data = localStorage.getItem("catatan");
    setCatatan(data ? JSON.parse(data) : []);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("highlight.js").then((hljsModule) => {
        window.hljs = hljsModule.default;

        import("quill").then((QuillModule) => {
          const Quill = QuillModule.default;
          const editorEl = document.getElementById("editor");
          if (editorEl) {
            const quill = new Quill(editorEl, {
              theme: "snow",
              modules: {
                syntax: true,
                toolbar: "#toolbar-container",
              },
              placeholder: "Tulis catatanmu di sini...",
            });
            quillRef.current = quill;
          }
        });
      });
    }
  }, []);

  return (
    <section className="pb-20">
      <header className="mb-6 p-6 rounded-b-xl bg-gradient-to-r from-blue-100 via-sky-50 to-cyan-100 shadow-md">
        <p className="text-sky-800 mt-1 text-2xl font-bold tracking-wide text-center">
          📒 Tulis dan simpan catatanmu di sini.
        </p>
      </header>

      <form
        className="space-y-6 max-w-3xl mx-auto p-10 mt-10 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 backdrop-blur-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-extrabold text-sky-700 text-center mb-6">
          Buat Catatan
        </h1>

        <div>
          <label
            htmlFor="title"
            className="block font-semibold text-gray-800 mb-1"
          >
            Judul
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Contoh: Rencana Mingguan"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition-all shadow-sm"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block font-semibold text-gray-800 mb-1"
          >
            Isi Catatan
          </label>
          <ToolBar />
          <div
            className="w-full min-h-[200px] px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition-all shadow-sm"
            id="editor"
          ></div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block font-semibold text-gray-800 mb-1"
          >
            Kategori
          </label>
          <select
            id="category"
            name="category"
            value={category}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white transition-all shadow-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Pilih Kategori</option>
            <option value="kuliah">Kuliah</option>
            <option value="pribadi">Pribadi</option>
            <option value="proyek">Proyek</option>
            <option value="lain-lain">Lain-lain</option>
          </select>
        </div>

        <div>
          <Calendar22 date={date} setDate={setDate} />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="favorite"
            name="favorite"
            checked={favorite}
            className="mr-2"
            onChange={(e) => setFavorite(e.target.checked)}
          />
          <label htmlFor="favorite" className="text-gray-700">
            Tandai sebagai favorit
          </label>
        </div>

        <div>
          <Button
            variant="contained"
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Simpan Catatan
          </Button>
        </div>
      </form>

      <div className="bg-gradient-to-b from-sky-100 to-sky-200 rounded-2xl border border-slate-200 shadow-md p-6 mx-auto mt-10 max-w-7xl">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📚 Catatan Pribadi
          </h1>
          <h2 className="text-lg text-gray-600">Daftar Catatan:</h2>
        </header>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-4">
          {catatan.length === 0 ? (
            <p className="text-gray-500">Belum ada catatan.</p>
          ) : (
            catatan.map((item) => (
              <Card
                key={item.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {item.date} • {item.category}
                  </p>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />

                  {item.favorite && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-full">
                      ⭐ Favorit
                    </span>
                  )}

                  <div className="mt-4 flex gap-2 justify-end">
                    <Button color="warning" variant="contained">
                      Favorite
                    </Button>
                    <Button color="success" variant="contained">
                      Edit
                    </Button>
                    <Button color="error" variant="contained">
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function randomId() {
  const idDate = new Date().getTime().toString(36);
  const idRand = Math.random().toString(36).substring(2, 8);
  return `MabaCatatan-${idDate + idRand}`;
}
