import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { storage } from "./config";

export default async function uploadFile(file) {
  if (!file) {
    return null;
  }
  const storageRef = ref(storage, `attachments/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
