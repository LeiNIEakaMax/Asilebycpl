import { useState } from "react";
import { AlertTriangle, Calendar, MapPin, Link2, Bell, Zap } from "lucide-react";
import { Toggle } from "../components/Toggle";
import { Toast, useToast } from "../components/Toast";
import { useAppContext } from "../context/AppContext";

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

function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
  icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-family)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--foreground)",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "16px",
          border: focused ? "1.5px solid var(--violet)" : "1px solid var(--border)",
          backgroundColor: "var(--input-background)",
          transition: "border-color 0.15s ease",
          overflow: "hidden",
        }}
      >
        {(prefix || icon) && (
          <div
            style={{
              padding: "0 14px",
              borderRight: "1px solid var(--border)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              color: "var(--muted-foreground)",
              backgroundColor: "var(--muted)",
              flexShrink: 0,
            }}
          >
            {icon || (
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--muted-foreground)",
                  whiteSpace: "nowrap",
                }}
              >
                {prefix}
              </span>
            )}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            padding: "13px 18px",
            border: "none",
            backgroundColor: "transparent",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
            outline: "none",
            minWidth: 0,
          }}
        />
      </div>
    </div>
  );
}

function SettingRow({
  icon,
  label,
  description,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        padding: "20px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "11px",
            backgroundColor: "var(--muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
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
              lineHeight: "1.5",
            }}
          >
            {description}
          </p>
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

// Double confirm modal
function DeleteModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [inputVal, setInputVal] = useState("");
  const ready = inputVal.trim().toLowerCase() === "delete";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onCancel}
    >
      <div
        style={{
          backgroundColor: "var(--card)",
          borderRadius: "32px",
          padding: "44px",
          maxWidth: "460px",
          width: "90%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "18px",
            backgroundColor: "rgba(220,38,38,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <AlertTriangle size={26} strokeWidth={1.5} style={{ color: "var(--destructive)" }} />
        </div>
        <h3
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-h4)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--foreground)",
            marginBottom: "12px",
          }}
        >
          Delete this event?
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
          This will permanently delete the event <strong>Alex &amp; Sam's Wedding</strong>, all
          albums, photos, and guest data. This action cannot be undone.
        </p>
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--foreground)",
              marginBottom: "8px",
            }}
          >
            Type <strong>DELETE</strong> to confirm
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="DELETE"
            autoFocus
            style={{
              width: "100%",
              padding: "13px 18px",
              borderRadius: "16px",
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--input-background)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-regular)",
              color: "var(--foreground)",
              outline: "none",
              boxSizing: "border-box",
              letterSpacing: "0.05em",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: "13px",
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
            onClick={ready ? onConfirm : undefined}
            style={{
              flex: 1,
              padding: "13px",
              borderRadius: "100px",
              border: "none",
              backgroundColor: ready ? "var(--destructive)" : "var(--border)",
              fontFamily: "var(--font-family)",
              fontSize: "var(--text-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: ready ? "var(--destructive-foreground)" : "var(--muted-foreground)",
              cursor: ready ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { settings, updateSettings } = useAppContext();
  const { visible, message, showToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    showToast("Settings saved");
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    showToast("Event deleted — redirecting…");
  };

  return (
    <>
      <div style={{ padding: "48px 40px 64px", maxWidth: "800px", margin: "0 auto" }}>
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
          Settings
        </h1>

        {/* Wedding Details */}
        <div style={{ marginBottom: "32px" }}>
          <SectionLabel>Wedding Details</SectionLabel>
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "28px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <FormField
              label="Wedding Date"
              value={settings.weddingDate}
              onChange={(v) => updateSettings({ weddingDate: v })}
              type="date"
              icon={<Calendar size={16} strokeWidth={1.5} style={{ color: "var(--muted-foreground)" }} />}
            />
            <FormField
              label="Venue Name"
              value={settings.venueName}
              onChange={(v) => updateSettings({ venueName: v })}
              placeholder="e.g. The Grand Pavilion"
              icon={<MapPin size={16} strokeWidth={1.5} style={{ color: "var(--muted-foreground)" }} />}
            />
            <FormField
              label="Custom URL Slug"
              value={settings.urlSlug}
              onChange={(v) => updateSettings({ urlSlug: v })}
              prefix="aisle.com/"
              icon={<Link2 size={16} strokeWidth={1.5} style={{ color: "var(--muted-foreground)" }} />}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={handleSave}
                style={{
                  padding: "12px 28px",
                  borderRadius: "100px",
                  border: "none",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer",
                }}
              >
                Save Details
              </button>
            </div>
          </div>
        </div>

        {/* Global Preferences */}
        <div style={{ marginBottom: "32px" }}>
          <SectionLabel>Global Preferences</SectionLabel>
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "28px",
              padding: "8px 28px",
            }}
          >
            <SettingRow
              icon={<Zap size={17} strokeWidth={1.5} style={{ color: "var(--violet)" }} />}
              label="Auto-Approve Photos"
              description="Bypass the Pending review stage — new submissions go directly to your Approved collection."
            >
              <Toggle
                checked={settings.autoApprove}
                onChange={(v) => {
                  updateSettings({ autoApprove: v });
                  showToast(v ? "Auto-approve enabled" : "Auto-approve disabled");
                }}
              />
            </SettingRow>

            {/* Notification mode */}
            <div style={{ padding: "20px 0" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "11px",
                    backgroundColor: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bell size={17} strokeWidth={1.5} style={{ color: "var(--muted-foreground)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      color: "var(--foreground)",
                      marginBottom: "3px",
                    }}
                  >
                    Notification Emails
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-family)",
                      fontSize: "13px",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--muted-foreground)",
                      marginBottom: "14px",
                    }}
                  >
                    How often you receive email notifications about new uploads.
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {(
                      [
                        { val: "digest", label: "Daily Digest" },
                        { val: "instant", label: "Instant Alerts" },
                      ] as { val: "digest" | "instant"; label: string }[]
                    ).map(({ val, label }) => (
                      <button
                        key={val}
                        onClick={() => {
                          updateSettings({ notificationMode: val });
                          showToast(`Notifications set to ${label}`);
                        }}
                        style={{
                          padding: "9px 18px",
                          borderRadius: "100px",
                          border:
                            settings.notificationMode === val
                              ? "2px solid var(--violet)"
                              : "1px solid var(--border)",
                          backgroundColor:
                            settings.notificationMode === val ? "var(--violet-muted)" : "transparent",
                          color:
                            settings.notificationMode === val ? "var(--violet)" : "var(--foreground)",
                          fontFamily: "var(--font-family)",
                          fontSize: "var(--text-sm)",
                          fontWeight:
                            settings.notificationMode === val
                              ? "var(--font-weight-medium)"
                              : "var(--font-weight-regular)",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <SectionLabel>Danger Zone</SectionLabel>
          <div
            style={{
              backgroundColor: "rgba(220,38,38,0.04)",
              border: "1px solid rgba(220,38,38,0.2)",
              borderRadius: "28px",
              padding: "32px",
            }}
          >
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
                    color: "var(--destructive)",
                    marginBottom: "4px",
                  }}
                >
                  Delete Event
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "13px",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--muted-foreground)",
                    lineHeight: "1.5",
                  }}
                >
                  Permanently remove your event and all associated photos, albums, and guest data. This cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                style={{
                  padding: "11px 22px",
                  borderRadius: "100px",
                  border: "1px solid rgba(220,38,38,0.3)",
                  backgroundColor: "rgba(220,38,38,0.08)",
                  color: "var(--destructive)",
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-medium)",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AlertTriangle size={15} strokeWidth={1.5} />
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      <Toast message={message} visible={visible} />
    </>
  );
}
