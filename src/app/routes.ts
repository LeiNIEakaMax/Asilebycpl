import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CollectionPage } from "./pages/CollectionPage";
import { AlbumDetailPage } from "./pages/AlbumDetailPage";
import { AllPhotosPage } from "./pages/AllPhotosPage";
import { GuestPage } from "./pages/GuestPage";
import { GuestsPage } from "./pages/GuestsPage";
import { SharingPage } from "./pages/SharingPage";
import { QRBuilderPage } from "./pages/QRBuilderPage";
import { ArchivedPage } from "./pages/ArchivedPage";
import { AccountPage } from "./pages/AccountPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: CollectionPage },
      { path: "album/:id", Component: AlbumDetailPage },
      { path: "all-photos", Component: AllPhotosPage },
      { path: "guests", Component: GuestsPage },
      { path: "sharing", Component: SharingPage },
      { path: "qr-builder", Component: QRBuilderPage },
      { path: "archived", Component: ArchivedPage },
      { path: "account", Component: AccountPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
  {
    // Guest experience lives outside the couple dashboard layout (no sidebar)
    path: "/guest",
    Component: GuestPage,
  },
]);
