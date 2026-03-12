import { useState, useMemo } from "react";
import { RotateCcw, Trash2, Archive } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useAppContext } from "../context/AppContext";
import { Photo } from "../data/albums";
import { Toast, useToast } from "../components/Toast";

// Confirmation modal
function ConfirmModal({
  count,
  onConfirm,
  onCancel,
}: {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          borderRadius: "32px",
          padding: "40px",
          maxWidth: "440px",
          width: "90%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "16px",
            backgroundColor: "rgba(220,38,38,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Trash2 size={24} strokeWidth={1.5} style={{ color: "var(--destructive)" }} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-h4)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
            marginBottom: "10px",
          }}
        >
          Delete {count} photo{count !== 1 ? "s" : ""}?
        </h3>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            lineHeight: "1.6",
            marginBottom: "28px",
          }}
        >
          These photos will be permanently removed and cannot be recovered. This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "100px",
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--foreground)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "100px",
              border: "none",
              backgroundColor: "var(--destructive)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--destructive-foreground)",
              cursor: "pointer",
            }}
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}

export function ArchivedPage() {
  const { albums, restoreAlbum, permanentlyDeleteAlbum } = useAppContext();
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const { visible, message, showToast } = useToast();

  const archivedAlbums = useMemo(
    () => albums.filter((a) => a.status === "archived"),
    [albums]
  );

  const allPhotos = useMemo<(Photo & { albumId: string })[]>(
    () => archivedAlbums.flatMap((a) => a.photos.map((p) => ({ ...p, albumId: a.id }))),
    [archivedAlbums]
  );

  const toggleSelect = (photoId: string) => {
    setSelectedPhotos((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) next.delete(photoId);
      else next.add(photoId);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedPhotos(new Set(allPhotos.map((p) => p.id)));
  };

  const clearSelection = () => setSelectedPhotos(new Set());

  const handleRestore = () => {
    // Find albums containing selected photos and restore them
    const albumsToRestore = new Set<string>();
    allPhotos.forEach((p) => {
      if (selectedPhotos.has(p.id)) albumsToRestore.add(p.albumId);
    });
    albumsToRestore.forEach((id) => restoreAlbum(id));
    clearSelection();
    showToast(`Restored ${selectedPhotos.size} photo${selectedPhotos.size !== 1 ? "s" : ""} to Collection`);
  };

  const handleDeleteConfirm = () => {
    // Find albums containing selected photos and delete them
    const albumsToDelete = new Set<string>();
    allPhotos.forEach((p) => {
      if (selectedPhotos.has(p.id)) albumsToDelete.add(p.albumId);
    });
    albumsToDelete.forEach((id) => permanentlyDeleteAlbum(id));
    clearSelection();
    setShowConfirm(false);
    showToast("Photos permanently deleted");
  };

  return (
    <>
      <div style={{ padding: "48px 40px 64px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="flex items-start justify-between"
          style={{ marginBottom: "8px" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-h1)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--foreground)",
              lineHeight: "1.2",
            }}
          >
            Archived
          </h1>
          {allPhotos.length > 0 && selectedPhotos.size === 0 && (
            <button
              onClick={selectAll}
              style={{
                padding: "10px 20px",
                borderRadius: "100px",
                border: "1px solid var(--border)",
                backgroundColor: "transparent",
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                cursor: "pointer",
              }}
            >
              Select All
            </button>
          )}
        </div>

        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            marginBottom: "32px",
          }}
        >
          {allPhotos.length} archived photo{allPhotos.length !== 1 ? "s" : ""} from{" "}
          {archivedAlbums.length} album{archivedAlbums.length !== 1 ? "s" : ""}
        </p>

        {/* Empty state */}
        {allPhotos.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                backgroundColor: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            >
              <Archive size={36} strokeWidth={1} style={{ color: "var(--border)" }} />
            </div>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-h4)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
              }}
            >
              Nothing in Archive
            </p>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
              }}
            >
              Discarded albums will appear here for review.
            </p>
          </div>
        ) : (
          /* Masonry grid with grayscale */
          <ResponsiveMasonry columnsCountBreakPoints={{ 480: 1, 700: 2, 960: 3, 1200: 4 }}>
            <Masonry gutter="16px">
              {allPhotos.map((photo) => {
                const isSelected = selectedPhotos.has(photo.id);
                return (
                  <div
                    key={photo.id}
                    onClick={() => toggleSelect(photo.id)}
                    style={{
                      position: "relative",
                      borderRadius: "24px",
                      overflow: "hidden",
                      cursor: "pointer",
                      outline: isSelected ? "3px solid var(--violet)" : "3px solid transparent",
                      outlineOffset: "-3px",
                      transition: "outline 0.15s ease",
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.contributorName}
                      loading="lazy"
                      style={{
                        width: "100%",
                        display: "block",
                        borderRadius: "24px",
                        filter: "grayscale(85%) brightness(0.8)",
                        transition: "filter 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter =
                          "grayscale(30%) brightness(0.9)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.filter =
                          "grayscale(85%) brightness(0.8)";
                      }}
                    />
                    {/* Selection checkbox */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "8px",
                        backgroundColor: isSelected ? "var(--violet)" : "rgba(255,255,255,0.85)",
                        border: isSelected ? "2px solid var(--violet)" : "2px solid rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>

      {/* Action Bar */}
      {selectedPhotos.size > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--foreground)",
            borderRadius: "100px",
            padding: "10px 10px 10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
            zIndex: 200,
            animation: "slideUp 0.2s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--background)",
              whiteSpace: "nowrap",
            }}
          >
            {selectedPhotos.size} selected
          </span>
          <button
            onClick={clearSelection}
            style={{
              padding: "8px 16px",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
          <button
            onClick={handleRestore}
            style={{
              padding: "8px 18px",
              borderRadius: "100px",
              border: "none",
              backgroundColor: "var(--success)",
              color: "white",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <RotateCcw size={14} strokeWidth={1.8} />
            Restore to Collection
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              padding: "8px 18px",
              borderRadius: "100px",
              border: "none",
              backgroundColor: "var(--destructive)",
              color: "white",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Trash2 size={14} strokeWidth={1.8} />
            Delete
          </button>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <ConfirmModal
          count={selectedPhotos.size}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <Toast message={message} visible={visible} />
    </>
  );
}
