import { useState } from "react";
import { Camera, CreditCard, ExternalLink } from "lucide-react";
import { Toast, useToast } from "../components/Toast";

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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
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
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "13px 18px",
          borderRadius: "16px",
          border: focused ? "1.5px solid var(--violet)" : "1px solid var(--border)",
          backgroundColor: "var(--input-background)",
          fontFamily: "var(--font-family)",
          fontSize: "var(--text-sm)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--foreground)",
          outline: "none",
          transition: "border-color 0.15s ease",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export function AccountPage() {
  const { visible, message, showToast } = useToast();

  const [form, setForm] = useState({
    firstName: "Alex",
    lastName: "Morgan",
    partnerFirst: "Sam",
    partnerLast: "Chen",
    email: "alex@example.com",
    partnerEmail: "sam@example.com",
    phone: "+1 (555) 012-3456",
  });

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    showToast("Profile updated successfully");
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
          Account
        </h1>

        {/* Profile Header */}
        <div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "32px",
            padding: "36px 40px",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            marginBottom: "28px",
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--violet) 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "28px",
                  fontWeight: "var(--font-weight-regular)",
                  color: "white",
                  letterSpacing: "0.04em",
                }}
              >
                AS
              </span>
            </div>
            <button
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "var(--foreground)",
                border: "2px solid var(--card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Camera size={13} strokeWidth={1.8} style={{ color: "var(--background)" }} />
            </button>
          </div>

          {/* Name + plan */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-h4)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                marginBottom: "4px",
              }}
            >
              Alex &amp; Sam
            </p>
            <p
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--muted-foreground)",
                marginBottom: "12px",
              }}
            >
              alex@example.com · sam@example.com
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 14px",
                borderRadius: "100px",
                backgroundColor: "var(--violet-muted)",
                border: "1px solid var(--violet-border)",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--violet)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "12px",
                  fontWeight: "var(--font-weight-medium)",
                  color: "var(--violet)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Pro Wedding Plan
              </span>
            </span>
          </div>
        </div>

        {/* Subscription Card */}
        <div style={{ marginBottom: "32px" }}>
          <SectionLabel>Subscription</SectionLabel>
          <div
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, #2d2d2d 100%)",
              borderRadius: "28px",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <CreditCard size={20} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.5)" }} />
                <p
                  style={{
                    fontFamily: "var(--font-family)",
                    fontSize: "11px",
                    fontWeight: "var(--font-weight-medium)",
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Current Plan
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-h3)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "white",
                  letterSpacing: "0.02em",
                  marginBottom: "6px",
                }}
              >
                PRO WEDDING PLAN
              </p>
              <p
                style={{
                  fontFamily: "var(--font-family)",
                  fontSize: "var(--text-sm)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Renews June 14, 2025 · $49/year
              </p>
            </div>
            <button
              style={{
                padding: "12px 24px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.2)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-family)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-weight-medium)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <ExternalLink size={14} strokeWidth={1.5} />
              Manage Billing
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div style={{ marginBottom: "32px" }}>
          <SectionLabel>Profile Details</SectionLabel>
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <FormField label="Your First Name" value={form.firstName} onChange={set("firstName")} />
              <FormField label="Your Last Name" value={form.lastName} onChange={set("lastName")} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <FormField label="Partner's First Name" value={form.partnerFirst} onChange={set("partnerFirst")} />
              <FormField label="Partner's Last Name" value={form.partnerLast} onChange={set("partnerLast")} />
            </div>
            <div style={{ height: "1px", backgroundColor: "var(--border)" }} />
            <FormField label="Your Email" value={form.email} onChange={set("email")} type="email" />
            <FormField
              label="Partner's Email"
              value={form.partnerEmail}
              onChange={set("partnerEmail")}
              type="email"
            />
            <FormField label="Phone Number" value={form.phone} onChange={set("phone")} type="tel" />

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "4px" }}>
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
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast message={message} visible={visible} />
    </>
  );
}
