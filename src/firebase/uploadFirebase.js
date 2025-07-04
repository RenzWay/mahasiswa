import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export async function uploadToFirebase(file) {
  if (!file) return "";
  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `attachments/${fileName}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Upload error:", error.message);
    return "";
  }
}
