"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { PresentationProvider } from "@/context/PresentationContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            <CartProvider>
                <PresentationProvider>
                    <Header />
                    {children}
                    <Footer />
                </PresentationProvider>
            </CartProvider>
        </LanguageProvider>
    );
}
