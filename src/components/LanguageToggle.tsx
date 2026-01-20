"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    // Update html attributes when language changes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 px-4 py-2 rounded bg-[var(--gold)] text-white"
    >
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}
