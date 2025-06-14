"use client";

import ToolBar from "../tugas/toolbar";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { Calendar22 } from "@/app/utils/calendar.jsx";
import NoteList from "./noteList";

export default function CatatanPage() {
  const quillRef = useRef(null);
  const [catatan, setCatatan] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [favorite, setFavorite] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const loadEditForm = (note) => {
    setTitle(note.title);
    setCategory(note.category);
    setDate(note.date);
    setFavorite(note.favorite);
    setEditId(note.id);
    setEditMode(true);
    if (quillRef.current) {
      quillRef.current.root.innerHTML = note.content;
    }

    document.getElementById("formNote").scrollIntoView({ behavior: "smooth" });
  };

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
    let catatanLama = data ? JSON.parse(data) : [];
    let catatanBaru;

    if (editMode) {
      catatanBaru = catatanLama.map((t) =>
        t.id === editId ? { ...catatanObj, id: editId } : t
      );
    } else {
      catatanBaru = [...catatanLama, catatanObj];
    }

    localStorage.setItem("catatan", JSON.stringify(catatanBaru));
    setCatatan(catatanBaru);

    setTitle("");
    setCategory("");
    setDate("");
    setFavorite(false);
    setEditMode(false);
    setEditId(null);
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
    <section className="pb-20 px-4 md:px-10 lg:px-10">
      <header className="mb-6 p-6 rounded-b-xl bg-gradient-to-r from-blue-100 via-sky-50 to-cyan-100 shadow-md">
        <p className="text-sky-800 mt-1 text-2xl font-bold tracking-wide text-center">
          📒 Tulis dan simpan catatanmu di sini.
        </p>
      </header>

      <form
        className="space-y-6 w-full max-w-3xl mx-auto p-6 md:p-10 mt-10 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 backdrop-blur-md"
        onSubmit={handleSubmit}
        id="formNote"
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
            className="w-full min-h-[200px] px-4 py-2 border border-gray-300 rounded-xl bg-white"
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

        <Calendar22 date={date} setDate={setDate} />

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

        <Button
          variant="contained"
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Simpan Catatan
        </Button>
      </form>

      <NoteList onEdit={loadEditForm} />
    </section>
  );
}

function randomId() {
  const idDate = new Date().getTime().toString(36);
  const idRand = Math.random().toString(36).substring(2, 8);
  return `MabaCatatan-${idDate + idRand}`;
}
