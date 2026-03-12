import { useState } from "react";
import {
  LayoutGrid,
  Users,
  Share2,
  Images,
  Archive,
  QrCode,
  UserCircle,
  Settings,
  Menu,
  X,
  Smartphone,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, active = false, badge, onClick }: NavItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer"
      style={{
        backgroundColor: active
          ? "rgba(255,255,255,1)"
          : hovered
          ? "rgba(255,255,255,0.08)"
          : "transparent",
        color: active ? "var(--primary)" : "rgba(255,255,255,0.65)",
        fontFamily: "var(--font-family)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--font-weight-regular)",
        border: "none",
        textAlign: "left",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon size={16} strokeWidth={1.5} />
      <span className="flex-1" style={{ fontWeight: "var(--font-weight-regular)" }}>
        {label}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          style={{
            backgroundColor: active ? "var(--primary)" : "rgba(255,255,255,0.2)",
            color: active ? "var(--primary-foreground)" : "rgba(255,255,255,0.9)",
            borderRadius: "100px",
            padding: "1px 7px",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            fontFamily: "var(--font-family)",
            lineHeight: "1.6",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

interface SidebarInnerProps {
  onClose?: () => void;
}

function SidebarInner({ onClose }: SidebarInnerProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { pendingCount } = useAppContext();

  const go = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname.startsWith("/album");
    return location.pathname === path;
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: "var(--primary)",
        width: "100%",
      }}
    >
      {/* Logo */}
      <div className="px-4 pt-6 pb-5">
        <div className="flex items-center gap-2 mb-1">
          {/* Mobile close */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden mr-1"
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: 0 }}
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          )}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "6px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L11 10H1L6 1Z" fill="rgba(255,255,255,0.85)" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "16px",
              fontWeight: "var(--font-weight-regular)",
              color: "rgba(255,255,255,1)",
              letterSpacing: "0.02em",
            }}
          >
            Aisle
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "11px",
            fontWeight: "var(--font-weight-regular)",
            color: "rgba(255,255,255,0.38)",
            paddingLeft: "30px",
          }}
        >
          Alex &amp; Sam's Wedding
        </p>
      </div>

      {/* Primary Nav */}
      <nav className="flex flex-col gap-0.5 px-3">
        <NavItem
          icon={LayoutGrid}
          label="Collection"
          active={isActive("/")}
          badge={pendingCount}
          onClick={() => go("/")}
        />
        <NavItem
          icon={Users}
          label="Guests"
          active={isActive("/guests")}
          onClick={() => go("/guests")}
        />
        <NavItem
          icon={Share2}
          label="Sharing"
          active={isActive("/sharing")}
          onClick={() => go("/sharing")}
        />
        <NavItem
          icon={Images}
          label="All Photos"
          active={isActive("/all-photos")}
          onClick={() => go("/all-photos")}
        />
        <NavItem
          icon={Archive}
          label="Archived"
          active={isActive("/archived")}
          onClick={() => go("/archived")}
        />
      </nav>

      {/* Sharing Tools Section */}
      <div className="mt-6 px-3">
        <p
          className="px-3 mb-2"
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "10px",
            fontWeight: "var(--font-weight-regular)",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Sharing Tools
        </p>
        <NavItem
          icon={QrCode}
          label="QR Code Builder"
          active={isActive("/qr-builder")}
          onClick={() => go("/qr-builder")}
        />
        <NavItem
          icon={Smartphone}
          label="Guest View"
          active={isActive("/guest")}
          onClick={() => go("/guest")}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Divider */}
      <div className="mx-4 my-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

      {/* Bottom Nav */}
      <nav className="flex flex-col gap-0.5 px-3 pb-1">
        <NavItem
          icon={UserCircle}
          label="Account"
          active={isActive("/account")}
          onClick={() => go("/account")}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          active={isActive("/settings")}
          onClick={() => go("/settings")}
        />
      </nav>

      {/* Divider */}
      <div className="mx-4 mt-1 mb-2" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

      {/* User Profile Footer */}
      <div className="px-4 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "11px",
                fontWeight: "var(--font-weight-regular)",
                color: "white",
                letterSpacing: "0.02em",
              }}
            >
              AS
            </span>
          </div>
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "13px",
                fontWeight: "var(--font-weight-regular)",
                color: "rgba(255,255,255,1)",
              }}
            >
              Alex &amp; Sam
            </span>
            <span
              style={{
                fontFamily: "var(--font-family)",
                fontSize: "10px",
                fontWeight: "var(--font-weight-regular)",
                color: "rgba(255,255,255,0.32)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Pro Wedding Plan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col h-screen shrink-0"
        style={{ width: "220px" }}
      >
        <SidebarInner />
      </aside>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 flex items-center justify-center"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "var(--primary)",
          border: "none",
          cursor: "pointer",
          color: "white",
          boxShadow: "var(--elevation-sm)",
        }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} strokeWidth={1.5} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          />
          {/* Drawer */}
          <div
            className="relative flex flex-col"
            style={{ width: "260px", zIndex: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarInner onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
