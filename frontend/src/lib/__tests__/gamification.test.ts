import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getIncrement,
  addPoints,
  getLevel,
  getUserRank,
  earnPoints,
  loadRewards,
  saveRewards,
  hasVoted,
  markVoted,
  type RewardsData,
} from "../gamification";

// Mock localStorage
const store: Record<string, string> = {};
beforeEach(() => {
  Object.keys(store).forEach((k) => delete store[k]);
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  });
});

describe("getIncrement", () => {
  it("returns 10 for points under 100", () => {
    expect(getIncrement(0)).toBe(10);
    expect(getIncrement(50)).toBe(10);
    expect(getIncrement(99)).toBe(10);
  });

  it("returns 1 for points >= 100", () => {
    expect(getIncrement(100)).toBe(1);
    expect(getIncrement(500)).toBe(1);
  });

  it("returns 0 at hard cap (1000)", () => {
    expect(getIncrement(1000)).toBe(0);
  });
});

describe("addPoints", () => {
  it("adds 10 when under 100", () => {
    expect(addPoints(0)).toBe(10);
    expect(addPoints(90)).toBe(100);
  });

  it("adds 1 when >= 100", () => {
    expect(addPoints(100)).toBe(101);
    expect(addPoints(999)).toBe(1000);
  });

  it("caps at 1000", () => {
    expect(addPoints(1000)).toBe(1000);
  });
});

describe("getLevel", () => {
  it("returns 1 for 0 points", () => {
    expect(getLevel(0)).toBe(1);
  });

  it("returns points directly for 1-100", () => {
    expect(getLevel(50)).toBe(50);
    expect(getLevel(100)).toBe(100);
  });

  it("returns points directly above 100", () => {
    expect(getLevel(500)).toBe(500);
    expect(getLevel(1000)).toBe(1000);
  });
});

describe("getUserRank", () => {
  it("returns tier 1 for new user", () => {
    const rank = getUserRank(0);
    expect(rank.palier).toBe(1);
    expect(rank.title).toBe("Apprenti Dénicheur");
  });

  it("returns correct tier for 200 points", () => {
    const rank = getUserRank(200);
    expect(rank.palier).toBe(2);
    expect(rank.title).toBe("Éclaireur Urbain");
  });

  it("returns tier 10 for max points", () => {
    const rank = getUserRank(1000);
    expect(rank.palier).toBe(10);
    expect(rank.title).toBe("Divinité Suprême");
  });

  it("progress is between 0 and 1", () => {
    const rank = getUserRank(150);
    expect(rank.progress).toBeGreaterThanOrEqual(0);
    expect(rank.progress).toBeLessThanOrEqual(1);
  });
});

describe("earnPoints", () => {
  it("increments points and weekly points", () => {
    const data: RewardsData = {
      points: 0,
      pseudo: "Test",
      city: "Paris, France",
      weekStart: new Date().toISOString().split("T")[0],
      weeklyPoints: 0,
      weeklyPointsByCity: {},
    };
    const { newData, increment } = earnPoints(data);
    expect(increment).toBe(10);
    expect(newData.points).toBe(10);
    expect(newData.weeklyPointsByCity["Paris, France"]).toBe(10);
  });

  it("detects 100-point milestone", () => {
    const data: RewardsData = {
      points: 100,
      pseudo: "Test",
      city: "Nice, France",
      weekStart: new Date().toISOString().split("T")[0],
      weeklyPoints: 100,
      weeklyPointsByCity: { "Nice, France": 100 },
    };
    const { hitMilestone } = earnPoints(data);
    expect(hitMilestone).toBe(true);
  });

  it("does not add points at cap", () => {
    const data: RewardsData = {
      points: 1000,
      pseudo: "Test",
      city: "Paris, France",
      weekStart: new Date().toISOString().split("T")[0],
      weeklyPoints: 200,
      weeklyPointsByCity: { "Paris, France": 200 },
    };
    const { newData, increment } = earnPoints(data);
    expect(increment).toBe(0);
    expect(newData.points).toBe(1000);
  });
});

describe("loadRewards", () => {
  it("returns default for empty storage", () => {
    const data = loadRewards();
    expect(data.points).toBe(0);
    expect(data.pseudo).toBe("Guest");
  });

  it("loads saved data", () => {
    const saved: RewardsData = {
      points: 50,
      pseudo: "Alice",
      city: "Lyon, France",
      weekStart: new Date().toISOString().split("T")[0],
      weeklyPoints: 50,
      weeklyPointsByCity: { "Lyon, France": 50 },
    };
    store["sf_rewards"] = JSON.stringify(saved);
    const data = loadRewards();
    expect(data.points).toBe(50);
    expect(data.pseudo).toBe("Alice");
  });

  it("resets weekly points on new week", () => {
    const saved: RewardsData = {
      points: 50,
      pseudo: "Alice",
      city: "Lyon, France",
      weekStart: "2020-01-06",
      weeklyPoints: 30,
      weeklyPointsByCity: { "Lyon, France": 30 },
    };
    store["sf_rewards"] = JSON.stringify(saved);
    const data = loadRewards();
    expect(data.weeklyPoints).toBe(0);
    expect(data.weeklyPointsByCity).toEqual({});
  });
});

describe("voted places", () => {
  it("returns false for unvoted place", () => {
    expect(hasVoted("place_123")).toBe(false);
  });

  it("marks and checks voted places", () => {
    markVoted("place_123");
    expect(hasVoted("place_123")).toBe(true);
    expect(hasVoted("place_456")).toBe(false);
  });

  it("does not duplicate votes", () => {
    markVoted("place_123");
    markVoted("place_123");
    const raw = JSON.parse(store["sf_voted_places"]);
    expect(raw.filter((p: string) => p === "place_123").length).toBe(1);
  });

  it("caps at 500 voted places", () => {
    const places = Array.from({ length: 510 }, (_, i) => `place_${i}`);
    for (const p of places) markVoted(p);
    const raw = JSON.parse(store["sf_voted_places"]);
    expect(raw.length).toBeLessThanOrEqual(500);
    // Most recent should be kept
    expect(raw).toContain("place_509");
  });
});
