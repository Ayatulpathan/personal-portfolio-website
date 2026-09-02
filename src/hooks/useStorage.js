import { useState } from "react";
import { storageService } from "../services/storageService";

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file, folder = "uploads") => {
    try {
      setUploading(true);
      setError(null);
      setProgress(25);
      const url = await storageService.uploadFile(file, folder);
      setProgress(100);
      return url;
    } catch (err) {
      setError(err.message || "Failed to upload file");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadFile,
    uploading,
    progress,
    error
  };
}

export default useStorage;
