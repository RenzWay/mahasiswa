"use client";
import { useState, useEffect } from "react";
import { EditIcon, CheckCheckIcon, Trash2Icon, X } from "lucide-react";

export default function TaskList({ onedit }) {
  const [active, setActive] = useState("semua");
  const [tugasStorage, setTugasStorage] = useState([]);

  // useEffect untuk memuat data dari localStorage saat komponen pertama kali di-mount
  useEffect(() => {
    const tugas = JSON.parse(localStorage.getItem("tugas"));
    setTugasStorage(tugas || []);
    console.log(tugas);
  }, []);

  // Fungsi untuk menghapus tugas
  function DeleteTask(id) {
    const currentTugas = JSON.parse(localStorage.getItem("tugas")) || [];
    const update = currentTugas.filter((row) => row.id !== id);

    localStorage.setItem("tugas", JSON.stringify(update));
    setTugasStorage(update);
}

  // Fungsi untuk menandai tugas selesai
  function finishedTask(id) {
    const update = tugasStorage.map((item) => {
      if (item.id === id) {
        return { ...item, status: true };
      }
      return item;
    });

    setTugasStorage(update);
    localStorage.setItem("tugas", JSON.stringify(update));
  }

  // Fungsi untuk menandai tugas belum selesai
  function unFinishedTask(id) {
    const update = tugasStorage.map((item) => {
      if (item.id === id) {
        return { ...item, status: false };
      }
      return item;
    });

    setTugasStorage(update);
    localStorage.setItem("tugas", JSON.stringify(update));
  }

  // Filter tugas berdasarkan status aktif (semua, selesai, belum)
  const filteredTugas = tugasStorage.filter((tugas) => {
    if (active === "semua") return true;
    if (active === "selesai") return tugas.status === true;
    if (active === "belum") return tugas.status === false;
    return true; // Seharusnya tidak pernah tercapai, tapi untuk jaga-jaga
  });

  return (
    <div className="p-10 m-12 bg-white rounded-md shadow-md">
      <h1 className="border-b border-b-neutral-400">Daftar Tugas</h1>
      <br /> {/* Menggunakan self-closing tag untuk br */}
      <div className="flex gap-4">
        {/* Tombol filter "Semua" */}
        <button
          className={`px-4 py-2 rounded transition-all duration-200 ${
            active === "semua" ? "bg-blue-500 text-white" : "bg-neutral-400"
          }`}
          onClick={() => setActive("semua")}
        >
          Semua
        </button>
        {/* Tombol filter "Belum selesai" */}
        <button
          className={`px-4 py-2 rounded transition-all duration-200 ${
            active === "belum" ? "bg-blue-500 text-white" : "bg-neutral-400"
          }`}
          onClick={() => setActive("belum")}
        >
          Belum selesai
        </button>
        {/* Tombol filter "Selesai" */}
        <button
          className={`px-4 py-2 rounded transition-all duration-200 ${
            active === "selesai" ? "bg-blue-500 text-white" : "bg-neutral-400"
          }`}
          onClick={() => setActive("selesai")}
        >
          Selesai
        </button>
      </div>
      {/* Menampilkan daftar tugas jika ada, atau "None task" jika kosong */}
      {filteredTugas.length > 0 ? (
        <ul className="flex flex-col gap-6 mt-6">
          {filteredTugas.map((row) => (
            <li
              key={row.id}
              className="bg-white shadow-md p-6 rounded-xl border border-gray-200"
              id="itemTask" // ID ini tidak unik per item, sebaiknya hapus atau jadikan unik
            >
              {/* Header Tugas */}
              <header className="flex justify-between items-center mb-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {row.title}
                </h2>

                <div className="flex gap-3">
                  {/* Prioritas Tugas */}
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

                  {/* Tombol Aksi (Status, Edit, Hapus) */}
                  <div>
                    <button
                      onClick={() => {
                        if (row.status === true) {
                          unFinishedTask(row.id); // Jika sudah selesai, tandai belum selesai
                        } else {
                          finishedTask(row.id); // Jika belum selesai, tandai selesai
                        }
                      }}
                      title={
                        row.status === true
                          ? "Tandai Belum Selesai" // Judul tombol saat status selesai
                          : "Tandai Selesai" // Judul tombol saat status belum selesai
                      }
                    >
                      {row.status === true ? (
                        <X className="text-red-500" /> // Ikon 'X' jika status selesai
                      ) : (
                        <CheckCheckIcon className="text-green-500" /> // Ikon ceklis jika status belum selesai
                      )}
                    </button>

                    {/* Tombol Edit */}
                    <button title="Edit" onClick={() => onedit(row)}>
                      <EditIcon className="text-sky-500" />
                    </button>

                    {/* Tombol Hapus */}
                    <button onClick={() => DeleteTask(row.id)} title="Buang">
                      <Trash2Icon className="text-rose-500" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Info Tambahan Tugas (Kategori, Deadline, Status) */}
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

              {/* Konten Detail Tugas */}
              <div
                className="ql-editor border-none p-0 text-gray-800"
                dangerouslySetInnerHTML={{ __html: row.content }}
              />
            </li>
          ))}
        </ul>
      ) : (
        // Teks jika tidak ada tugas yang difilter
        <h1 className="mt-6 text-center text-gray-600">
          Tidak ada tugas dalam kategori ini.
        </h1>
      )}
    </div>
  );
}
