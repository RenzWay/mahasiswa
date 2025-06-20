"use client";

import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";

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
  const [editIndex, setEditIndex] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTarget, setMenuTarget] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("jadwalKuliah");
    if (data) setJadwal(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("jadwalKuliah", JSON.stringify(jadwal));
  }, [jadwal]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...form };

    if (editIndex !== null) {
      const update = [...jadwal];
      update[editIndex] = newData;
      setJadwal(update);
      setEditIndex(null);
    } else {
      setJadwal([...jadwal, newData]);
    }

    setForm({ mataKuliah: "", hari: "Senin", jam: "07:00" });
  };

  const handleEdit = (item, index) => {
    setForm(item);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const update = [...jadwal];
    update.splice(index, 1);
    setJadwal(update);
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuTarget(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuTarget(null);
  };

  const getJadwalFor = (hari, jam) => {
    return jadwal
      .map((item, index) => ({ ...item, index }))
      .filter((item) => item.hari === hari && item.jam === jam);
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

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          {editIndex !== null ? "Update Jadwal" : "Tambah Jadwal"}
        </Button>
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
                    const isiList = getJadwalFor(hari, jam);
                    return (
                      <td
                        key={hari}
                        className="p-2 h-16 border-l text-center text-gray-600"
                      >
                        <div className="flex flex-col items-center gap-2">
                          {isiList.map((isi, i) => (
                            <div
                              key={i}
                              className="relative bg-indigo-200 text-indigo-800 px-3 py-1 rounded text-sm font-semibold w-full max-w-[150px]"
                            >
                              {isi.mataKuliah}
                              <Box className="absolute top-1 right-1">
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleMenuClick(e, isi.index)}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleEdit(jadwal[menuTarget], menuTarget);
            handleMenuClose();
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDelete(menuTarget);
            handleMenuClose();
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Hapus
        </MenuItem>
      </Menu>
    </div>
  );
}
