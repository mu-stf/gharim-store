"use client";

import { createContext, useContext, useState } from "react";

type Language = "en" | "ar";

const LanguageContext = createContext({
    lang: "en" as Language,
    toggleLang: () => { },
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>("en");

    const toggleLang = () => {
        setLang(prev => (prev === "en" ? "ar" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
