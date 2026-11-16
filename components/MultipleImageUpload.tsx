"use client";
interface ImageType {
  url: string;
  public_id: string;
}
interface MultipleImageUploadProps {
  initialImages?: ImageType[];
  onUpload: (images: ImageType[]) => void;
}
import { ChangeEvent, useEffect, useState } from "react";

export default function MultipleImageUpload({
  onUpload,
  initialImages = [],
}: MultipleImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setExistingImages(initialImages ?? []);
  }, [initialImages]);
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const previewImages = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );
    setPreviews(previewImages);
    setExistingImages([]);
    const uploadImages = [];
    try {
      setLoading(true);
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          uploadImages.push(data.image);
        }
      }
      console.log("Upload Images:", uploadImages);
      onUpload(uploadImages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="font-medium">Product Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full border rounded p-2"
      />
      {loading && <p className="text-blue-600">Uploading Images</p>}

      {existingImages.length > 0 ? (
        <div className="flex gap-3 flex-wrap mt-4">
          {existingImages.map((image) => (
            <img
              key={image.public_id}
              src={image.url}
              alt="Product"
              className="w-24 h-24 rounded border object-cover"
            />
          ))}
        </div>
      ) : (
        previews.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                className="w-24 h-24 rounded border object-cover"
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
