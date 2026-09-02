import {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  isFirebaseConfigured
} from "../firebase/storage";

export const storageService = {
  // Upload file (images or resume pdf)
  async uploadFile(file, folder = "uploads") {
    if (!file) throw new Error("No file provided");

    if (isFirebaseConfigured && storage) {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } else {
      // Local preview mode: Convert to data URL for immediate testing
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    }
  }
};
