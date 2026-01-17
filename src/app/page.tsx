"use client";

import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import AudioNarration from "@/components/AudioNarration";
import PresentationToggle from "@/components/PresentationToggle";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <LanguageToggle />
      <Logo />

      <h1 className="text-4xl font-bold text-center">
        {lang === "en" ? "Gharim Store" : "غريم ستور"}
      </h1>

      <p className="text-lg text-center max-w-xl">
        {lang === "en"
          ? "A calm shopping experience inspired by Iraqi culture and Islamic values"
          : "تجربة تسوق هادئة مستوحاة من الثقافة العراقية والقيم الإسلامية"}
      </p>

      <AudioNarration />
      <PresentationToggle />
    </main>
  );
}
