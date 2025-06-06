import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "mahasiswa-center.firebaseapp.com",
//   databaseURL:
//     "https://mahasiswa-center-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "mahasiswa-center",
//   storageBucket: "mahasiswa-center.firebasestorage.app",
//   messagingSenderId: "721715615870",
//   appId: "1:721715615870:web:e528329390b401846ce02f",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Ini akan otomatis 'mahasiswa-center' jika Anda set env var-nya
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Opsional
};

// 2. Inisialisasi Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 3. Dapatkan referensi ke database Firestore
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };

// Sekarang Anda bisa menggunakan objek 'db' untuk membaca dan menulis data!
// Contoh, untuk mendapatkan referensi ke koleksi bernama 'users':
// const usersCollection = collection(db, 'users');
// Dan untuk menambahkan dokumen baru:
/*
async function addUser() {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      name: "Ada Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Panggil fungsi untuk menambahkan data
// addUser();
*/
