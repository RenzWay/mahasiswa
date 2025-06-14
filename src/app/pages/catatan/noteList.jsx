"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";

export default function NoteList({ onEdit }) {
  const [catatan, setCatatan] = useState([]);
  const [favoriteActive, setFavoriteActive] = useState("semua");

  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem("catatan");
      setCatatan(data ? JSON.parse(data) : []);
    };

    loadData();

    window.addEventListener("storageUpdate", loadData);
    return () => window.removeEventListener("storageUpdate", loadData);
  }, []);

  const deleteCatatan = (id) => {
    const updated = catatan.filter((item) => item.id !== id);
    setCatatan(updated);
    localStorage.setItem("catatan", JSON.stringify(updated));
  };

  const toggleFavorite = (id) => {
    const updated = catatan.map((item) =>
      item.id === id ? { ...item, favorite: !item.favorite } : item
    );
    setCatatan(updated);
    localStorage.setItem("catatan", JSON.stringify(updated));
  };

  const filteredNote = catatan.filter((note) => {
    if (favoriteActive === "semua") return true;
    if (favoriteActive === "favorite") return note.favorite === true;
    if (favoriteActive === "unfavorite") return note.favorite === false;
    return true;
  });

  return (
    <div className="bg-gradient-to-b from-sky-100 to-sky-200 rounded-2xl border border-slate-200 shadow-md p-6  mt-10 max-w-full">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          📚 Catatan Pribadi
        </h1>
        <h2 className="text-lg text-gray-600">Daftar Catatan:</h2>

        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            variant={favoriteActive === "semua" ? "contained" : "outlined"}
            color="primary"
            onClick={() => setFavoriteActive("semua")}
          >
            Semua
          </Button>

          <Button
            variant={favoriteActive === "favorite" ? "contained" : "outlined"}
            color="warning"
            onClick={() => setFavoriteActive("favorite")}
          >
            Favorite
          </Button>

          <Button
            variant={favoriteActive === "unfavorite" ? "contained" : "outlined"}
            color="error"
            onClick={() => setFavoriteActive("unfavorite")}
          >
            Unfavorite
          </Button>
        </ButtonGroup>
      </header>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 px-2 sm:px-4">
        {catatan.length === 0 ? (
          <p className="text-gray-500">Belum ada catatan.</p>
        ) : (
          filteredNote.map((item) => (
            <Card
              key={item.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {item.date} • {item.category}
                </p>
              </CardHeader>
              <CardContent>
                {item.favorite && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-200 text-yellow-800 rounded-full">
                    ⭐ Favorit
                  </span>
                )}
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <ButtonGroup className="mt-4 flex gap-1 lg:flex-wrap">
                  <Button
                    onClick={() => toggleFavorite(item.id)}
                    color="warning"
                    variant="contained"
                  >
                    {item.favorite ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button
                    onClick={() => {
                      onEdit(item);
                    }}
                    color="success"
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteCatatan(item.id)}
                    color="error"
                    variant="contained"
                  >
                    Hapus
                  </Button>
                </ButtonGroup>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
