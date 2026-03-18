export default function ValidatedInput({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  multiline = false,
  rows = 3,
}) {
  const borderColor = error ? "#7a1a1a" : "#dceae5";
  const focusShadow = error ? "0 0 0 2px rgba(122,26,26,0.15)" : "none";

  const baseStyle = {
    background: "#fff",
    border: `0.5px solid ${borderColor}`,
    color: "#8ab8a8",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {error && (
        <span
          style={{
            fontSize: "11px",
            color: "#7a1a1a",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {error}
        </span>
      )}
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          style={{ ...baseStyle, resize: "none" }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={baseStyle}
        />
      )}
    </div>
  );
}
