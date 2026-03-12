export type GuestStep = "scanner" | "welcome" | "upload" | "picker" | "success";

export interface GuestState {
  step: GuestStep;
  guestName: string;
  guestNote: string;
  selectedPhotos: string[]; // photo URLs selected in picker
  uploadedPhotos: string[]; // confirmed upload
}

export const STEP_ORDER: GuestStep[] = ["scanner", "welcome", "upload", "picker", "success"];

export function getProgressPercent(step: GuestStep): number {
  const map: Record<GuestStep, number> = {
    scanner: 0,
    welcome: 25,
    upload: 50,
    picker: 75,
    success: 100,
  };
  return map[step];
}

// Mock photo pool for the camera roll
export const MOCK_GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1695987579836-519de39286e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1579035234222-1af9dc733cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1677768061409-3d4fbd0250d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1765615191419-5102a3811f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1766963026693-e73b058176dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1656871024616-db6f5876271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1764380754282-194c847f6d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1653936392747-cbbf97f8d45c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1764641405208-8f4116556901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1768508664000-22d16fcbe69c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1634040616805-bfe7066251ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1773157354371-e28854908d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1758810411894-3c0f092f305f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1773020935790-60ef6f281ece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1765614768003-cffd87c0808b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1765871903122-d6e7cdb1c020?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1766113484146-6b2bd56a0f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1606216769898-c88daccaa479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];
