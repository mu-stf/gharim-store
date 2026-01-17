"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 1.5, // sync with narration intro
                duration: 1.2,
                ease: "easeOut",
            }}
            className="flex justify-center"
        >
            <Image
                src="/logo.png"
                alt="Gharim Store Logo"
                width={120}
                height={120}
                priority
            />
        </motion.div>
    );
}
