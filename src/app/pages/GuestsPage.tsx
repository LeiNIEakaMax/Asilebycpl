import { useState, useMemo } from "react";
import { Search, Mail, ChevronRight, UserX, UserCheck, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      style={{
        backgroundColor: accent ? "var(--violet)" : "var(--card)",
        border: accent ? "none" : "1px solid var(--border)",
        borderRadius: "24px",
        padding: "28px 32px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "11px",
          fontWeight: "var(--font-weight-medium)",
          color: accent ? "rgba(255,255,255,0.6)" : "var(--muted-foreground)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--text-h2)",
          fontWeight: "var(--font-weight-regular)",
          color: accent ? "white" : "var(--foreground)",
          lineHeight: "1.1",
          marginBottom: sub ? "6px" : "0",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: accent ? "rgba(255,255,255,0.55)" : "var(--muted-foreground)",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function InitialsAvatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `hsl(${hue}, 50%, 60%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-family)",
          fontSize: size < 40 ? "12px" : "14px",
          fontWeight: "var(--font-weight-medium)",
          color: "white",
          letterSpacing: "0.02em",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export function GuestsPage() {
  const { albums, blockedGuests, blockGuest, unblockGuest } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const guests = useMemo(() => {
    return albums
      .filter((a) => a.status !== "archived" || blockedGuests.includes(a.name))
      .map((a) => ({
        id: a.id,
        albumId: a.id,
        name: a.name,
        joinedAt: new Date(
          Date.now() - parseInt(a.id) * 86400000 * 2
        ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        photoCount: a.photos.length,
        blocked: blockedGuests.includes(a.name),
      }))
      .sort((a, b) => b.photoCount - a.photoCount);
  }, [albums, blockedGuests]);

  const filtered = useMemo(
    () =>
      guests.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      ),
    [guests, search]
  );

  const topUploader = guests.reduce(
    (max, g) => (g.photoCount > max.photoCount ? g : max),
    guests[0] || { name: "—", photoCount: 0 }
  );
  const activeCount = guests.filter((g) => !g.blocked).length;

  return (
    <div style={{ padding: "48px 40px 64px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: "36px" }}
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
          Guests
        </h1>
        <button
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "100px",
            padding: "10px 22px",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-medium)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Mail size={15} strokeWidth={1.5} />
          Message All
        </button>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-5" style={{ marginBottom: "40px" }}>
        <StatCard label="Total Guests" value={guests.length} sub="contributors" />
        <StatCard
          label="Active Contributors"
          value={activeCount}
          sub={`${guests.length - activeCount} blocked`}
          accent
        />
        <StatCard
          label="Top Uploader"
          value={topUploader?.name ?? "—"}
          sub={`${topUploader?.photoCount ?? 0} photos uploaded`}
        />
      </div>

      {/* Search */}
      <div
        style={{
          position: "relative",
          marginBottom: "24px",
          maxWidth: "400px",
        }}
      >
        <Search
          size={15}
          strokeWidth={1.5}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--muted-foreground)",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          placeholder="Search guests…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            paddingLeft: "42px",
            paddingRight: "16px",
            paddingTop: "11px",
            paddingBottom: "11px",
            borderRadius: "100px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--input-background)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
            outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {/* Table head */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 120px 44px",
            padding: "14px 24px",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--muted)",
          }}
        >
          {["Guest", "Joined", "Photos", "Status", ""].map((h) => (
            <span
              key={h}
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "11px",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--muted-foreground)",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "64px 24px",
              textAlign: "center",
            }}
          >
            <Users
              size={40}
              strokeWidth={1}
              style={{ color: "var(--border)", marginBottom: "16px", margin: "0 auto 16px" }}
            />
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
              }}
            >
              {search ? "No guests match your search." : "No guests yet."}
            </p>
          </div>
        ) : (
          filtered.map((guest, i) => (
            <div
              key={guest.id}
              onClick={() => navigate(`/album/${guest.albumId}`)}
              onMouseEnter={() => setHoveredRow(guest.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 120px 44px",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom:
                  i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                backgroundColor:
                  hoveredRow === guest.id ? "var(--muted)" : "transparent",
                transition: "background-color 0.15s ease",
              }}
            >
              {/* Name */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <InitialsAvatar name={guest.name} />
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--foreground)",
                  }}
                >
                  {guest.name}
                </span>
              </div>

              {/* Joined */}
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                }}
              >
                {guest.joinedAt}
              </span>

              {/* Photos */}
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--foreground)",
                }}
              >
                {guest.photoCount}
              </span>

              {/* Status */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  backgroundColor: guest.blocked
                    ? "rgba(220,38,38,0.08)"
                    : "var(--success-light)",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: guest.blocked ? "var(--destructive)" : "var(--success)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "12px",
                    fontWeight: "var(--font-weight-medium)",
                    color: guest.blocked ? "var(--destructive)" : "var(--success)",
                  }}
                >
                  {guest.blocked ? "Blocked" : "Active"}
                </span>
              </div>

              {/* Actions */}
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() =>
                    guest.blocked ? unblockGuest(guest.name) : blockGuest(guest.name)
                  }
                  title={guest.blocked ? "Unblock guest" : "Block guest"}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "6px",
                    borderRadius: "8px",
                    color: guest.blocked ? "var(--success)" : "var(--muted-foreground)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {guest.blocked ? (
                    <UserCheck size={15} strokeWidth={1.5} />
                  ) : (
                    <UserX size={15} strokeWidth={1.5} />
                  )}
                </button>
                <ChevronRight
                  size={15}
                  strokeWidth={1.5}
                  style={{ color: "var(--muted-foreground)" }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
