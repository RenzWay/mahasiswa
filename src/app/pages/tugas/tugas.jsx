"use client";

import ToolBar from "./toolbar";
import TaskList from "./tasklist";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default function TugasPage() {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("tinggi");
  const [category, setCategory] = useState("matkul");
  const [status, setStatus] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  function loadEditForm(tugas) {
    setTitle(tugas.title);
    setDate(tugas.date);
    setTime(tugas.time);
    setPriority(tugas.priority);
    setCategory(tugas.category);
    setStatus(tugas.status);
    setAttachment(tugas.attachment);
    setEditId(tugas.id);
    setEditMode(true);
    if (quillRef.current) {
      quillRef.current.root.innerHTML = tugas.content;
    }

    document.getElementById("formTugas").scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    window.hljs = hljs;
    import("quill").then((Quill) => {
      quillRef.current = new Quill.default("#editor", {
        theme: "snow",
        modules: {
          syntax: true,
          toolbar: "#toolbar-container",
        },
        placeholder: "Isi tugas anda...",
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = randomId();
    const content = quillRef.current ? quillRef.current.root.innerHTML : "";

    const tugas = {
      id,
      title,
      date,
      time,
      priority,
      category,
      status,
      content,
      attachment: attachment,
    };

    let tugasLama = JSON.parse(localStorage.getItem("tugas")) || [];
    if (editMode) {
      tugasLama = tugasLama.map((t) => (t.id === editId ? tugas : t));
    } else {
      tugasLama.push(tugas);
    }

    // tugasLama.push(tugas);
    localStorage.setItem("tugas", JSON.stringify(tugasLama));
    alert("Tugas disimpan ke localStorage!");

    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setPriority("tinggi");
    setCategory("matkul");
    setStatus(false);
    setAttachment(null);
    setEditMode(false);
    setEditId(null);
    if (quillRef.current) {
      quillRef.current.root.innerHTML = "";
    }
  };

  return (
    <section>
      <header>
        <nav className="flex items-center justify-between px-6 py-4 bg-sky-400 text-white rounded-b-sm shadow-md mb-6">
          <h1 className="text-2xl font-bold">📌 Tugas</h1>
        </nav>
      </header>

      <form
        onSubmit={handleSubmit}
        action=""
        className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded shadow"
        id="formTugas"
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Tambah Tugas</h1>
        <div>
          <label htmlFor="title" className="font-medium">
            Judul Tugas
          </label>
          <input
            type="text"
            id="title"
            className="block w-full border rounded p-2 mt-1 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="date" className="font-medium">
              Tanggal Deadline
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full border rounded p-2 mt-1 transition-all"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="font-medium">
              Waktu Deadline
            </label>
            <input
              type="time"
              name="time"
              id="time"
              className="block w-full border rounded p-2 mt-1 transition-all"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="priority" className="font-medium">
            Prioritas
          </label>
          <select
            id="priority"
            className="block w-full border rounded p-2 mt-1 transition-all"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="tinggi">Tinggi</option>
            <option value="sedang">Sedang</option>
            <option value="rendah">Rendah</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="font-medium">
            Kategori
          </label>
          <select
            id="category"
            className="block w-full border rounded p-2 mt-1 transition-all"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="matkul">Matkul</option>
            <option value="pribadi">Pribadi</option>
            <option value="organisasi">Organisasi</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="">
          <label htmlFor="content" className="font-medium">
            Isi Tugas
          </label>
          <ToolBar></ToolBar>
          <div className="h-56 border rounded transition-all" id="editor"></div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="status"
            className="transition-all"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
          <label htmlFor="status">Selesai</label>
        </div>
        <div>
          <label htmlFor="attachment" className="font-medium">
            Lampiran (opsional)
          </label>
          <input
            type="file"
            id="attachment"
            className="block w-full mt-1"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded p-2 mt-4"
        >
          Simpan Tugas
        </button>
      </form>

      <div className="w-full bg-white p-6 shadow-md mt-[2em]">
        <div className="relative w-full max-w-3xl mx-auto">
          <input
            type="search"
            placeholder="Cari tugas... 🔍 "
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all duration-200 ease-in-out"
          />
        </div>
      </div>

      <TaskList onedit={loadEditForm} />
    </section>
  );
}

function randomId() {
  const idDate = new Date().getTime().toString(36);
  const idRand = Math.random().toString(36).substring(2, 8);
  return `Maba-${idDate + idRand}`;
}
