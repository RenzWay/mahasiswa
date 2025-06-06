"use client";
import { addTugas } from "@/app/model/model";
import uploadFile from "@/firebase/uploadFile";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { EditIcon, CheckCheckIcon, Trash2Icon, Edit } from "lucide-react";

export default function TugasPage() {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("tinggi");
  const [category, setCategory] = useState("matkul");
  const [status, setStatus] = useState(false);
  const [attachment, setAttachment] = useState(null);

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

    let fireURL = null;
    if (attachment) {
      fireURL = await uploadFile(attachment);
    }
    const tugas = {
      id,
      title,
      date,
      time,
      priority,
      category,
      status,
      content,
      attachment: fireURL,
    };

    if (attachment && attachment.size > 5 * 1024 * 1024) {
      alert("Ukuran file terlalu besar (maks 5MB)");
      return;
    }

    const hasil = await addTugas(tugas);
    if (hasil.success) {
      console.log("berhasil di tambahkan ke firebase");
    } else {
      console.error("gagal ditambahkan", hasil.error);
    }

    const tugasLama = JSON.parse(localStorage.getItem("tugas")) || [];
    tugasLama.push(tugas);
    localStorage.setItem("tugas", JSON.stringify(tugasLama));
    alert("Tugas disimpan ke localStorage!");
  };

  return (
    <section>
      <header>
        <nav className="flex items-center justify-between px-6 py-4 bg-sky-400 text-white rounded shadow-md mb-6">
          <h1 className="text-2xl font-bold">📌 Tugas</h1>

          <form>
            <input
              type="search"
              placeholder="Cari tugas..."
              className="px-4 py-2 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </form>
        </nav>
      </header>

      <form
        onSubmit={handleSubmit}
        action=""
        className="space-y-4 max-w-xl mx-auto bg-white p-6 rounded shadow"
      >
        <h1 className="text-xl font-bold mb-2">Tambah Tugas</h1>
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
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="date" className="font-medium">
              Tanggal Deadline
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="block w-full border rounded p-2 mt-1"
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
              className="block w-full border rounded p-2 mt-1"
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

        <div className="">
          <label htmlFor="content" className="font-medium">
            Isi Tugas
          </label>
          {toolBar()}
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

      <div>{taskList()}</div>
    </section>
  );
}

function taskList() {
  const [active, setActive] = useState("semua");
  const [tugasStorage, setTugasStorage] = useState([]);

  useEffect(() => {
    const tugas = JSON.parse(localStorage.getItem("tugas"));
    setTugasStorage(tugas || []);
    console.log(tugas);
  }, []);

  const filteredTugas = tugasStorage.filter((tugas) => {
    if (active === "semua") return true;
    if (active === "selesai") return tugas.status === true;
    if (active === "belum") return tugas.status === false;
    return true;
  });
  return (
    <div className="p-10 m-12 bg-white rounded-md shadow-md">
      <h1 className="border-b border-b-neutral-400">Daftar Tugas</h1>
      <br></br>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded transition-all duration-200 ${
            active === "semua" ? "bg-blue-500 text-white" : "bg-neutral-400"
          }`}
          onClick={() => setActive("semua")}
        >
          Semua
        </button>
        <button
          className={`px-4 py-2 rounded transition-all duration-200 ${
            active === "belum" ? "bg-blue-500 text-white" : "bg-neutral-400"
          }`}
          onClick={() => setActive("belum")}
        >
          Belum selesai
        </button>
        <button
          className={`px-4 py-2 rounded transition-all duration-200 ${
            active === "selesai" ? "bg-blue-500 text-white" : "bg-neutral-400"
          }`}
          onClick={() => setActive("selesai")}
        >
          Selesai
        </button>
      </div>

      {filteredTugas.length > 0 ? (
        <ul className="flex flex-col gap-6 mt-6">
          {filteredTugas.map((row) => (
            <li
              key={row.id}
              className="bg-white shadow-md p-6 rounded-xl border border-gray-200"
            >
              {/* Header */}
              <header className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {row.title}
                </h2>

                <div className="flex gap-3">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      row.priority === "tinggi"
                        ? "bg-red-100 text-red-700"
                        : row.priority === "sedang"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Prioritas: {row.priority}
                  </span>

                  <div>
                    <button title="Selesai">
                      <CheckCheckIcon className="text-green-500" />
                    </button>
                    <button title="Edit">
                      <EditIcon className="text-sky-500" />
                    </button>
                    <button title="Buang">
                      <Trash2Icon className="text-rose-500" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Meta info */}
              <div className="text-sm text-gray-500 mb-2 flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Kategori: {row.category}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Deadline: {row.date} {row.time}
                </span>
                <span
                  className={`${
                    row.status
                      ? "text-green-600 bg-green-100"
                      : "text-orange-600 bg-orange-100"
                  } px-2 py-1 rounded`}
                >
                  {row.status ? "✔ Selesai" : "⏳ Belum selesai"}
                </span>
              </div>

              {/* Content isi tugas */}
              <div
                className="ql-editor border-none p-0 text-gray-800"
                dangerouslySetInnerHTML={{ __html: row.content }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1>None task</h1>
      )}
    </div>
  );
}

function randomId() {
  const idDate = new Date().getTime().toString(36);
  const idRand = Math.random().toString(36).substring(2, 8);
  return `Maba-${idDate + idRand}`;
}

const toolBar = () => {
  return (
    <div className="" id="toolbar-container">
      <span className="ql-formats">
        <select className="ql-font"></select>
        <select className="ql-size"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color"></select>
        <select className="ql-background"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-header" value="1"></button>
        <button className="ql-header" value="2"></button>
        <button className="ql-blockquote"></button>
        <button className="ql-code-block"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-direction" value="rtl"></button>
        <select className="ql-align"></select>
      </span>
      <span className="ql-formats">
        <button className="ql-link"></button>
        <button className="ql-image"></button>
        <button className="ql-video"></button>
        <button className="ql-formula"></button>
      </span>
      <span className="ql-formats">
        <button className="ql-clean"></button>
      </span>
    </div>
  );
};
