"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

export default function AudioNarration() {
    const { lang } = useLanguage();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Switch audio source when language changes
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = !audioRef.current.paused;
            audioRef.current.src = `/audio/narration-${lang}.mp3`;

            setHasError(false);
            if (wasPlaying) {
                audioRef.current.play().catch(() => setHasError(true));
            }
        }
    }, [lang]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => setHasError(true));
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Hide the component if audio files are missing
    if (hasError) {
        return null;
    }

    return (
        <div className="flex items-center gap-4">
            <audio
                ref={audioRef}
                src={`/audio/narration-${lang}.mp3`}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setHasError(true)}
            />

            <button
                onClick={togglePlay}
                className="px-6 py-3 bg-brown text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
                aria-label={isPlaying ? "Pause narration" : "Play narration"}
            >
                {isPlaying ? (
                    <>
                        <span>⏸️</span>
                        <span>{lang === "en" ? "Pause" : "إيقاف مؤقت"}</span>
                    </>
                ) : (
                    <>
                        <span>▶️</span>
                        <span>{lang === "en" ? "Listen to Welcome Message" : "استمع إلى رسالة الترحيب"}</span>
                    </>
                )}
            </button>
        </div>
    );
}
