"use client";
import { useState } from "react";

const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const jamList = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

export default function JadwalKuliah() {
  const [jadwal, setJadwal] = useState([]);
  const [form, setForm] = useState({
    mataKuliah: "",
    hari: "Senin",
    jam: "07:00",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJadwal([...jadwal, form]);
    setForm({ mataKuliah: "", hari: "Senin", jam: "07:00" });
  };

  const getJadwalFor = (hari, jam) => {
    return jadwal.find((item) => item.hari === hari && item.jam === jam);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Form Tambah Jadwal</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="mataKuliah"
          value={form.mataKuliah}
          onChange={handleChange}
          placeholder="Mata Kuliah"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="hari"
          value={form.hari}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {hariList.map((hari) => (
            <option key={hari} value={hari}>
              {hari}
            </option>
          ))}
        </select>
        <select
          name="jam"
          value={form.jam}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {jamList.map((jam) => (
            <option key={jam} value={jam}>
              {jam}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Tambah Jadwal
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10">Jadwal Kuliah</h2>
      <div className="overflow-x-auto">
        <table className="bg-white table-fixed w-full border border-gray-200 text-sm shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-indigo-900">
            <tr>
              <th className="w-20 p-2 text-left">Waktu</th>
              {hariList.map((hari) => (
                <th key={hari} className="p-2 text-center">
                  {hari}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jamList.map((jam) => (
              <tr key={jam} className="border-t">
                <td className="p-2 font-medium text-gray-700">{jam}</td>
                {hariList.map((hari) => {
                  const isi = getJadwalFor(hari, jam);
                  return (
                    <td
                      key={hari}
                      className="p-2 h-16 border-l text-center text-gray-600"
                    >
                      {isi ? (
                        <span className="inline-block px-5 py-4 bg-indigo-200 text-indigo-800 rounded text-xl font-bold">
                          {isi.mataKuliah}
                        </span>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
