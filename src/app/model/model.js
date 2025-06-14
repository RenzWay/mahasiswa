// "use server";

// import { db } from "@/firebase/config";
// import { collection, Timestamp, addDoc } from "firebase/firestore";

// export async function addTugas({
//   id,
//   title,
//   date,
//   time,
//   priority,
//   category,
//   status,
//   content,
//   attachment,
// }) {
//   try {
//     const docRef = await addDoc(collection(db, "tugas"), {
//       id,
//       title,
//       date,
//       time,
//       priority,
//       category,
//       status,
//       content,
//       attachment,
//       dibuat: Timestamp.now(),
//     });

//     console.log("berhasil dibuat", docRef);
//     return { success: true, id: docRef.id };
//   } catch (error) {
//     console.error(`ada error di addTugas ${error}`);
//     return { success: false, error: error.message };
//   }
// }
