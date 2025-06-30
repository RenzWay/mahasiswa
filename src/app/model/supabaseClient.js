import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Upload file ke bucket "attachments"
export async function uploadToSupabase(file) {
  if (!file) return "";
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("attachments")
    .upload(fileName, file);
  if (error) {
    console.error("Upload error:", error.message);
    return "";
  }
  const { data: urlData } = supabase.storage
    .from("attachments")
    .getPublicUrl(fileName);
  return urlData.publicUrl;
}

// Simpan atau update tugas ke tabel "tugas"
export async function saveTugasToSupabase(tugas) {
  const { error } = await supabase.from("tugas").upsert([tugas]);
  if (error) {
    console.error("Supabase Save Error:", error.message);
    return false;
  }
  return true;
}

// Ambil semua tugas user tertentu
export async function getTugasByUser(uid) {
  const { data, error } = await supabase
    .from("tugas")
    .select("*")
    .eq("uid", uid)
    .order("date", { ascending: true });

  if (error) {
    console.error("Load Error:", error.message);
    return [];
  }
  return data;
}
