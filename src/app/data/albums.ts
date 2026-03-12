// Unsplash photo URL builder
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`;

// Photo pool – 18 unique wedding images
export const POOL = {
  couple:       u("1695987579836-519de39286e9"),
  bouquet:      u("1579035234222-1af9dc733cce"),
  reception:    u("1677768061409-3d4fbd0250d1"),
  guests:       u("1765615191419-5102a3811f43"),
  rings:        u("1766963026693-e73b058176dd"),
  bridal:       u("1656871024616-db6f5876271f"),
  ceremony:     u("1764380754282-194c847f6d4c"),
  cake:         u("1653936392747-cbbf97f8d45c"),
  henna:        u("1764641405208-8f4116556901"),
  champagne:    u("1768508664000-22d16fcbe69c"),
  firstDance:   u("1634040616805-bfe7066251ac"),
  hands:        u("1773157354371-e28854908d97"),
  confetti:     u("1758810411894-3c0f092f305f"),
  vows:         u("1773020935790-60ef6f281ece"),
  venue:        u("1765614768003-cffd87c0808b"),
  bridePortrait:u("1765871903122-d6e7cdb1c020"),
  danceFloor:   u("1766113484146-6b2bd56a0f45"),
  groom:        u("1606216769898-c88daccaa479"),
};

export interface Photo {
  id: string;
  albumId: string;
  contributorName: string;
  url: string;
  uploadedAt: string;
}

export interface Album {
  id: string;
  name: string;
  status: "pending" | "approved" | "archived";
  coverImage: string;
  photos: Photo[];
}

function makePhotos(albumId: string, name: string, urls: string[]): Photo[] {
  return urls.map((url, i) => ({
    id: `${albumId}-${i}`,
    albumId,
    contributorName: name,
    url,
    uploadedAt: new Date(Date.now() - i * 3600_000).toISOString(),
  }));
}

export const INITIAL_ALBUMS: Album[] = [
  {
    id: "1",
    name: "Uncle Bob",
    status: "pending",
    coverImage: POOL.couple,
    photos: makePhotos("1", "Uncle Bob", [
      POOL.couple, POOL.reception, POOL.rings, POOL.ceremony, POOL.firstDance, POOL.vows, POOL.confetti, POOL.groom,
    ]),
  },
  {
    id: "2",
    name: "Sarah J.",
    status: "approved",
    coverImage: POOL.bouquet,
    photos: makePhotos("2", "Sarah J.", [
      POOL.bouquet, POOL.bridal, POOL.hands, POOL.bridePortrait, POOL.groom, POOL.cake, POOL.venue,
    ]),
  },
  {
    id: "3",
    name: "Cousin Lucy",
    status: "pending",
    coverImage: POOL.guests,
    photos: makePhotos("3", "Cousin Lucy", [
      POOL.guests, POOL.henna, POOL.confetti, POOL.venue, POOL.danceFloor, POOL.champagne, POOL.hands,
    ]),
  },
  {
    id: "4",
    name: "College Buds",
    status: "approved",
    coverImage: POOL.champagne,
    photos: makePhotos("4", "College Buds", [
      POOL.champagne, POOL.firstDance, POOL.danceFloor, POOL.guests, POOL.couple, POOL.confetti,
    ]),
  },
  {
    id: "5",
    name: "The Patels",
    status: "approved",
    coverImage: POOL.rings,
    photos: makePhotos("5", "The Patels", [
      POOL.rings, POOL.henna, POOL.hands, POOL.bouquet, POOL.cake, POOL.venue, POOL.bridePortrait,
    ]),
  },
  {
    id: "6",
    name: "Jake (Work)",
    status: "pending",
    coverImage: POOL.reception,
    photos: makePhotos("6", "Jake (Work)", [
      POOL.reception, POOL.ceremony, POOL.vows, POOL.groom, POOL.bridePortrait, POOL.confetti,
    ]),
  },
  {
    id: "7",
    name: "Bridal Party",
    status: "approved",
    coverImage: POOL.bridal,
    photos: makePhotos("7", "Bridal Party", [
      POOL.bridal, POOL.bouquet, POOL.bridePortrait, POOL.cake, POOL.hands, POOL.couple, POOL.venue,
    ]),
  },
  {
    id: "8",
    name: "Travel Squad",
    status: "pending",
    coverImage: POOL.henna,
    photos: makePhotos("8", "Travel Squad", [
      POOL.henna, POOL.venue, POOL.confetti, POOL.danceFloor, POOL.rings, POOL.reception, POOL.champagne,
    ]),
  },
  {
    id: "9",
    name: "The Johnsons",
    status: "approved",
    coverImage: POOL.ceremony,
    photos: makePhotos("9", "The Johnsons", [
      POOL.ceremony, POOL.firstDance, POOL.vows, POOL.guests, POOL.groom, POOL.champagne,
    ]),
  },
  {
    id: "10",
    name: "Maid of Honor",
    status: "pending",
    coverImage: POOL.cake,
    photos: makePhotos("10", "Maid of Honor", [
      POOL.cake, POOL.bridePortrait, POOL.bouquet, POOL.hands, POOL.bridal, POOL.venue, POOL.henna,
    ]),
  },
  {
    id: "11",
    name: "Best Man Crew",
    status: "approved",
    coverImage: POOL.firstDance,
    photos: makePhotos("11", "Best Man Crew", [
      POOL.firstDance, POOL.danceFloor, POOL.champagne, POOL.guests, POOL.groom, POOL.confetti,
    ]),
  },
  {
    id: "12",
    name: "Flower Girls",
    status: "approved",
    coverImage: POOL.vows,
    photos: makePhotos("12", "Flower Girls", [
      POOL.vows, POOL.ceremony, POOL.venue, POOL.reception, POOL.bridePortrait, POOL.rings,
    ]),
  },
  {
    id: "13",
    name: "Distant Relative",
    status: "archived",
    coverImage: POOL.danceFloor,
    photos: makePhotos("13", "Distant Relative", [
      POOL.danceFloor, POOL.reception, POOL.venue, POOL.confetti, POOL.champagne,
    ]),
  },
  {
    id: "14",
    name: "Work Colleague",
    status: "archived",
    coverImage: POOL.groom,
    photos: makePhotos("14", "Work Colleague", [
      POOL.groom, POOL.ceremony, POOL.vows, POOL.rings, POOL.champagne, POOL.couple,
    ]),
  },
  {
    id: "15",
    name: "Neighbor Kim",
    status: "archived",
    coverImage: POOL.reception,
    photos: makePhotos("15", "Neighbor Kim", [
      POOL.reception, POOL.venue, POOL.bridePortrait, POOL.bouquet,
    ]),
  },
];