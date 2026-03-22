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
// 3 free items per tier per category + premium items

export const MASCOT_ITEMS: MascotItem[] = [
  // ══════════════════════════════════════
  // ── Hats ──
  // ══════════════════════════════════════
  // Tier 1
  { id: "none_hat",   nameKey: "mascot.item.noHat",      category: "hat", tier: 1, preview: "🚫" },
  { id: "explorer",   nameKey: "mascot.item.explorer",    category: "hat", tier: 1, preview: "🎒" },
  { id: "beret",      nameKey: "mascot.item.beret",       category: "hat", tier: 1, preview: "🫓" },
  // Tier 2
  { id: "bandana",    nameKey: "mascot.item.bandana",     category: "hat", tier: 2, preview: "🟥" },
  { id: "cap",        nameKey: "mascot.item.cap",         category: "hat", tier: 2, preview: "🧢" },
  { id: "beanie",     nameKey: "mascot.item.beanie",      category: "hat", tier: 2, preview: "🧶" },
  // Tier 3
  { id: "chef",       nameKey: "mascot.item.chef",        category: "hat", tier: 3, preview: "👨‍🍳" },
  { id: "cowboy",     nameKey: "mascot.item.cowboy",      category: "hat", tier: 3, preview: "🤠" },
  { id: "fedora",     nameKey: "mascot.item.fedora",      category: "hat", tier: 3, preview: "🎩" },
  // Tier 4
  { id: "crown",      nameKey: "mascot.item.crown",       category: "hat", tier: 4, preview: "👑" },
  { id: "sailor",     nameKey: "mascot.item.sailor",      category: "hat", tier: 4, preview: "⚓" },
  { id: "wizard",     nameKey: "mascot.item.wizard",      category: "hat", tier: 4, preview: "🧙" },
  // Tier 5
  { id: "tophat",     nameKey: "mascot.item.tophat",      category: "hat", tier: 5, preview: "🎩" },
  { id: "viking",     nameKey: "mascot.item.viking",      category: "hat", tier: 5, preview: "⚔️" },
  { id: "sheriff",    nameKey: "mascot.item.sheriff",     category: "hat", tier: 5, preview: "⭐" },
  // Tier 6
  { id: "turban",     nameKey: "mascot.item.turban",      category: "hat", tier: 6, preview: "👳" },
  { id: "sombrero",   nameKey: "mascot.item.sombrero",    category: "hat", tier: 6, preview: "🪇" },
  { id: "aviator",    nameKey: "mascot.item.aviator",     category: "hat", tier: 6, preview: "🧑‍✈️" },
  // Tier 7
  { id: "samurai",    nameKey: "mascot.item.samurai",     category: "hat", tier: 7, preview: "⛩️" },
  { id: "pharaoh",    nameKey: "mascot.item.pharaoh",     category: "hat", tier: 7, preview: "🏛️" },
  { id: "knight",     nameKey: "mascot.item.knight",      category: "hat", tier: 7, preview: "🛡️" },
  // Tier 8
  { id: "astronaut",  nameKey: "mascot.item.astronaut",   category: "hat", tier: 8, preview: "🧑‍🚀" },
  { id: "dragon",     nameKey: "mascot.item.dragon",      category: "hat", tier: 8, preview: "🐉" },
  { id: "spartan",    nameKey: "mascot.item.spartan",     category: "hat", tier: 8, preview: "🏛️" },
  // Tier 9
  { id: "divine",     nameKey: "mascot.item.divine",      category: "hat", tier: 9, preview: "✨" },
  { id: "halo_hat",   nameKey: "mascot.item.haloHat",     category: "hat", tier: 9, preview: "😇" },
  { id: "laurel",     nameKey: "mascot.item.laurel",      category: "hat", tier: 9, preview: "🏆" },
  // Tier 10
  { id: "cosmic",     nameKey: "mascot.item.cosmic",      category: "hat", tier: 10, preview: "🌌" },
  { id: "phoenix",    nameKey: "mascot.item.phoenix",     category: "hat", tier: 10, preview: "🔥" },
  { id: "infinity",   nameKey: "mascot.item.infinity",    category: "hat", tier: 10, preview: "♾️" },
  // Premium
  { id: "pirate",     nameKey: "mascot.item.pirate",      category: "hat", tier: null, price: 1.99, preview: "🏴‍☠️" },
  { id: "santa",      nameKey: "mascot.item.santa",       category: "hat", tier: null, price: 1.99, preview: "🎅" },

  // ══════════════════════════════════════
  // ── Scarves ──
  // ══════════════════════════════════════
  // Tier 1
  { id: "none_scarf", nameKey: "mascot.item.noScarf",     category: "scarf", tier: 1, preview: "🚫" },
  { id: "red",        nameKey: "mascot.item.scarfRed",    category: "scarf", tier: 1, preview: "🔴" },
  { id: "orange",     nameKey: "mascot.item.scarfOrange", category: "scarf", tier: 1, preview: "🟠" },
  // Tier 2
  { id: "blue",       nameKey: "mascot.item.scarfBlue",   category: "scarf", tier: 2, preview: "🔵" },
  { id: "navy",       nameKey: "mascot.item.scarfNavy",   category: "scarf", tier: 2, preview: "🫐" },
  { id: "cyan",       nameKey: "mascot.item.scarfCyan",   category: "scarf", tier: 2, preview: "🩵" },
  // Tier 3
  { id: "green",      nameKey: "mascot.item.scarfGreen",  category: "scarf", tier: 3, preview: "🟢" },
  { id: "lime",       nameKey: "mascot.item.scarfLime",   category: "scarf", tier: 3, preview: "🍀" },
  { id: "teal",       nameKey: "mascot.item.scarfTeal",   category: "scarf", tier: 3, preview: "🧩" },
  // Tier 4
  { id: "gold",       nameKey: "mascot.item.scarfGold",   category: "scarf", tier: 4, preview: "🟡" },
  { id: "amber",      nameKey: "mascot.item.scarfAmber",  category: "scarf", tier: 4, preview: "🍯" },
  { id: "bronze_s",   nameKey: "mascot.item.scarfBronze", category: "scarf", tier: 4, preview: "🥉" },
  // Tier 5
  { id: "purple",     nameKey: "mascot.item.scarfPurple", category: "scarf", tier: 5, preview: "🟣" },
  { id: "violet",     nameKey: "mascot.item.scarfViolet", category: "scarf", tier: 5, preview: "🔮" },
  { id: "indigo",     nameKey: "mascot.item.scarfIndigo", category: "scarf", tier: 5, preview: "🌀" },
  // Tier 6
  { id: "pink",       nameKey: "mascot.item.scarfPink",   category: "scarf", tier: 6, preview: "🩷" },
  { id: "magenta",    nameKey: "mascot.item.scarfMagenta",category: "scarf", tier: 6, preview: "💜" },
  { id: "coral",      nameKey: "mascot.item.scarfCoral",  category: "scarf", tier: 6, preview: "🪸" },
  // Tier 7
  { id: "white_s",    nameKey: "mascot.item.scarfWhite",  category: "scarf", tier: 7, preview: "⚪" },
  { id: "silver_s",   nameKey: "mascot.item.scarfSilver", category: "scarf", tier: 7, preview: "🥈" },
  { id: "pearl_s",    nameKey: "mascot.item.scarfPearl",  category: "scarf", tier: 7, preview: "🦪" },
  // Tier 8
  { id: "black_s",    nameKey: "mascot.item.scarfBlack",  category: "scarf", tier: 8, preview: "⚫" },
  { id: "charcoal_s", nameKey: "mascot.item.scarfCharcoal",category: "scarf", tier: 8, preview: "🖤" },
  { id: "slate_s",    nameKey: "mascot.item.scarfSlate",  category: "scarf", tier: 8, preview: "🪨" },
  // Tier 9
  { id: "rainbow_s",  nameKey: "mascot.item.scarfRainbow",category: "scarf", tier: 9, preview: "🌈" },
  { id: "gradient_s", nameKey: "mascot.item.scarfGradient",category: "scarf", tier: 9, preview: "🎨" },
  { id: "shimmer_s",  nameKey: "mascot.item.scarfShimmer",category: "scarf", tier: 9, preview: "✨" },
  // Tier 10
  { id: "flame_s",    nameKey: "mascot.item.scarfFlame",  category: "scarf", tier: 10, preview: "🔥" },
  { id: "ice_s",      nameKey: "mascot.item.scarfIce",    category: "scarf", tier: 10, preview: "❄️" },
  { id: "galaxy_s",   nameKey: "mascot.item.scarfGalaxy", category: "scarf", tier: 10, preview: "🌌" },

  // ══════════════════════════════════════
  // ── Accessories ──
  // ══════════════════════════════════════
  // Tier 1
  { id: "none_acc",   nameKey: "mascot.item.noAcc",       category: "accessory", tier: 1, preview: "🚫" },
  { id: "satchel",    nameKey: "mascot.item.satchel",     category: "accessory", tier: 1, preview: "👜" },
  { id: "compass",    nameKey: "mascot.item.compass",     category: "accessory", tier: 1, preview: "🧭" },
  // Tier 2
  { id: "binoculars", nameKey: "mascot.item.binoculars",  category: "accessory", tier: 2, preview: "🔭" },
  { id: "whistle",    nameKey: "mascot.item.whistle",     category: "accessory", tier: 2, preview: "📯" },
  { id: "badge_acc",  nameKey: "mascot.item.badgeAcc",    category: "accessory", tier: 2, preview: "📛" },
  // Tier 3
  { id: "bowtie",     nameKey: "mascot.item.bowtie",      category: "accessory", tier: 3, preview: "🎀" },
  { id: "medal",      nameKey: "mascot.item.medal",       category: "accessory", tier: 3, preview: "🎖️" },
  { id: "map_acc",    nameKey: "mascot.item.map",         category: "accessory", tier: 3, preview: "🗺️" },
  // Tier 4
  { id: "trophy",     nameKey: "mascot.item.trophy",      category: "accessory", tier: 4, preview: "🏆" },
  { id: "shield",     nameKey: "mascot.item.shield",      category: "accessory", tier: 4, preview: "🛡️" },
  { id: "scroll",     nameKey: "mascot.item.scroll",      category: "accessory", tier: 4, preview: "📜" },
  // Tier 5
  { id: "cape",       nameKey: "mascot.item.cape",        category: "accessory", tier: 5, preview: "🦸" },
  { id: "sword",      nameKey: "mascot.item.sword",       category: "accessory", tier: 5, preview: "⚔️" },
  { id: "lantern",    nameKey: "mascot.item.lantern",     category: "accessory", tier: 5, preview: "🏮" },
  // Tier 6
  { id: "guitar",     nameKey: "mascot.item.guitar",      category: "accessory", tier: 6, preview: "🎸" },
  { id: "camera",     nameKey: "mascot.item.camera",      category: "accessory", tier: 6, preview: "📸" },
  { id: "telescope",  nameKey: "mascot.item.telescope",   category: "accessory", tier: 6, preview: "🔭" },
  // Tier 7
  { id: "crystal",    nameKey: "mascot.item.crystal",     category: "accessory", tier: 7, preview: "💎" },
  { id: "scepter",    nameKey: "mascot.item.scepter",     category: "accessory", tier: 7, preview: "🪄" },
  { id: "staff",      nameKey: "mascot.item.staff",       category: "accessory", tier: 7, preview: "🏑" },
  // Tier 8
  { id: "armor",      nameKey: "mascot.item.armor",       category: "accessory", tier: 8, preview: "🛡️" },
  { id: "flag",       nameKey: "mascot.item.flag",        category: "accessory", tier: 8, preview: "🚩" },
  { id: "banner",     nameKey: "mascot.item.banner",      category: "accessory", tier: 8, preview: "🏴" },
  // Tier 9
  { id: "lightning",  nameKey: "mascot.item.lightning",   category: "accessory", tier: 9, preview: "⚡" },
  { id: "aura",       nameKey: "mascot.item.aura",        category: "accessory", tier: 9, preview: "🌟" },
  { id: "stardust",   nameKey: "mascot.item.stardust",    category: "accessory", tier: 9, preview: "💫" },
  // Tier 10
  { id: "cosmic_aura",nameKey: "mascot.item.cosmicAura",  category: "accessory", tier: 10, preview: "🌌" },
  { id: "halo_acc",   nameKey: "mascot.item.haloAcc",     category: "accessory", tier: 10, preview: "😇" },
  { id: "phoenix_wings",nameKey: "mascot.item.phoenixWings",category: "accessory", tier: 10, preview: "🔥" },
  // Premium
  { id: "wings",      nameKey: "mascot.item.wings",       category: "accessory", tier: null, price: 1.99, preview: "🪽" },

  // ══════════════════════════════════════
  // ── Boots ──
  // ══════════════════════════════════════
  // Tier 1
  { id: "brown",       nameKey: "mascot.item.bootsBrown",   category: "boots", tier: 1, preview: "🟤" },
  { id: "tan",         nameKey: "mascot.item.bootsTan",      category: "boots", tier: 1, preview: "🫘" },
  { id: "beige",       nameKey: "mascot.item.bootsBeige",    category: "boots", tier: 1, preview: "🧈" },
  // Tier 2
  { id: "black",       nameKey: "mascot.item.bootsBlack",    category: "boots", tier: 2, preview: "⚫" },
  { id: "dark_brown",  nameKey: "mascot.item.bootsDarkBrown",category: "boots", tier: 2, preview: "🫛" },
  { id: "olive",       nameKey: "mascot.item.bootsOlive",    category: "boots", tier: 2, preview: "🫒" },
  // Tier 3
  { id: "navy_boots",  nameKey: "mascot.item.bootsNavy",     category: "boots", tier: 3, preview: "🫐" },
  { id: "forest",      nameKey: "mascot.item.bootsForest",   category: "boots", tier: 3, preview: "🌲" },
  { id: "burgundy",    nameKey: "mascot.item.bootsBurgundy", category: "boots", tier: 3, preview: "🍷" },
  // Tier 4
  { id: "gold_boots",  nameKey: "mascot.item.bootsGold",     category: "boots", tier: 4, preview: "🟡" },
  { id: "copper",      nameKey: "mascot.item.bootsCopper",   category: "boots", tier: 4, preview: "🪙" },
  { id: "bronze_b",    nameKey: "mascot.item.bootsBronze",   category: "boots", tier: 4, preview: "🥉" },
  // Tier 5
  { id: "silver_boots",nameKey: "mascot.item.bootsSilver",   category: "boots", tier: 5, preview: "🥈" },
  { id: "platinum",    nameKey: "mascot.item.bootsPlatinum", category: "boots", tier: 5, preview: "⬜" },
  { id: "steel",       nameKey: "mascot.item.bootsSteel",    category: "boots", tier: 5, preview: "🔩" },
  // Tier 6
  { id: "crimson",     nameKey: "mascot.item.bootsCrimson",  category: "boots", tier: 6, preview: "🔴" },
  { id: "sapphire",    nameKey: "mascot.item.bootsSapphire", category: "boots", tier: 6, preview: "🔵" },
  { id: "emerald",     nameKey: "mascot.item.bootsEmerald",  category: "boots", tier: 6, preview: "🟢" },
  // Tier 7
  { id: "white_boots", nameKey: "mascot.item.bootsWhite",    category: "boots", tier: 7, preview: "⚪" },
  { id: "pearl_boots", nameKey: "mascot.item.bootsPearl",    category: "boots", tier: 7, preview: "🦪" },
  { id: "ivory",       nameKey: "mascot.item.bootsIvory",    category: "boots", tier: 7, preview: "🦴" },
  // Tier 8
  { id: "obsidian",    nameKey: "mascot.item.bootsObsidian", category: "boots", tier: 8, preview: "🖤" },
  { id: "midnight",    nameKey: "mascot.item.bootsMidnight", category: "boots", tier: 8, preview: "🌑" },
  { id: "shadow",      nameKey: "mascot.item.bootsShadow",   category: "boots", tier: 8, preview: "🌘" },
  // Tier 9
  { id: "rainbow_b",   nameKey: "mascot.item.bootsRainbow",  category: "boots", tier: 9, preview: "🌈" },
  { id: "aurora_b",    nameKey: "mascot.item.bootsAurora",   category: "boots", tier: 9, preview: "🎆" },
  { id: "prismatic",   nameKey: "mascot.item.bootsPrismatic",category: "boots", tier: 9, preview: "💠" },
  // Tier 10
  { id: "flame_boots", nameKey: "mascot.item.bootsFlame",    category: "boots", tier: 10, preview: "🔥" },
  { id: "cosmic_boots",nameKey: "mascot.item.bootsCosmic",   category: "boots", tier: 10, preview: "🌌" },
  { id: "divine_boots",nameKey: "mascot.item.bootsDivine",   category: "boots", tier: 10, preview: "✨" },
  // Premium
  { id: "red_boots",   nameKey: "mascot.item.bootsRed",      category: "boots", tier: null, price: 0.99, preview: "🔴" },
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

export function getItemsByTier(tier: number): MascotItem[] {
  return MASCOT_ITEMS.filter((item) => item.tier === tier);
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
  // Tier 1
  red: "#C45D3E",
  orange: "#E8805F",
  // Tier 2
  blue: "#4A7FC4",
  navy: "#2C3E6B",
  cyan: "#0EA5E9",
  // Tier 3
  green: "#3A7D5C",
  lime: "#65A30D",
  teal: "#0D9488",
  // Tier 4
  gold: "#D4A853",
  amber: "#D97706",
  bronze_s: "#CD7F32",
  // Tier 5
  purple: "#8B5CF6",
  violet: "#7C3AED",
  indigo: "#4F46E5",
  // Tier 6
  pink: "#EC4899",
  magenta: "#D946EF",
  coral: "#F43F5E",
  // Tier 7
  white_s: "#E8E8E8",
  silver_s: "#A8A8B0",
  pearl_s: "#F0EDE6",
  // Tier 8
  black_s: "#2D2D2D",
  charcoal_s: "#404040",
  slate_s: "#64748B",
  // Tier 9
  rainbow_s: "#C45D3E",
  gradient_s: "#8B5CF6",
  shimmer_s: "#D4A853",
  // Tier 10
  flame_s: "#EF4444",
  ice_s: "#7DD3FC",
  galaxy_s: "#6366F1",
};

export const BOOT_COLORS: Record<string, { main: string; sole: string }> = {
  // Tier 1
  brown:       { main: "#6B4226", sole: "#4A2E1A" },
  tan:         { main: "#C4956A", sole: "#A67B4F" },
  beige:       { main: "#D4B896", sole: "#B89B78" },
  // Tier 2
  black:       { main: "#2D2D2D", sole: "#1A1A1A" },
  dark_brown:  { main: "#4A2E1A", sole: "#2E1A0E" },
  olive:       { main: "#556B2F", sole: "#3E4F22" },
  // Tier 3
  navy_boots:  { main: "#2C3E6B", sole: "#1A2545" },
  forest:      { main: "#2D5A3A", sole: "#1A3D25" },
  burgundy:    { main: "#722F37", sole: "#4A1E23" },
  // Tier 4
  gold_boots:  { main: "#B8860B", sole: "#8B6914" },
  copper:      { main: "#B87333", sole: "#8B5A25" },
  bronze_b:    { main: "#CD7F32", sole: "#A66328" },
  // Tier 5
  silver_boots:{ main: "#A8A8B0", sole: "#808088" },
  platinum:    { main: "#D0D0D8", sole: "#A0A0A8" },
  steel:       { main: "#71797E", sole: "#525A5E" },
  // Tier 6
  crimson:     { main: "#DC143C", sole: "#A0102E" },
  sapphire:    { main: "#2E5BA8", sole: "#1E3D70" },
  emerald:     { main: "#2E8B57", sole: "#1E6B42" },
  // Tier 7
  white_boots: { main: "#F0F0F0", sole: "#D0D0D0" },
  pearl_boots: { main: "#F0EDE6", sole: "#D8D4CC" },
  ivory:       { main: "#FFFFF0", sole: "#E8E8D8" },
  // Tier 8
  obsidian:    { main: "#1A1A2E", sole: "#0E0E1A" },
  midnight:    { main: "#191970", sole: "#0E0E45" },
  shadow:      { main: "#2D2D3D", sole: "#1A1A28" },
  // Tier 9
  rainbow_b:   { main: "#C45D3E", sole: "#4A7FC4" },
  aurora_b:    { main: "#3A7D5C", sole: "#8B5CF6" },
  prismatic:   { main: "#D4A853", sole: "#EC4899" },
  // Tier 10
  flame_boots: { main: "#DC2626", sole: "#F97316" },
  cosmic_boots:{ main: "#4F46E5", sole: "#7C3AED" },
  divine_boots:{ main: "#D4A853", sole: "#FBBF24" },
  // Premium
  red_boots:   { main: "#A63030", sole: "#7A2020" },
};
