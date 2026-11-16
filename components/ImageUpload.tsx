"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface ImageUploadProps {
  onUpload: (url: string, publicId: string) => void;
  initialImage?: string;
}
export default function ImageUpload({
  onUpload,
  initialImage,
}: ImageUploadProps) {
  const [preview, setPreview] = useState(initialImage || "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        onUpload(data.image.url, data.image.public_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border rounded p-2"
      />

      {loading && <p className="text-blue-600">Uploading Image...</p>}

      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 rounded border object-cover"
          />
        </div>
      )}
    </div>
  );
}
