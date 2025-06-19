"use client";
import { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white shadow-md p-6 rounded-xl space-y-5 border border-gray-200"
      >
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Mata Kuliah
          </label>
          <input
            name="mataKuliah"
            value={form.mataKuliah}
            onChange={handleChange}
            placeholder="Contoh: Algoritma"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Hari
          </label>
          <FormControl fullWidth size="small">
            <Select
              name="hari"
              value={form.hari}
              onChange={handleChange}
              displayEmpty
              className="bg-white rounded-lg"
            >
              {hariList.map((hari) => (
                <MenuItem key={hari} value={hari}>
                  {hari}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Jam
          </label>
          <FormControl fullWidth size="small">
            <Select
              name="jam"
              value={form.jam}
              onChange={handleChange}
              displayEmpty
              className="bg-white rounded-lg"
            >
              {jamList.map((jam) => (
                <MenuItem key={jam} value={jam}>
                  {jam}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Tambah Jadwal
        </button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mt-10">Jadwal Kuliah</h2>
        <div className="overflow-x-auto p-2 border rounded-xl bg-white shadow">
          <table className="table-auto w-full min-w-[800px] border text-sm text-gray-700">
            <thead className="bg-indigo-100 text-indigo-900">
              <tr>
                <th className="p-2 text-left whitespace-nowrap">Waktu</th>
                {hariList.map((hari) => (
                  <th key={hari} className="p-2 text-center whitespace-nowrap">
                    {hari}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jamList.map((jam) => (
                <tr key={jam} className="border-t">
                  <td className="p-2 font-medium">{jam}</td>
                  {hariList.map((hari) => {
                    const isi = getJadwalFor(hari, jam);
                    return (
                      <td
                        key={hari}
                        className="p-2 h-16 border-l text-center text-gray-600"
                      >
                        {isi ? (
                          <span className="inline-block px-3 py-2 bg-indigo-200 text-indigo-800 rounded text-sm font-semibold">
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
    </div>
  );
}
