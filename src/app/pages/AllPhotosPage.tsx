import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { MasonryGrid } from "../components/MasonryGrid";
import { Lightbox } from "../components/Lightbox";
import { Photo } from "../data/albums";

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <button
      className="flex items-center gap-1.5"
      style={{
        borderRadius: "100px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--background)",
        padding: "6px 14px",
        fontFamily: "var(--font-family)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--font-weight-regular)",
        color: "var(--foreground)",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "var(--muted-foreground)", fontSize: "11px", letterSpacing: "0.05em" }}>
        {label}
      </span>
      <span style={{ fontSize: "var(--text-sm)" }}>{value}</span>
      <ChevronDown size={13} style={{ color: "var(--muted-foreground)", marginLeft: "2px" }} strokeWidth={1.5} />
    </button>
  );
}

export function AllPhotosPage() {
  const { albums } = useAppContext();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Aggregate all photos from approved albums, sorted newest first
  const allPhotos = useMemo<Photo[]>(() => {
    const approved = albums.filter((a) => a.status === "approved");
    const photos = approved.flatMap((a) => a.photos);
    return photos.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }, [albums]);

  const handlePhotoClick = (_photo: Photo, index: number) => {
    setLightboxIndex(index);
  };

  return (
    <>
      <div style={{ padding: "48px 40px 64px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Page Title */}
        <h1
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-h1)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
            lineHeight: "1.2",
            marginBottom: "28px",
          }}
        >
          All Photos
        </h1>

        {/* Filter Pills */}
        <div className="flex items-center gap-2" style={{ marginBottom: "32px" }}>
          <FilterPill label="STATUS" value="Approved" />
          <FilterPill label="SORT" value="Upload Time" />
        </div>

        {/* Photo count */}
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            marginBottom: "24px",
          }}
        >
          {allPhotos.length} photos from {albums.filter((a) => a.status === "approved").length} approved albums
        </p>

        {/* Masonry Grid */}
        {allPhotos.length > 0 ? (
          <MasonryGrid photos={allPhotos} onPhotoClick={handlePhotoClick} />
        ) : (
          <div
            className="flex items-center justify-center"
            style={{
              minHeight: "300px",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
            }}
          >
            <p>No approved photos yet. Approve some albums to see them here.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={allPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
