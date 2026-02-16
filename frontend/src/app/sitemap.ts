import type { MetadataRoute } from "next";

const BASE_URL = "https://skillfinder.fr";

const CITIES = [
  "paris", "lyon", "marseille", "toulouse", "nice",
  "nantes", "strasbourg", "montpellier", "bordeaux", "lille",
  "rennes", "reims", "toulon", "grenoble", "dijon",
  "angers", "nimes", "clermont-ferrand", "le-havre", "aix-en-provence",
];

const SERVICES = [
  "coiffeur", "dentiste", "plombier", "electricien", "restaurant",
  "boulangerie", "garagiste", "veterinaire", "opticien", "pharmacie",
  "avocat", "osteopathe", "kinesitherapeute", "serrurier", "peintre",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Generate one entry per city+service combo
  for (const city of CITIES) {
    for (const service of SERVICES) {
      entries.push({
        url: `${BASE_URL}/ville/${city}/${service}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
