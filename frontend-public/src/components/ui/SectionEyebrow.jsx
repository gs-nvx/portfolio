export default function SectionEyebrow({ label, dark = false }) {
  const lineColor = dark ? "#d4d9d2" : "#d4d9d2";
  const textColor = dark ? "#0f9e7e" : "#0f9e7e";

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
