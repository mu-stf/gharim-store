"use client";

import { usePresentation } from "@/context/PresentationContext";

export default function PresentationToggle() {
    const { active, start, stop } = usePresentation();

    return (
        <button
            onClick={active ? stop : start}
            className="fixed bottom-4 left-4 bg-[var(--gold)] text-white px-4 py-2 rounded shadow-lg hover:opacity-90 transition z-50"
        >
            {active ? "⏹️ Stop Presentation" : "▶️ Start Presentation"}
        </button>
    );
}
