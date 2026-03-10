"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const { t } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-4 px-4 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>© {year} SkillFinder — {t("footer.rights")}</span>
        <div className="flex items-center gap-4">
          <Link href="/confidentialite" className="hover:text-[#C45D3E] transition-colors">
            {t("footer.privacy")}
          </Link>
          <Link href="/mentions-legales" className="hover:text-[#C45D3E] transition-colors">
            {t("footer.legal")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
