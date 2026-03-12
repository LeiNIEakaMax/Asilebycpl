import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface WelcomeScreenProps {
  onBack: () => void;
  onContinue: (name: string, note: string) => void;
  initialName?: string;
  initialNote?: string;
}

interface PillInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoFocus?: boolean;
}

function PillInput({ label, placeholder, value, onChange, type = "text", autoFocus }: PillInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "10px",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--muted-foreground)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          paddingLeft: "4px",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: "var(--font-family)",
          fontSize: "var(--text-base)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--foreground)",
          backgroundColor: "var(--muted)",
          border: `1.5px solid ${focused ? "var(--violet)" : "transparent"}`,
          borderRadius: "20px",
          padding: "16px 22px",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          transition: "border-color 0.15s ease",
        }}
      />
    </div>
  );
}

export function WelcomeScreen({
  onBack,
  onContinue,
  initialName = "",
  initialNote = "",
}: WelcomeScreenProps) {
  const [name, setName] = useState(initialName);
  const [note, setNote] = useState(initialNote);

  const canContinue = name.trim().length > 0;

  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--background)",
        fontFamily: "var(--font-family)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "calc(20px + 3px)", // account for progress bar
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            margin: "-8px",
            color: "var(--muted-foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--foreground)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--muted-foreground)")}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <span
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "10px",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Step 1 of 4
        </span>
        <div style={{ width: "36px" }} />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "48px 28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--violet)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Alex &amp; Sam's Wedding
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "clamp(28px, 8vw, 38px)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--foreground)",
            lineHeight: "1.15",
            marginBottom: "10px",
          }}
        >
          Welcome to the
          <br />
          <span style={{ color: "var(--muted-foreground)" }}>Photo Gallery.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            lineHeight: "1.6",
            marginBottom: "48px",
          }}
        >
          Share your moments from the big day. We'd love to see the celebration through your eyes.
        </p>

        {/* Input fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
          <PillInput
            label="Your Name"
            placeholder="e.g. Sarah J."
            value={name}
            onChange={setName}
            autoFocus
          />
          <PillInput
            label="Leave a Note (optional)"
            placeholder="Add a personal message…"
            value={note}
            onChange={setNote}
          />
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          padding: "16px 28px 44px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <button
          onClick={() => canContinue && onContinue(name.trim(), note.trim())}
          disabled={!canContinue}
          style={{
            width: "100%",
            padding: "17px 24px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: canContinue ? "var(--violet)" : "var(--muted)",
            color: canContinue ? "var(--violet-foreground)" : "var(--muted-foreground)",
            fontFamily: "var(--font-family)",
            fontSize: "var(--text-base)",
            fontWeight: "var(--font-weight-regular)",
            cursor: canContinue ? "pointer" : "not-allowed",
            transition: "transform 0.12s ease, background-color 0.2s ease, color 0.2s ease",
            letterSpacing: "0.01em",
          }}
          onMouseDown={(e) => {
            if (canContinue)
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onMouseUp={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          onTouchStart={(e) => {
            if (canContinue)
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
          }}
          onTouchEnd={(e) => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
        >
          Continue
        </button>
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
          }}
        >
          Your name helps the couple know who sent each photo.
        </p>
      </div>
    </div>
  );
}
