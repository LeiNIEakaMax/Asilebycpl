import { useState } from "react";
import {
  Download,
  Image,
  Plus,
  QrCode,
  ScanLine,
  Users,
  TrendingUp,
  MoreHorizontal,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Toggle } from "../components/Toggle";

type ColorScheme = "violet" | "black";
type FrameStyle = "rounded" | "circular";
type Tab = "manage" | "design";

// ─── QR code SVG generator ────────────────────────────────────────────────────
const QR_SIZE = 25;

function getModule(row: number, col: number): boolean {
  const s = QR_SIZE;
  if (row <= 6 && col <= 6) {
    if (row === 0 || row === 6 || col === 0 || col === 6) return true;
    if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return true;
    return false;
  }
  if (row === 7 && col <= 7) return false;
  if (col === 7 && row <= 7) return false;
  if (row <= 6 && col >= s - 7) {
    const c = col - (s - 7);
    if (row === 0 || row === 6 || c === 0 || c === 6) return true;
    if (row >= 2 && row <= 4 && c >= 2 && c <= 4) return true;
    return false;
  }
  if (row === 7 && col >= s - 8) return false;
  if (col === s - 8 && row <= 7) return false;
  if (row >= s - 7 && col <= 6) {
    const r = row - (s - 7);
    if (r === 0 || r === 6 || col === 0 || col === 6) return true;
    if (r >= 2 && r <= 4 && col >= 2 && col <= 4) return true;
    return false;
  }
  if (col === 7 && row >= s - 8) return false;
  if (row === s - 8 && col <= 7) return false;
  if (row === 6 && col > 7 && col < s - 8) return col % 2 === 0;
  if (col === 6 && row > 7 && row < s - 8) return row % 2 === 0;
  if (row >= 16 && row <= 20 && col >= 16 && col <= 20) {
    if (row === 16 || row === 20 || col === 16 || col === 20) return true;
    if (row === 18 && col === 18) return true;
    return false;
  }
  const h = Math.abs(Math.sin(row * 137 + col * 19 + 42) * 10000);
  return Math.floor(h) % 2 === 0;
}

interface QRCodeDisplayProps {
  color: string;
  frameStyle: FrameStyle;
  showLogo: boolean;
  size?: number;
}

function QRCodeDisplay({ color, frameStyle, showLogo, size = 200 }: QRCodeDisplayProps) {
  const cellSize = size / QR_SIZE;
  const r = cellSize * 1.5;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: frameStyle === "circular" ? "50%" : "24px", display: "block" }}
    >
      {frameStyle === "circular" && <circle cx={size / 2} cy={size / 2} r={size / 2} fill="white" />}
      {frameStyle === "rounded" && <rect width={size} height={size} rx={24} ry={24} fill="white" />}

      {Array.from({ length: QR_SIZE }).map((_, row) =>
        Array.from({ length: QR_SIZE }).map((_, col) => {
          if (!getModule(row, col)) return null;
          const center = Math.floor(QR_SIZE / 2);
          if (showLogo && row >= center - 2 && row <= center + 2 && col >= center - 2 && col <= center + 2) {
            return null;
          }
          return (
            <rect
              key={`${row}-${col}`}
              x={col * cellSize + 0.5}
              y={row * cellSize + 0.5}
              width={cellSize - 1}
              height={cellSize - 1}
              rx={r}
              ry={r}
              fill={color}
            />
          );
        })
      )}

      {showLogo && (
        <>
          <rect x={size / 2 - 14} y={size / 2 - 14} width={28} height={28} rx={8} fill={color} />
          <text
            x={size / 2}
            y={size / 2 + 5}
            textAnchor="middle"
            fill="white"
            fontSize={12}
            fontFamily="system-ui, sans-serif"
            fontWeight="bold"
          >
            A
          </text>
        </>
      )}
    </svg>
  );
}

// ─── Manage tab ───────────────────────────────────────────────────────────────
const MOCK_CODES = [
  { id: "1", label: "Venue Entrance",     scans: 142, created: "May 12, 2025", active: true,  placement: "Main entrance door"    },
  { id: "2", label: "Reception Tables",   scans: 89,  created: "May 12, 2025", active: true,  placement: "Table centrepieces ×12"},
  { id: "3", label: "Bar Area",           scans: 57,  created: "May 14, 2025", active: true,  placement: "Behind the bar"        },
  { id: "4", label: "Photo Booth",        scans: 34,  created: "May 14, 2025", active: false, placement: "Selfie station"        },
  { id: "5", label: "Save-the-Date Card", scans: 21,  created: "Apr 3, 2025",  active: true,  placement: "Physical mailer"       },
];

function ManageTab() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const totalScans   = MOCK_CODES.reduce((s, c) => s + c.scans, 0);
  const activeCodes  = MOCK_CODES.filter((c) => c.active).length;

  const stats = [
    { icon: <ScanLine size={18} strokeWidth={1.5} />,   label: "Total Scans",    value: totalScans.toLocaleString() },
    { icon: <Users size={18} strokeWidth={1.5} />,      label: "Unique Visitors", value: "218"                      },
    { icon: <TrendingUp size={18} strokeWidth={1.5} />, label: "Active Codes",   value: `${activeCodes} / ${MOCK_CODES.length}` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {stats.map(({ icon, label, value }) => (
          <div
            key={label}
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "22px 24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  backgroundColor: "var(--violet-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--violet)",
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "11px",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--muted-foreground)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-h3)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
                lineHeight: "1.1",
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Distributed codes table */}
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        {/* Table header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 28px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--foreground)",
            }}
          >
            Distributed Codes
          </p>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
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
            <Plus size={13} strokeWidth={2} />
            New Code
          </button>
        </div>

        {/* Column labels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.5fr 80px 100px 36px",
            padding: "10px 28px",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--muted)",
          }}
        >
          {["Label", "Placement", "Scans", "Status", ""].map((h) => (
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
        {MOCK_CODES.map((code, i) => (
          <div
            key={code.id}
            onMouseEnter={() => setHoveredRow(code.id)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 80px 100px 36px",
              alignItems: "center",
              padding: "16px 28px",
              borderBottom: i < MOCK_CODES.length - 1 ? "1px solid var(--border)" : "none",
              backgroundColor: hoveredRow === code.id ? "var(--muted)" : "transparent",
              transition: "background-color 0.15s ease",
            }}
          >
            {/* Label + created date */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  backgroundColor: "var(--violet-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <QrCode size={14} strokeWidth={1.5} style={{ color: "var(--violet)" }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--foreground)",
                    marginBottom: "1px",
                  }}
                >
                  {code.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "11px",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Created {code.created}
                </p>
              </div>
            </div>

            {/* Placement */}
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
              }}
            >
              {code.placement}
            </span>

            {/* Scans */}
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
              }}
            >
              {code.scans}
            </span>

            {/* Status pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              {code.active ? (
                <CheckCircle2 size={15} strokeWidth={1.5} style={{ color: "var(--success)", flexShrink: 0 }} />
              ) : (
                <Circle size={15} strokeWidth={1.5} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
              )}
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  color: code.active ? "var(--success)" : "var(--muted-foreground)",
                }}
              >
                {code.active ? "Active" : "Paused"}
              </span>
            </div>

            {/* Overflow menu */}
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                color: "var(--muted-foreground)",
              }}
            >
              <MoreHorizontal size={16} strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Design tab ───────────────────────────────────────────────────────────────
function DesignTab({
  colorScheme,
  setColorScheme,
  frameStyle,
  setFrameStyle,
  showLogo,
  setShowLogo,
  optionBtn,
}: {
  colorScheme: ColorScheme;
  setColorScheme: (v: ColorScheme) => void;
  frameStyle: FrameStyle;
  setFrameStyle: (v: FrameStyle) => void;
  showLogo: boolean;
  setShowLogo: (v: boolean) => void;
  optionBtn: (active: boolean) => React.CSSProperties;
}) {
  const qrColor = colorScheme === "violet" ? "#7C3AED" : "#0a0a0a";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>
      {/* Live preview card */}
      <div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "32px",
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Instruction card */}
        <div
          style={{
            borderRadius: "24px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--muted)",
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            maxWidth: "340px",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "6px",
                  backgroundColor: qrColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1L11 10H1L6 1Z" fill="white" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "15px",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                }}
              >
                Aisle
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-h4)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
                lineHeight: "1.3",
              }}
            >
              Scan to share your photos with Alex &amp; Sam
            </p>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "white",
              borderRadius: frameStyle === "circular" ? "50%" : "24px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <QRCodeDisplay color={qrColor} frameStyle={frameStyle} showLogo={showLogo} size={180} />
          </div>

          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "12px",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            aisle.com/alex-and-sam
          </p>
        </div>

        {/* Export buttons */}
        <div style={{ display: "flex", gap: "12px", width: "100%", maxWidth: "340px" }}>
          <button
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Download size={15} strokeWidth={1.5} />
            Download PDF
          </button>
          <button
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "16px",
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--foreground)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Image size={15} strokeWidth={1.5} />
            Download PNG
          </button>
        </div>
      </div>

      {/* Customisation sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Color */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "11px",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Color
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={optionBtn(colorScheme === "violet")} onClick={() => setColorScheme("violet")}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#7C3AED",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                Aisle Violet
              </span>
            </button>
            <button style={optionBtn(colorScheme === "black")} onClick={() => setColorScheme("black")}>
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#0a0a0a",
                    display: "inline-block",
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                  }}
                />
                Classic Black
              </span>
            </button>
          </div>
        </div>

        {/* Frame */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "11px",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--muted-foreground)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Frame Style
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={optionBtn(frameStyle === "rounded")} onClick={() => setFrameStyle("rounded")}>
              Rounded
            </button>
            <button style={optionBtn(frameStyle === "circular")} onClick={() => setFrameStyle("circular")}>
              Circular
            </button>
          </div>
        </div>

        {/* Logo toggle */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--foreground)",
                  marginBottom: "3px",
                }}
              >
                Show Aisle Logo
              </p>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "12px",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                }}
              >
                Embed logo in the center
              </p>
            </div>
            <Toggle checked={showLogo} onChange={setShowLogo} />
          </div>
        </div>

        {/* Print tip */}
        <div
          style={{
            backgroundColor: "var(--violet-muted)",
            border: "1px solid var(--violet-border)",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--violet)",
              marginBottom: "6px",
            }}
          >
            Print tip
          </p>
          <p
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "13px",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--violet)",
              opacity: 0.8,
              lineHeight: "1.5",
            }}
          >
            Download the PDF for print-ready 300 DPI quality. Place at venue entry, tables, and the bar.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function QRBuilderPage() {
  const [activeTab, setActiveTab]     = useState<Tab>("design");
  const [colorScheme, setColorScheme] = useState<ColorScheme>("violet");
  const [frameStyle, setFrameStyle]   = useState<FrameStyle>("rounded");
  const [showLogo, setShowLogo]       = useState(true);

  const optionBtn = (active: boolean): React.CSSProperties => ({
    padding: "10px 20px",
    borderRadius: "100px",
    border: active ? "2px solid var(--violet)" : "1px solid var(--border)",
    backgroundColor: active ? "var(--violet-muted)" : "transparent",
    color: active ? "var(--violet)" : "var(--foreground)",
    fontFamily: "var(--font-family)",
    fontSize: "var(--text-sm)",
    fontWeight: active ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
    cursor: "pointer",
    transition: "all 0.15s ease",
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "manage", label: "Manage" },
    { id: "design", label: "Design" },
  ];

  return (
    <div style={{ padding: "48px 40px 64px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Title */}
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
        QR Code Builder
      </h1>

      {/* Tab bar */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0 2px 12px",
                marginRight: "24px",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id
                  ? "2px solid var(--foreground)"
                  : "2px solid transparent",
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: activeTab === tab.id ? "var(--foreground)" : "var(--muted-foreground)",
                cursor: "pointer",
                transition: "color 0.15s ease, border-color 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ borderBottom: "1px solid var(--border)" }} />
      </div>

      {/* Tab content with fade */}
      <div key={activeTab} style={{ animation: "fadeIn 0.2s ease" }}>
        {activeTab === "manage" ? (
          <ManageTab />
        ) : (
          <DesignTab
            colorScheme={colorScheme}
            setColorScheme={setColorScheme}
            frameStyle={frameStyle}
            setFrameStyle={setFrameStyle}
            showLogo={showLogo}
            setShowLogo={setShowLogo}
            optionBtn={optionBtn}
          />
        )}
      </div>
    </div>
  );
}
