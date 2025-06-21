"use client";

import ToolBar from "./toolbar";
import TaskList from "./tasklist";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Calendar22 } from "@/app/utils/calendar";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { auth, db } from "@/firebase/firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref, set, update, onValue } from "firebase/database";

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
  const [tugasList, setTugasList] = useState([]);

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

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;
      const tugasRef = ref(db, `tugas/${user.uid}`);
      onValue(tugasRef, (snapshot) => {
        const data = snapshot.val();
        let list = [];
        if (data) {
          Object.entries(data).forEach(([id, value]) => {
            list.push({ id, ...value });
          });
        } else {
          // fallback ke localStorage jika firebase kosong
          const local = localStorage.getItem("tugas");
          if (local) {
            list = JSON.parse(local);
          }
        }
        setTugasList(list);
      });
    });

    return () => unsubscribe();
  }, []);

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

  const uploadAttachment = async (file) => {
    if (!file) return "";
    const storage = getStorage();
    const fileRef = storageRef(
      storage,
      `attachments/${Date.now()}-${file.name}`
    );
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Harus login terlebih dahulu");
      return;
    }

    const id = editMode && editId ? editId : randomId();
    const content = quillRef.current ? quillRef.current.root.innerHTML : "";
    const attachmentUrl = await uploadAttachment(attachment);

    const tugas = {
      id,
      uid: user.uid,
      title,
      date,
      time,
      priority,
      category,
      status,
      content,
      attachment: attachmentUrl,
    };

    const tugasRef = ref(db, `tugas/${user.uid}/${id}`);
    if (editMode) {
      await update(tugasRef, tugas);
    } else {
      await set(tugasRef, tugas);
    }

    const localTugas = JSON.parse(localStorage.getItem("tugas")) || [];
    const updatedLocal = editMode
      ? localTugas.map((t) => (t.id === id ? tugas : t))
      : [...localTugas, tugas];
    localStorage.setItem("tugas", JSON.stringify(updatedLocal));
    setTugasList(updatedLocal);

    alert("Tugas berhasil disimpan!");
    resetForm();
  };

  const resetForm = () => {
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-2xl mx-auto bg-white p-6 rounded shadow"
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
              className="block w-full border rounded p-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Calendar22 setDate={setDate} date={date} />
            </div>
            <div className="flex-1">
              <label htmlFor="time" className="font-medium">
                Waktu Deadline
              </label>
              <MobileTimePicker
                defaultValue={dayjs()}
                onChange={(value) => setTime(value.format("HH:mm"))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="priority" className="font-medium">
              Prioritas
            </label>
            <select
              id="priority"
              className="block w-full border rounded p-2 mt-1"
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
              className="block w-full border rounded p-2 mt-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="matkul">Matkul</option>
              <option value="pribadi">Pribadi</option>
              <option value="organisasi">Organisasi</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label htmlFor="content" className="font-medium">
              Isi Tugas
            </label>
            <ToolBar />
            <div className="h-56 border rounded" id="editor"></div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="status"
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
      </LocalizationProvider>

      <div className="w-full px-4 mt-10">
        <div className="w-full max-w-3xl mx-auto">
          <input
            type="search"
            placeholder="Cari tugas... 🔍"
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all"
          />
        </div>
      </div>

      <TaskList onedit={loadEditForm} tugas={tugasList} />
    </section>
  );
}

function randomId() {
  const idDate = new Date().getTime().toString(36);
  const idRand = Math.random().toString(36).substring(2, 8);
  return `Maba-${idDate + idRand}`;
}
