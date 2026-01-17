"use client";

import "./globals.css";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { PresentationProvider } from "@/context/PresentationContext";

function HtmlWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <PresentationProvider>
        <HtmlWrapper>{children}</HtmlWrapper>
      </PresentationProvider>
    </LanguageProvider>
  );
}

