import { useState, useCallback } from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "12px"})`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease, transform 0.2s ease",
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        padding: "11px 20px",
        borderRadius: "100px",
        fontFamily: "var(--font-family)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--font-weight-medium)",
        zIndex: 9999,
        pointerEvents: "none",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "var(--success)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Check size={10} strokeWidth={2.5} color="white" />
      </div>
      {message}
    </div>
  );
}

export function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  }, []);

  return { visible, message, showToast };
}
