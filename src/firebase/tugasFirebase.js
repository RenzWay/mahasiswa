import { ref, set, get, child } from "firebase/database";
import { db } from "@/firebase/firebase";

export async function saveTugasToFirebase(tugas) {
  try {
    await set(ref(db, `tugas/${tugas.id}`), tugas);
    return true;
  } catch (error) {
    console.error("Firebase Save Error:", error.message);
    return false;
  }
}

export async function getTugasByUser(uid) {
  try {
    const snapshot = await get(child(ref(db), "tugas"));
    if (snapshot.exists()) {
      const all = snapshot.val();
      return Object.values(all).filter((t) => t.uid === uid);
    }
    return [];
  } catch (error) {
    console.error("Firebase Get Error:", error.message);
    return [];
  }
}
