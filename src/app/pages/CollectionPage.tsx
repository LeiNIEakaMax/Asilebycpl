import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { AlbumCard } from "../components/AlbumCard";
import { useAppContext } from "../context/AppContext";

type TabType = "approved" | "pending";

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

export function CollectionPage() {
  const [activeTab, setActiveTab] = useState<TabType>("approved");
  const { albums, pendingCount } = useAppContext();
  const navigate = useNavigate();

  const filteredAlbums = albums.filter((a) =>
    activeTab === "approved" ? a.status === "approved" : a.status === "pending"
  );

  return (
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
        Collection
      </h1>

      {/* Tabs + Add Button Row */}
      <div className="flex items-end justify-between" style={{ marginBottom: "0" }}>
        <div className="flex items-end">
          {/* Approved Tab */}
          <button
            onClick={() => setActiveTab("approved")}
            className="flex items-center gap-2 pb-3 px-1 mr-6"
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              color: activeTab === "approved" ? "var(--foreground)" : "var(--muted-foreground)",
              borderBottom: activeTab === "approved" ? "2px solid var(--foreground)" : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            Approved Albums
          </button>

          {/* Pending Tab */}
          <button
            onClick={() => setActiveTab("pending")}
            className="flex items-center gap-2 pb-3 px-1"
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              color: activeTab === "pending" ? "var(--foreground)" : "var(--muted-foreground)",
              borderBottom: activeTab === "pending" ? "2px solid var(--foreground)" : "2px solid transparent",
              background: "none",
              cursor: "pointer",
              transition: "color 0.15s, border-color 0.15s",
            }}
          >
            Pending Albums
            {pendingCount > 0 && (
              <span
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  borderRadius: "100px",
                  padding: "1px 8px",
                  fontSize: "11px",
                  fontWeight: "var(--font-weight-regular)",
                  fontFamily: "var(--font-family)",
                  lineHeight: "1.6",
                }}
              >
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* Add Album Button */}
        <button
          className="flex items-center gap-1.5"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "100px",
            padding: "8px 20px",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            border: "none",
            cursor: "pointer",
            marginBottom: "2px",
          }}
        >
          <Plus size={15} strokeWidth={1.5} />
          Add Album
        </button>
      </div>

      {/* Tab underline rule */}
      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: "24px" }} />

      {/* Filter Pills */}
      <div className="flex items-center gap-2" style={{ marginBottom: "32px" }}>
        <FilterPill label="STATUS" value="All" />
        <FilterPill label="SORT" value="Upload Time" />
        <FilterPill label="SHARED WITH" value="Everyone" />
      </div>

      {/* Album Grid */}
      {filteredAlbums.length > 0 ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "28px 24px",
          }}
        >
          {filteredAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              name={album.name}
              photoCount={album.photos.length}
              status={album.status}
              imageUrl={album.coverImage}
              onClick={() => navigate(`/album/${album.id}`)}
            />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            minHeight: "300px",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
          }}
        >
          <p>No albums in this category yet.</p>
        </div>
      )}
    </div>
  );
}
