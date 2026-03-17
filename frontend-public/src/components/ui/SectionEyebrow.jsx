export default function SectionEyebrow({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="h-px w-10" style={{ background: "#1a2e24" }} />
      <span
        style={{ fontFamily: "'DM Mono', monospace" }}
        className="text-[10px] text-teal-400 uppercase tracking-widest"
      >
        {label}
      </span>
      <span className="h-px w-10" style={{ background: "#1a2e24" }} />
    </div>
  );
}
