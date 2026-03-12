import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Photo } from "../data/albums";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    },
    [onClose, onNavigate, currentIndex, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-5 right-5 flex items-center justify-center transition-opacity hover:opacity-70"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.1)",
          border: "none",
          cursor: "pointer",
          color: "white",
          zIndex: 10,
        }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      {/* Prev Arrow */}
      {hasPrev && (
        <button
          className="absolute left-5 flex items-center justify-center transition-opacity hover:opacity-70"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "none",
            cursor: "pointer",
            color: "white",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
      )}

      {/* Next Arrow */}
      {hasNext && (
        <button
          className="absolute right-5 flex items-center justify-center transition-opacity hover:opacity-70"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.1)",
            border: "none",
            cursor: "pointer",
            color: "white",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      )}

      {/* Image + Meta */}
      <div
        className="flex flex-col items-center gap-4"
        style={{ maxWidth: "min(680px, 80vw)", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={photo.contributorName}
          style={{
            width: "100%",
            maxHeight: "75vh",
            objectFit: "contain",
            borderRadius: "24px",
            display: "block",
          }}
        />
        {/* Contributor Name */}
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-regular)",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
          }}
        >
          {photo.contributorName}
        </p>
      </div>

      {/* Photo counter */}
      <div
        className="absolute bottom-5"
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "12px",
          fontWeight: "var(--font-weight-regular)",
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.06em",
        }}
      >
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  );
}
