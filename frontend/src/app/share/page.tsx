import type { Metadata } from "next";
import { getPhotoUrl } from "@/lib/api";
import SharePageClient from "./SharePageClient";

interface Props {
  searchParams: Promise<Record<string, string | undefined>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const name = params.name || "Commerce";
  const score = params.score || "";
  const rating = params.rating || "";
  const keyword = params.keyword || "";
  const address = params.address || "";

  const title = score
    ? `${name} — Score ${score}/5 sur SkillFinder`
    : `${name} sur SkillFinder`;

  const descParts: string[] = [];
  if (keyword) descParts.push(`Critère : ${keyword}`);
  if (rating) descParts.push(`Note Google : ${rating}/5`);
  if (address) descParts.push(address);
  const description = descParts.length > 0
    ? descParts.join(" · ")
    : "Découvrez ce commerce sur SkillFinder";

  const photo = params.photo;
  const images = photo
    ? [{ url: getPhotoUrl(photo), width: 600, height: 400, alt: name }]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "SkillFinder",
      locale: "fr_FR",
      images,
    },
    twitter: {
      card: photo ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const params = await searchParams;
  return <SharePageClient params={params} />;
}
