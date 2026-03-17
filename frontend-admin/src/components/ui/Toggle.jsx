export default function Toggle({ enabled, onChange, label }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors
            ${enabled ? "bg-teal-600" : "bg-gray-700"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white
          rounded-full shadow transition-transform
          ${enabled ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
      {label && <span className="text-sm text-gray-300">{label}</span>}
    </div>
  );
}
