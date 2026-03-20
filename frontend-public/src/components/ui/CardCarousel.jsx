import { useState, useRef, useEffect } from "react";

export default function CardCarousel({
  items,
  renderCard,
  itemWidth = 320,
  gap = 20,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const [current, setCurrent] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const touchStartX = useRef(null);
  const total = items.length;
  const step = itemWidth + gap;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) next();
    else if (delta < -50) prev();
    touchStartX.current = null;
  };

  const btnStyle = (disabled, hovered) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    background: hovered
      ? "radial-gradient(circle, #c2d0c5 11%, #34d5a8 60%, transparent 100%)"
      : "#ffffff",
    border: hovered ? "0.5px solid #34d5a8" : "0.5px solid #c2d0c5",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    color: hovered ? "#ffffff" : "#3d5c47",
    fontSize: "16px",
    transition: "background 1.5s ease, color 0.5s ease, border 0.2s ease",
    boxShadow: hovered
      ? "0 2px 8px rgba(15,110,86,0.25)"
      : "0 1px 4px rgba(0,0,0,0.08)",
  });

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Freccia sinistra */}
      {!isMobile && (
        <button
          onClick={prev}
          disabled={current === 0}
          onMouseEnter={() => setHoverPrev(true)}
          onMouseLeave={() => setHoverPrev(false)}
          style={{ ...btnStyle(current === 0, hoverPrev), left: "-50px" }}
        >
          ❮
        </button>
      )}

      {/* Track */}
      <div
        style={{ overflow: "hidden", width: "100%" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `translateX(calc(-${current} * ${step}px))`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: `${itemWidth}px`,
                maxWidth: `${itemWidth}px`,
                flex: "0 0 auto",
              }}
            >
              {renderCard(item, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Freccia destra */}
      {!isMobile && (
        <button
          onClick={next}
          disabled={current === total - 1}
          onMouseEnter={() => setHoverNext(true)}
          onMouseLeave={() => setHoverNext(false)}
          style={{
            ...btnStyle(current === total - 1, hoverNext),
            right: "-50px",
          }}
        >
          ❯
        </button>
      )}

      {/* Dots */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "99px",
              background: i === current ? "#0f9e7e" : "#c2d0c5",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
