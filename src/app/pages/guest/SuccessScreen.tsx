import { Check } from "lucide-react";

interface SuccessScreenProps {
  guestName: string;
  guestNote: string;
  uploadedPhotos: string[];
  onUploadMore: () => void;
  onDone: () => void;
}

export function SuccessScreen({
  guestName,
  guestNote,
  uploadedPhotos,
  onUploadMore,
  onDone,
}: SuccessScreenProps) {
  // Show up to 9 photos in the 3×3 mini-grid
  const gridPhotos = uploadedPhotos.slice(0, 9);

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--background)",
        fontFamily: "var(--font-family)",
        display: "flex",
        flexDirection: "column",
        paddingTop: "3px", // progress bar
      }}
    >
      {/* Top section */}
      <div
        style={{
          padding: "52px 28px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Success icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            backgroundColor: "var(--success-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "4px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              backgroundColor: "var(--success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Check size={26} strokeWidth={2} style={{ color: "white" }} />
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "clamp(26px, 7vw, 34px)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--foreground)",
              lineHeight: "1.2",
              marginBottom: "8px",
            }}
          >
            Photos Sent!
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              lineHeight: "1.6",
              maxWidth: "280px",
              margin: "0 auto",
            }}
          >
            Your {uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? "s" : ""} have been shared with Alex &amp; Sam. They'll love seeing the day through your eyes.
          </p>
        </div>
      </div>

      {/* Violet tinted submission card */}
      <div
        style={{
          margin: "0 24px",
          borderRadius: "32px",
          backgroundColor: "var(--violet-light)",
          border: "1px solid var(--violet-border)",
          padding: "24px 24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Card header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--violet) 0%, rgba(139,92,246,1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "13px",
                fontWeight: "var(--font-weight-regular)",
                color: "white",
                letterSpacing: "0.02em",
              }}
            >
              {guestName
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-base)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
                lineHeight: "1.3",
              }}
            >
              {guestName}
            </p>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "11px",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--violet)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? "s" : ""} shared
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "var(--violet-border)", margin: "2px 0" }} />

        {/* Note — italic, personal */}
        {guestNote ? (
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--foreground)",
              fontStyle: "italic",
              lineHeight: "1.6",
              opacity: 0.85,
            }}
          >
            "{guestNote}"
          </p>
        ) : (
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              fontStyle: "italic",
              lineHeight: "1.6",
            }}
          >
            No note added.
          </p>
        )}
      </div>

      {/* 3×3 mini photo grid */}
      {gridPhotos.length > 0 && (
        <div style={{ margin: "20px 24px 0" }}>
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "11px",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
              paddingLeft: "2px",
            }}
          >
            Your submissions
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            {gridPhotos.map((url, i) => (
              <div
                key={`${url}-${i}`}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "var(--muted)",
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
                  }}
                />
              </div>
            ))}
            {/* Fill remaining slots to complete the 3×3 */}
            {Array.from({ length: Math.max(0, 9 - gridPhotos.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: "20px",
                  backgroundColor: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1, minHeight: "24px" }} />

      {/* Bottom action buttons */}
      <div
        style={{
          padding: "16px 28px 44px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <button
          onClick={onDone}
          style={{
            width: "100%",
            padding: "17px 24px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "var(--violet)",
            color: "var(--violet-foreground)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
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
          onTouchStart={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)")
          }
          onTouchEnd={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          Done
        </button>
        <button
          onClick={onUploadMore}
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
          onTouchStart={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)")
          }
          onTouchEnd={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          Upload More
        </button>
      </div>
    </div>
  );
}
