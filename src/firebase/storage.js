import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable
} from "firebase/storage";
import { storage, isFirebaseConfigured } from "./config";

export {
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  isFirebaseConfigured
};
