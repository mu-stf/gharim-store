"use client";

import { createContext, useContext, useState } from "react";

const PresentationContext = createContext({
    active: false,
    start: () => { },
    stop: () => { },
});

export function PresentationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [active, setActive] = useState(false);

    return (
        <PresentationContext.Provider
            value={{
                active,
                start: () => setActive(true),
                stop: () => setActive(false),
            }}
        >
            {children}
        </PresentationContext.Provider>
    );
}

export const usePresentation = () => useContext(PresentationContext);
