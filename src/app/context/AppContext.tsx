import { createContext, useContext, useState, ReactNode } from "react";
import { Album, INITIAL_ALBUMS } from "../data/albums";

export interface AppSettings {
  autoApprove: boolean;
  notificationMode: "digest" | "instant";
  weddingDate: string;
  venueName: string;
  urlSlug: string;
  publicSearch: boolean;
  passwordProtection: boolean;
  allowGuestDownloads: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  autoApprove: false,
  notificationMode: "digest",
  weddingDate: "2025-06-14",
  venueName: "The Grand Pavilion",
  urlSlug: "alex-and-sam",
  publicSearch: true,
  passwordProtection: false,
  allowGuestDownloads: true,
};

interface AppContextValue {
  albums: Album[];
  approveAlbum: (id: string) => void;
  discardAlbum: (id: string) => void;
  restoreAlbum: (id: string) => void;
  permanentlyDeleteAlbum: (id: string) => void;
  pendingCount: number;
  blockedGuests: string[];
  blockGuest: (name: string) => void;
  unblockGuest: (name: string) => void;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [blockedGuests, setBlockedGuests] = useState<string[]>([]);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const approveAlbum = (id: string) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
    );
  };

  const discardAlbum = (id: string) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "archived" } : a))
    );
  };

  const restoreAlbum = (id: string) => {
    setAlbums((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
    );
  };

  const permanentlyDeleteAlbum = (id: string) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  };

  const blockGuest = (name: string) => {
    setBlockedGuests((prev) => [...prev, name]);
  };

  const unblockGuest = (name: string) => {
    setBlockedGuests((prev) => prev.filter((n) => n !== name));
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const pendingCount = albums.filter((a) => a.status === "pending").length;

  return (
    <AppContext.Provider
      value={{
        albums,
        approveAlbum,
        discardAlbum,
        restoreAlbum,
        permanentlyDeleteAlbum,
        pendingCount,
        blockedGuests,
        blockGuest,
        unblockGuest,
        settings,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}
