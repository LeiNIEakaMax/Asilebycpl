import { useState } from "react";
import { Copy, Check, Link, Share2 } from "lucide-react";
import { Toggle } from "../components/Toggle";
import { Toast, useToast } from "../components/Toast";
import { useAppContext } from "../context/AppContext";

const GALLERY_URL = "https://aisle.com/alex-and-sam";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </p>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        padding: "28px 32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        padding: "18px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
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
          {label}
        </p>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "13px",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
          }}
        >
          {description}
        </p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function SocialButton({
  icon,
  label,
  color,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  const isGradient = color.startsWith("linear-gradient");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        padding: "20px 28px",
        borderRadius: "20px",
        border: "1px solid var(--border)",
        backgroundColor: hovered ? "var(--muted)" : "transparent",
        transition: "background-color 0.15s ease",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "14px",
          background: isGradient ? color : undefined,
          backgroundColor: isGradient ? undefined : color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--foreground)",
        }}
      >
        {label}
      </span>
    </a>
  );
}

// WhatsApp icon SVG
function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// Instagram icon SVG
function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export function SharingPage() {
  const { settings, updateSettings } = useAppContext();
  const { visible, message, showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(GALLERY_URL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("Link copied to clipboard");
  };

  const handleToggle = (key: "publicSearch" | "passwordProtection" | "allowGuestDownloads") => (
    value: boolean
  ) => {
    updateSettings({ [key]: value });
    showToast("Preferences saved");
  };

  const waText = encodeURIComponent(
    `You're invited to view Alex & Sam's wedding gallery: ${GALLERY_URL}`
  );
  const emailSubject = encodeURIComponent("Alex & Sam's Wedding Gallery");
  const emailBody = encodeURIComponent(
    `Hi! You're invited to view our wedding gallery and share your photos.\n\n${GALLERY_URL}`
  );

  return (
    <>
      <div style={{ padding: "48px 40px 64px", maxWidth: "960px", margin: "0 auto" }}>
        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-h1)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
            lineHeight: "1.2",
            marginBottom: "40px",
          }}
        >
          Sharing
        </h1>

        {/* Live Link Card */}
        <div style={{ marginBottom: "32px" }}>
          <SectionLabel>Your Gallery Link</SectionLabel>
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  backgroundColor: "var(--violet-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Link size={20} strokeWidth={1.5} style={{ color: "var(--violet)" }} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--foreground)",
                    marginBottom: "2px",
                  }}
                >
                  Live Gallery URL
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "13px",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Share this link with guests to collect photos
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 20px",
                borderRadius: "16px",
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  flex: 1,
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--violet)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {GALLERY_URL}
              </span>
              <button
                onClick={handleCopy}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 18px",
                  borderRadius: "100px",
                  backgroundColor: copied ? "var(--success)" : "var(--violet)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  transition: "background-color 0.2s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {copied ? (
                  <><Check size={14} strokeWidth={2} /> Copied</>
                ) : (
                  <><Copy size={14} strokeWidth={1.5} /> Copy Link</>
                )}
              </button>
            </div>
          </Card>
        </div>

        {/* Privacy Toggles */}
        <div style={{ marginBottom: "32px" }}>
          <SectionLabel>Privacy Settings</SectionLabel>
          <Card style={{ padding: "8px 32px" }}>
            <div style={{ borderBottom: "none" }}>
              <ToggleRow
                label="Public Search"
                description="Allow your gallery to appear in public search results"
                checked={settings.publicSearch}
                onChange={handleToggle("publicSearch")}
              />
              <ToggleRow
                label="Password Protection"
                description="Require a password before guests can view or upload photos"
                checked={settings.passwordProtection}
                onChange={handleToggle("passwordProtection")}
              />
              <div style={{ padding: "18px 0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "24px",
                  }}
                >
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
                      Allow Guest Downloads
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-family)",
                        fontSize: "13px",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Let guests download photos from the gallery
                    </p>
                  </div>
                  <Toggle
                    checked={settings.allowGuestDownloads}
                    onChange={handleToggle("allowGuestDownloads")}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Social Sharing */}
        <div>
          <SectionLabel>Share via</SectionLabel>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <SocialButton
              label="WhatsApp"
              color="#25D366"
              href={`https://wa.me/?text=${waText}`}
              icon={<WhatsAppIcon />}
            />
            <SocialButton
              label="Instagram"
              color="linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
              href="https://instagram.com"
              icon={<InstagramIcon />}
            />
            <SocialButton
              label="Email"
              color="var(--primary)"
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              icon={<Share2 size={22} strokeWidth={1.5} />}
            />
          </div>
        </div>
      </div>

      <Toast message={message} visible={visible} />
    </>
  );
}