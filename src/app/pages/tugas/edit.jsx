"use client";
import { useState, useEffect } from "react";

export default function EditPage() {
  return (
    <section>
      <h1>edit</h1>

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
          <ToolBar></ToolBar>
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
    </section>
  );
}
