import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Simpan tugas (pakai setDoc agar id custom, atau addDoc untuk auto id)
export async function saveTugasToFirestore(uid, tugas) {
  try {
    await setDoc(
      doc(collection(db, "tugas", uid, "items"), String(tugas.id)),
      tugas,
    );
    return true;
  } catch (error) {
    console.error("Firestore Save Error:", error.message);
    return false;
  }
}

// Ambil semua tugas user tertentu
export async function getTugasByUser(uid) {
  try {
    const q = collection(db, "tugas", uid, "items");
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Firestore Get Error:", error.message);
    return [];
  }
}

export async function deleteTugas(uid, id) {
  try {
    const docRef = doc(db, "tugas", uid, "items", String(id));
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}
