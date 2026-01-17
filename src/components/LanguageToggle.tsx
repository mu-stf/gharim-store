"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 px-4 py-2 rounded bg-[var(--gold)] text-white"
    >
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}
