import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Photo } from "../data/albums";

interface MasonryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo, index: number) => void;
}

export function MasonryGrid({ photos, onPhotoClick }: MasonryGridProps) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 480: 1, 700: 2, 960: 3, 1200: 4 }}
    >
      <Masonry gutter="16px">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="overflow-hidden"
            style={{
              borderRadius: "24px",
              cursor: "pointer",
              position: "relative",
              backgroundColor: "var(--muted)",
            }}
            onClick={() => onPhotoClick(photo, i)}
          >
            <img
              src={photo.url}
              alt={photo.contributorName}
              loading="lazy"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "24px",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
              }}
            />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
