import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "var(--font-family)" }}
    >
      <Sidebar />
      <main
        className="flex-1 overflow-y-auto relative"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        {/* Mobile top padding to account for hamburger button */}
        <div className="md:hidden" style={{ height: "64px" }} />
        <Outlet />
      </main>
    </div>
  );
}
