interface AlbumCardProps {
  name: string;
  photoCount: number;
  status: "pending" | "approved" | "archived";
  imageUrl: string;
  onClick?: () => void;
}

export function AlbumCard({ name, photoCount, status, imageUrl, onClick }: AlbumCardProps) {
  return (
    <div
      className="flex flex-col gap-3 cursor-pointer group"
      onClick={onClick}
      style={{ userSelect: "none" }}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: "32px",
          aspectRatio: "1 / 1",
          backgroundColor: "var(--muted)",
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          style={{ borderRadius: "32px" }}
        />

        {/* Pending Badge */}
        {status === "pending" && (
          <div className="absolute" style={{ top: "14px", right: "14px" }}>
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.96)",
                borderRadius: "100px",
                padding: "3px 10px",
                fontFamily: "var(--font-family)",
                fontSize: "10px",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                display: "inline-block",
              }}
            >
              Pending
            </span>
          </div>
        )}

        {/* Archived Badge */}
        {status === "archived" && (
          <div className="absolute" style={{ top: "14px", right: "14px" }}>
            <span
              style={{
                backgroundColor: "rgba(0,0,0,0.55)",
                borderRadius: "100px",
                padding: "3px 10px",
                fontFamily: "var(--font-family)",
                fontSize: "10px",
                fontWeight: "var(--font-weight-regular)",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              Archived
            </span>
          </div>
        )}
      </div>

      {/* Labels */}
      <div className="flex flex-col gap-0.5 px-1">
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
          }}
        >
          {photoCount} photos
        </span>
      </div>
    </div>
  );
}
