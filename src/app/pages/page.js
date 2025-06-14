"use client";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";
import { ClipboardList, NotebookTabs, CalendarCheck2 } from "lucide-react";

import { Badge } from "@mui/material";

export default function Page() {
  const timeZone = "Asia/Jakarta";
  const [now, setNow] = useState(new Date());
  const [showDate, setShowDate] = useState("");

  const [tugasStorage, setTugasStorage] = useState([]);
  const [jumlahTugas, setJumlahtugas] = useState(0);

  const [catatanStorage, setCatatanStorage] = useState([]);
  const [jumlahCatatan, setJumlahcatatan] = useState(0);

  useEffect(() => {
    const dataTugasString = localStorage.getItem("tugas");
    const datacatatanString = localStorage.getItem("catatan");
    let dataCatatan = [];
    let dataTugas = [];

    if (dataTugasString) {
      const parsed = JSON.parse(dataTugasString);
      const parsedCatatan = JSON.parse(datacatatanString);
      if (Array.isArray(parsed)) {
        dataTugas = parsed;
        dataCatatan = parsedCatatan;
      } else {
        dataTugas = [];
        dataCatatan = [];
      }
    } else {
      dataCatatan = [];
      dataTugas = [];
    }

    setTugasStorage(dataTugas);
    setJumlahtugas(dataTugas.length);

    setCatatanStorage(dataCatatan);
    setJumlahcatatan(dataCatatan.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const zonedDate = toZonedTime(now, timeZone);
    setShowDate(
      format(zonedDate, "eeee, MM/dd/yyyy - HH:mm:ss 'WIB'", { locale: id })
    );
  }, [now, timeZone]);

  return (
    <section className="h-full">
      <header className="flex justify-end px-8 bg-white shadow-md p-4">
        <div className="text-neutral-500">
          <p>{showDate}</p>
        </div>
      </header>

      <section className="m-[2em]" role="main">
        <h2 className="text-3xl font-bold text-neutral-700 border-b border-b-neutral-500">
          Dashboard
        </h2>

        <div className="list-none mt-4 p-4 flex md:grid-cols-3 gap-4">
          <Link
            href={"/pages/tugas"}
            className="hover:-translate-y-1 transition duration-150 ease-in-out flex items-center p-6 rounded-xl text-xl font-semibold w-full md:w-1/3 bg-white border-l-4 border-blue-500 shadow-sm"
          >
            <Badge color="primary" badgeContent={jumlahTugas}>
              <ClipboardList size="2em" className="text-blue-500 mr-4" />
            </Badge>
            <div className="text-neutral-700">
              <p>{jumlahTugas} Tugas</p>
            </div>
          </Link>

          <Link
            href={"/pages/catatan"}
            className="hover:-translate-y-1 transition duration-150 ease-in-out flex items-center p-6 rounded-xl text-xl font-semibold w-full md:w-1/3 bg-white border-l-4 border-lime-500 shadow-sm"
          >
            <Badge color="success" badgeContent={jumlahCatatan}>
              <NotebookTabs size="2em" className="text-lime-500 mr-4" />
            </Badge>
            <div className="text-neutral-700">
              <p>{jumlahCatatan} Catatan</p>
            </div>
          </Link>

          <Link
            href={"/pages/jadwal"}
            className="hover:-translate-y-1 transition duration-150 ease-in-out flex items-center p-6 rounded-xl text-xl font-semibold w-full md:w-1/3 bg-white border-l-4 border-orange-500 shadow-sm"
          >
            <CalendarCheck2 size="2em" className="text-orange-500 mr-4" />
            <div className="text-neutral-700">
              <p>Jadwal</p>
            </div>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
            <h3 className="border-b border-b-neutral-700 text-xl font-semibold mb-4 text-neutral-700">
              Tugas Terbaru
            </h3>
            <ul className="space-y-2">
              {tugasStorage && jumlahTugas > 0 ? (
                tugasStorage.map((row) => (
                  <li
                    key={row.id}
                    data-id={row.id}
                    className="p-3 bg-neutral-100 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{row.title}</p>
                    </div>
                    <time className="text-sm text-gray-500">
                      {row.date} - {row.time}
                    </time>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500">Tidak ada tugas</li>
              )}
            </ul>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
            <h3 className="border-b border-b-neutral-700 text-xl font-semibold mb-4 text-neutral-700">
              Jadwal Hari Ini
            </h3>
            <ul className="space-y-2">
              <li className="p-3 bg-neutral-100 rounded-lg">
                08.00 - PWA Class
              </li>
              <li className="p-3 bg-neutral-100 rounded-lg">
                10.00 - Coding Challenge
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
