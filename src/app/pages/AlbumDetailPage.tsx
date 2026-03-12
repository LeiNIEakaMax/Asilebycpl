import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Check, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { MasonryGrid } from "../components/MasonryGrid";
import { Lightbox } from "../components/Lightbox";
import { Photo } from "../data/albums";

export function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { albums, approveAlbum, discardAlbum } = useAppContext();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const album = albums.find((a) => a.id === id);

  if (!album) {
    return (
      <div
        className="flex items-center justify-center flex-1"
        style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-family)" }}
      >
        Album not found.
      </div>
    );
  }

  const isPending = album.status === "pending";

  const handleApprove = () => {
    approveAlbum(album.id);
  };

  const handleDiscard = () => {
    discardAlbum(album.id);
    navigate("/");
  };

  const handlePhotoClick = (_photo: Photo, index: number) => {
    setLightboxIndex(index);
  };

  return (
    <>
      {/* Main scrollable content */}
      <div
        style={{
          padding: "48px 40px 120px",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: isPending ? "48px" : "48px",
        }}
      >
        {/* Back link */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 mb-5"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            padding: 0,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)")}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back
        </button>

        {/* Title row */}
        <div className="flex items-center justify-between" style={{ marginBottom: "28px" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-h1)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
                lineHeight: "1.2",
              }}
            >
              {album.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
                marginTop: "4px",
              }}
            >
              {album.photos.length} photos
            </p>
          </div>

          {/* Desktop Action Bar — shown only when pending */}
          {isPending && (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleDiscard}
                className="flex items-center gap-2 transition-all duration-150"
                style={{
                  border: "1.5px solid var(--border)",
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  borderRadius: "100px",
                  padding: "9px 22px",
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--destructive)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--destructive)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)";
                }}
              >
                <X size={15} strokeWidth={1.5} />
                Discard
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 transition-opacity duration-150 hover:opacity-80"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  borderRadius: "100px",
                  padding: "9px 22px",
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  cursor: "pointer",
                }}
              >
                <Check size={15} strokeWidth={2} />
                Approve
              </button>
            </div>
          )}

          {/* Approved badge on desktop */}
          {!isPending && album.status === "approved" && (
            <span
              className="hidden md:inline-flex items-center gap-1.5"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "100px",
                padding: "6px 14px",
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
              }}
            >
              <Check size={13} strokeWidth={2} style={{ color: "#22c55e" }} />
              Approved
            </span>
          )}
        </div>

        {/* Masonry Photo Grid */}
        <MasonryGrid photos={album.photos} onPhotoClick={handlePhotoClick} />
      </div>

      {/* Mobile Action Bar — pinned to bottom, only when pending */}
      {isPending && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center gap-3 justify-center"
          style={{
            backgroundColor: "var(--background)",
            borderTop: "1px solid var(--border)",
            padding: "16px 20px",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
          }}
        >
          <button
            onClick={handleDiscard}
            className="flex-1 flex items-center justify-center gap-2"
            style={{
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              borderRadius: "100px",
              padding: "12px 20px",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              cursor: "pointer",
            }}
          >
            <X size={15} strokeWidth={1.5} />
            Discard
          </button>
          <button
            onClick={handleApprove}
            className="flex-1 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "100px",
              padding: "12px 20px",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              cursor: "pointer",
            }}
          >
            <Check size={15} strokeWidth={2} />
            Approve
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={album.photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
