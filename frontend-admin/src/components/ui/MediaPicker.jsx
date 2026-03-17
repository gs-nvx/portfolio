import { useState } from "react";
import { uploadMedia } from "../../api/mediaApi";

export default function MediaPicker({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const res = await uploadMedia(file);
      onChange(res.data.url);
    } catch {
      setError("Errore durante il caricamento");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL immagine"
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2.5
            text-sm border border-gray-700 outline-none focus:ring-2
            focus:ring-indigo-500"
        />
        <label
          className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600
          text-white rounded-lg text-sm cursor-pointer transition"
        >
          {uploading ? "Caricamento..." : "Carica"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          className="w-32 h-20 object-cover rounded-lg border border-gray-700"
        />
      )}
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}
