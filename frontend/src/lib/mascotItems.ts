// ──────────────────────────────────────────────
// SkillFinder — Mascot Cosmetic Items
// ──────────────────────────────────────────────

const MASCOT_STORAGE_KEY = "sf_mascot_custom";

export type ItemCategory = "hat" | "scarf" | "accessory" | "boots";

export interface MascotItem {
  id: string;
  nameKey: string;
  category: ItemCategory;
  tier: number | null; // null = premium (paid)
  price?: number; // euros, for premium items
  preview: string; // emoji for quick preview in grid
}

export interface MascotCustomization {
  hat: string;
  scarf: string;
  accessory: string;
  boots: string;
}

export const DEFAULT_CUSTOMIZATION: MascotCustomization = {
  hat: "explorer",
  scarf: "red",
  accessory: "satchel",
  boots: "brown",
};

// ── Item Catalog ──

export const MASCOT_ITEMS: MascotItem[] = [
  // ── Hats ──
  { id: "none_hat",   nameKey: "mascot.item.noHat",     category: "hat", tier: 1, preview: "🚫" },
  { id: "explorer",   nameKey: "mascot.item.explorer",   category: "hat", tier: 1, preview: "🎒" },
  { id: "bandana",    nameKey: "mascot.item.bandana",    category: "hat", tier: 2, preview: "🟥" },
  { id: "chef",       nameKey: "mascot.item.chef",       category: "hat", tier: 3, preview: "👨‍🍳" },
  { id: "crown",      nameKey: "mascot.item.crown",      category: "hat", tier: 4, preview: "👑" },
  { id: "tophat",     nameKey: "mascot.item.tophat",     category: "hat", tier: 5, preview: "🎩" },
  { id: "pirate",     nameKey: "mascot.item.pirate",     category: "hat", tier: null, price: 1.99, preview: "🏴‍☠️" },
  { id: "santa",      nameKey: "mascot.item.santa",      category: "hat", tier: null, price: 1.99, preview: "🎅" },

  // ── Scarves ──
  { id: "none_scarf", nameKey: "mascot.item.noScarf",    category: "scarf", tier: 1, preview: "🚫" },
  { id: "red",        nameKey: "mascot.item.scarfRed",   category: "scarf", tier: 1, preview: "🔴" },
  { id: "blue",       nameKey: "mascot.item.scarfBlue",  category: "scarf", tier: 2, preview: "🔵" },
  { id: "green",      nameKey: "mascot.item.scarfGreen", category: "scarf", tier: 3, preview: "🟢" },
  { id: "gold",       nameKey: "mascot.item.scarfGold",  category: "scarf", tier: 4, preview: "🟡" },
  { id: "purple",     nameKey: "mascot.item.scarfPurple",category: "scarf", tier: null, price: 0.99, preview: "🟣" },

  // ── Accessories ──
  { id: "none_acc",   nameKey: "mascot.item.noAcc",      category: "accessory", tier: 1, preview: "🚫" },
  { id: "satchel",    nameKey: "mascot.item.satchel",    category: "accessory", tier: 1, preview: "👜" },
  { id: "bowtie",     nameKey: "mascot.item.bowtie",     category: "accessory", tier: 3, preview: "🎀" },
  { id: "cape",       nameKey: "mascot.item.cape",       category: "accessory", tier: 5, preview: "🦸" },
  { id: "wings",      nameKey: "mascot.item.wings",      category: "accessory", tier: null, price: 1.99, preview: "🪽" },

  // ── Boots ──
  { id: "brown",      nameKey: "mascot.item.bootsBrown", category: "boots", tier: 1, preview: "🟤" },
  { id: "black",      nameKey: "mascot.item.bootsBlack", category: "boots", tier: 2, preview: "⚫" },
  { id: "gold_boots", nameKey: "mascot.item.bootsGold",  category: "boots", tier: 4, preview: "🟡" },
  { id: "red_boots",  nameKey: "mascot.item.bootsRed",   category: "boots", tier: null, price: 0.99, preview: "🔴" },
];

// ── Helpers ──

export function getItemsByCategory(category: ItemCategory): MascotItem[] {
  return MASCOT_ITEMS.filter((item) => item.category === category);
}

export function getItem(id: string): MascotItem | undefined {
  return MASCOT_ITEMS.find((item) => item.id === id);
}

export function isItemUnlocked(item: MascotItem, userTier: number): boolean {
  if (item.tier === null) return false; // premium — needs purchase
  return userTier >= item.tier;
}

// ── Persistence ──

export function loadMascotCustomization(): MascotCustomization {
  try {
    const raw = localStorage.getItem(MASCOT_STORAGE_KEY);
    if (raw) return { ...DEFAULT_CUSTOMIZATION, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_CUSTOMIZATION };
}

export function saveMascotCustomization(custom: MascotCustomization): void {
  localStorage.setItem(MASCOT_STORAGE_KEY, JSON.stringify(custom));
}

// ── Color Maps ──

export const SCARF_COLORS: Record<string, string> = {
  red: "#C45D3E",
  blue: "#4A7FC4",
  green: "#3A7D5C",
  gold: "#D4A853",
  purple: "#8B5CF6",
};

export const BOOT_COLORS: Record<string, { main: string; sole: string }> = {
  brown:      { main: "#6B4226", sole: "#4A2E1A" },
  black:      { main: "#2D2D2D", sole: "#1A1A1A" },
  gold_boots: { main: "#B8860B", sole: "#8B6914" },
  red_boots:  { main: "#A63030", sole: "#7A2020" },
};
