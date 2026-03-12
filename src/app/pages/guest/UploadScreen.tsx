import { useState } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";

interface UploadScreenProps {
  guestName: string;
  selectedPhotos: string[];
  onBack: () => void;
  onOpenPicker: () => void;
  onRemovePhoto: (url: string) => void;
  onSend: () => void;
}

type SendState = "idle" | "sending" | "done";

// 2 columns × 4 rows = 8 slots
const GRID_SLOTS = 8;

export function UploadScreen({
  guestName,
  selectedPhotos,
  onBack,
  onOpenPicker,
  onRemovePhoto,
  onSend,
}: UploadScreenProps) {
  const [sendState, setSendState] = useState<SendState>("idle");

  const handleSend = () => {
    if (selectedPhotos.length === 0) return;
    setSendState("sending");
    setTimeout(() => {
      setSendState("done");
      setTimeout(() => onSend(), 600);
    }, 2000);
  };

  // Build 8-slot grid: filled slots + empty slot (tap to add) + remaining empties
  const slots = Array.from({ length: GRID_SLOTS }, (_, i) => {
    if (i < selectedPhotos.length) return { type: "photo" as const, url: selectedPhotos[i] };
    if (i === selectedPhotos.length) return { type: "add" as const };
    return { type: "empty" as const };
  });

  // If all 8 slots are filled, no "add" slot visible in grid — show overflow
  const hasAddSlot = selectedPhotos.length < GRID_SLOTS;

  const allSlots = hasAddSlot
    ? slots
    : [
        ...selectedPhotos.slice(0, GRID_SLOTS).map((url) => ({ type: "photo" as const, url })),
      ];

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
          padding: "20px 24px 0",
          paddingTop: "calc(20px + 3px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            margin: "-8px",
            color: "var(--muted-foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)")}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "10px",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Step 2 of 4
        </span>
        <div style={{ width: "36px" }} />
      </div>

      {/* Title */}
      <div style={{ padding: "0 28px", marginBottom: "28px" }}>
        <h1
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "clamp(24px, 7vw, 32px)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
            lineHeight: "1.2",
            marginBottom: "8px",
          }}
        >
          Your Photos
        </h1>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
          }}
        >
          {selectedPhotos.length === 0
            ? "Tap the + to select photos from your camera roll."
            : `${selectedPhotos.length} photo${selectedPhotos.length !== 1 ? "s" : ""} selected. Tap to add more.`}
        </p>
      </div>

      {/* 2×4 Photo Grid */}
      <div
        style={{
          padding: "0 28px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          flex: 1,
        }}
      >
        {allSlots.map((slot, i) => {
          if (slot.type === "photo") {
            return (
              <div
                key={`photo-${slot.url}-${i}`}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: "32px",
                  overflow: "visible",
                }}
              >
                <img
                  src={slot.url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "32px",
                    display: "block",
                  }}
                />
                {/* Remove button */}
                <button
                  onClick={() => onRemovePhoto(slot.url)}
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(10,10,10,0.72)",
                    backdropFilter: "blur(6px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.12s",
                    zIndex: 5,
                  }}
                  onMouseDown={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.88)")
                  }
                  onMouseUp={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
                  }
                >
                  <X size={12} strokeWidth={2} style={{ color: "white" }} />
                </button>
              </div>
            );
          }

          if (slot.type === "add") {
            return (
              <button
                key="add-slot"
                onClick={onOpenPicker}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "32px",
                  border: "1.5px dashed var(--violet-border)",
                  backgroundColor: "var(--violet-muted)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "transform 0.12s, background-color 0.15s",
                }}
                onMouseDown={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)")
                }
                onMouseUp={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
                }
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "var(--violet)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Plus size={20} strokeWidth={1.5} style={{ color: "white" }} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "12px",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--violet)",
                    letterSpacing: "0.03em",
                  }}
                >
                  Tap to Add
                </span>
              </button>
            );
          }

          // Empty placeholder
          return (
            <div
              key={`empty-${i}`}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "32px",
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            />
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "28px 28px 44px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <button
          onClick={handleSend}
          disabled={selectedPhotos.length === 0 || sendState === "sending"}
          style={{
            width: "100%",
            padding: "17px 24px",
            borderRadius: "20px",
            border: "none",
            backgroundColor:
              selectedPhotos.length === 0
                ? "var(--muted)"
                : sendState === "sending"
                ? "var(--violet)"
                : "var(--violet)",
            color:
              selectedPhotos.length === 0
                ? "var(--muted-foreground)"
                : "var(--violet-foreground)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-regular)",
            cursor: selectedPhotos.length === 0 ? "not-allowed" : "pointer",
            transition: "transform 0.12s ease, background-color 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            opacity: sendState === "sending" ? 0.85 : 1,
          }}
          onMouseDown={(e) => {
            if (selectedPhotos.length > 0 && sendState === "idle")
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          {sendState === "sending" && (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                animation: "spin 0.8s linear infinite",
                flexShrink: 0,
              }}
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </svg>
          )}
          {sendState === "sending" ? "Sending…" : "Send to Couple"}
        </button>

        {selectedPhotos.length > 0 && sendState === "idle" && (
          <button
            onClick={onOpenPicker}
            style={{
              width: "100%",
              padding: "14px 24px",
              borderRadius: "20px",
              border: "1.5px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--foreground)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              cursor: "pointer",
              transition: "transform 0.12s",
            }}
            onMouseDown={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)")
            }
            onMouseUp={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
            }
          >
            Add More Photos
          </button>
        )}
      </div>
    </div>
  );
}
