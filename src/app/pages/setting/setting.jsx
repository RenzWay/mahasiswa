"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Switch,
  FormControlLabel,
  TextField,
  Paper,
} from "@mui/material";
import { useTheme } from "next-themes";

export default function SettingPage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [username, setUsername] = useState("");

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("username", username);
    alert("Pengaturan disimpan!");
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 transition-colors">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Pengaturan
      </h1>

      <Paper className="p-6 space-y-6" elevation={2}>
        <TextField
          label="Nama Pengguna"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={currentTheme === "dark"}
              onChange={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              color="primary"
            />
          }
          label="Mode Gelap"
        />

        <Button variant="contained" onClick={handleSave}>
          Simpan Pengaturan
        </Button>
      </Paper>
    </section>
  );
}
