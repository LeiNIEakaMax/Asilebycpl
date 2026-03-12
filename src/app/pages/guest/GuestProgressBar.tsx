import { GuestStep, getProgressPercent } from "./types";

interface GuestProgressBarProps {
  step: GuestStep;
}

export function GuestProgressBar({ step }: GuestProgressBarProps) {
  const percent = getProgressPercent(step);

  if (step === "scanner") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "3px",
        backgroundColor: "var(--border)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${percent}%`,
          backgroundColor: "var(--violet)",
          borderRadius: "0 2px 2px 0",
          transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
