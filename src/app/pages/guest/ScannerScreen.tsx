import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1707193393457-dcc36acb181c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

interface ScannerScreenProps {
  onFound: () => void;
}

export function ScannerScreen({ onFound }: ScannerScreenProps) {
  const laserRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Laser line animation via requestAnimationFrame
    let start: number | null = null;
    let raf: number;
    const duration = 2000; // ms for one pass
    const el = laserRef.current;
    if (!el) return;

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = (ts - start) % (duration * 2);
      const progress =
        elapsed < duration
          ? elapsed / duration
          : 1 - (elapsed - duration) / duration;
      if (el) el.style.top = `${progress * 100}%`;
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#000",
        fontFamily: "var(--font-family)",
      }}
    >
      {/* Background image — grayscale + dark overlay */}
      <img
        src={BG_IMAGE}
        alt="Wedding background"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(80%) blur(2px)",
          transform: "scale(1.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.58)",
        }}
      />

      {/* Top wordmark */}
      <div
        style={{
          position: "absolute",
          top: "52px",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          zIndex: 10,
        }}
      >
        {/* Back to dashboard */}
        <button
          onClick={() => navigate("/")}
          style={{
            position: "absolute",
            left: "24px",
            top: "0",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.45)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            letterSpacing: "0.06em",
            padding: "4px 0",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Dashboard
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L11 10H1L6 1Z" fill="rgba(255,255,255,0.9)" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "18px",
              fontWeight: "var(--font-weight-regular)",
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "0.04em",
            }}
          >
            Aisle
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Alex &amp; Sam's Wedding
        </p>
      </div>

      {/* Center scanning frame */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -54%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {/* Label above frame */}
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Point camera at QR code
        </p>

        {/* Scanner frame */}
        <div
          style={{
            position: "relative",
            width: "260px",
            height: "260px",
            borderRadius: "40px",
            overflow: "hidden",
            border: "1.5px solid rgba(255,255,255,0.22)",
            backgroundColor: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Corner brackets */}
          {[
            { top: 0, left: 0, borderTop: true, borderLeft: true },
            { top: 0, right: 0, borderTop: true, borderRight: true },
            { bottom: 0, left: 0, borderBottom: true, borderLeft: true },
            { bottom: 0, right: 0, borderBottom: true, borderRight: true },
          ].map((corner, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "28px",
                height: "28px",
                top: corner.top !== undefined ? "14px" : undefined,
                bottom: corner.bottom !== undefined ? "14px" : undefined,
                left: corner.left !== undefined ? "14px" : undefined,
                right: corner.right !== undefined ? "14px" : undefined,
                borderTop: corner.borderTop ? "2px solid var(--violet)" : undefined,
                borderBottom: corner.borderBottom ? "2px solid var(--violet)" : undefined,
                borderLeft: corner.borderLeft ? "2px solid var(--violet)" : undefined,
                borderRight: corner.borderRight ? "2px solid var(--violet)" : undefined,
                borderTopLeftRadius: corner.borderTop && corner.borderLeft ? "6px" : undefined,
                borderTopRightRadius: corner.borderTop && corner.borderRight ? "6px" : undefined,
                borderBottomLeftRadius: corner.borderBottom && corner.borderLeft ? "6px" : undefined,
                borderBottomRightRadius: corner.borderBottom && corner.borderRight ? "6px" : undefined,
              }}
            />
          ))}

          {/* Laser line */}
          <div
            ref={laserRef}
            style={{
              position: "absolute",
              left: "10px",
              right: "10px",
              top: "0%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, var(--violet) 30%, rgba(167,139,250,1) 50%, var(--violet) 70%, transparent 100%)",
              borderRadius: "2px",
              boxShadow: "0 0 12px 3px rgba(124,58,237,0.55)",
              pointerEvents: "none",
            }}
          />

          {/* Subtle QR mock pattern */}
          <div
            style={{
              position: "absolute",
              inset: "40px",
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gridTemplateRows: "repeat(7, 1fr)",
              gap: "3px",
              opacity: 0.06,
            }}
          >
            {Array.from({ length: 49 }).map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "2px",
                  backgroundColor: "white",
                  opacity: Math.random() > 0.45 ? 1 : 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom glassmorphism button */}
      <div
        style={{
          position: "absolute",
          bottom: "44px",
          left: "24px",
          right: "24px",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          alignItems: "center",
        }}
      >
        <button
          onClick={onFound}
          style={{
            width: "100%",
            padding: "17px 24px",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.22)",
            backgroundColor: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "rgba(255,255,255,0.95)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-regular)",
            cursor: "pointer",
            letterSpacing: "0.01em",
            transition: "transform 0.12s ease, background-color 0.15s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          onMouseDown={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)")}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          onTouchStart={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)")}
          onTouchEnd={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          {/* Checkmark circle icon */}
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "var(--violet)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          QR Code Found — Continue
        </button>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.06em",
          }}
        >
          Or tap to enter manually
        </p>
      </div>
    </div>
  );
}