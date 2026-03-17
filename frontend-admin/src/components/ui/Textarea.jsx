export default function Textarea({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-400">{label}</label>}
      <textarea
        className={`bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm
            outline-none focus:ring-2 focus:ring-teal-500
            border border-gray-700 focus:border-teal-500
            resize-y min-h-32
            ${error ? "border-red-500" : ""}
            ${className}`}
        {...props}
      />
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
}
