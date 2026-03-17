export default function SectionEyebrow({ label, dark = false }) {
  const lineColor = dark ? "#1a2e3a" : "#dceae5";
  const textColor = dark ? "#34d5a8" : "#0b7a5a";

  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="h-px w-10" style={{ background: lineColor }} />
      <span
        style={{ fontFamily: "'DM Mono', monospace", color: textColor }}
        className="text-[10px] uppercase tracking-widest"
      >
        {label}
      </span>
      <span className="h-px w-10" style={{ background: lineColor }} />
    </div>
  );
}
