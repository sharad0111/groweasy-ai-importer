"use client";

import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileUpload: (file: File) => void;
}

export default function UploadBox({ onFileUpload }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    onDrop: (files) => {
      if (files.length > 0) {
        onFileUpload(files[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${
        isDragActive
          ? "border-blue-600 bg-blue-50"
          : "border-gray-300 hover:border-blue-500"
      }`}
    >
      <input {...getInputProps()} />

      <Upload className="mx-auto mb-4" size={50} />

      <h2 className="text-xl font-bold">
        Drag & Drop CSV Here
      </h2>

      <p className="mt-2 text-gray-500">
        or click to browse
      </p>
    </div>
  );
}