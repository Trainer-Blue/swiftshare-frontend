import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react";

const url = import.meta.env.VITE_WS_URL 
  ? import.meta.env.VITE_WS_URL.replace('ws://', 'http://').replace('wss://', 'https://') 
  : "http://localhost:1234";

export const UploadButton = generateUploadButton({
  url: `${url}/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone({
  url: `${url}/api/uploadthing`,
});
