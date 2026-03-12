import { useState } from "react";
import { Check } from "lucide-react";
import { MOCK_GALLERY_PHOTOS } from "./types";

interface PickerScreenProps {
  initialSelected: string[];
  onCancel: () => void;
  onAdd: (selected: string[]) => void;
}

export function PickerScreen({ initialSelected, onCancel, onAdd }: PickerScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelected));

  const toggle = (url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  };

  const count = selected.size;

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--background)",
        fontFamily: "var(--font-family)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 20px",
          paddingTop: "calc(16px + 3px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            padding: "4px 0",
          }}
        >
          Cancel
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--foreground)",
            }}
          >
            Select Photos
          </span>
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "11px",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.04em",
            }}
          >
            Recents
          </span>
        </div>

        <button
          onClick={() => onAdd(Array.from(selected))}
          disabled={count === 0}
          style={{
            background: "none",
            border: "none",
            cursor: count > 0 ? "pointer" : "default",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-regular)",
            color: count > 0 ? "var(--violet)" : "var(--muted-foreground)",
            padding: "4px 0",
            transition: "color 0.15s",
          }}
        >
          {count > 0 ? `Add (${count})` : "Add"}
        </button>
      </div>

      {/* Gallery grid */}
      <div
        style={{
          flex: 1,
          padding: "2px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
        }}
      >
        {MOCK_GALLERY_PHOTOS.map((url) => {
          const isSelected = selected.has(url);
          const selOrder = isSelected
            ? Array.from(selected).indexOf(url) + 1
            : null;

          return (
            <div
              key={url}
              onClick={() => toggle(url)}
              style={{
                position: "relative",
                aspectRatio: "1 / 1",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <img
                src={url}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "opacity 0.1s",
                  opacity: isSelected ? 0.75 : 1,
                }}
              />

              {/* Dark overlay when selected */}
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(124,58,237,0.12)",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Selection circle */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  backgroundColor: isSelected ? "var(--violet)" : "rgba(0,0,0,0.28)",
                  border: isSelected ? "2px solid var(--violet)" : "2px solid rgba(255,255,255,0.7)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.15s, border-color 0.15s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                }}
              >
                {isSelected && (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    style={{ color: "white" }}
                  />
                )}
              </div>

              {/* Order number badge for multi-select */}
              {isSelected && selOrder !== null && (
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "var(--violet)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family)",
                      fontSize: "10px",
                      fontWeight: "var(--font-weight-medium)",
                      color: "white",
                    }}
                  >
                    {selOrder}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom safe area */}
      <div style={{ height: "24px" }} />
    </div>
  );
}
