"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
    const { lang } = useLanguage();

    return (
        <footer className="bg-brown text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gold">
                            {lang === "en" ? "About Gharim Store" : "عن غريم ستور"}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {lang === "en"
                                ? "A calm shopping experience inspired by Iraqi culture and Islamic values. We offer quality products with exceptional service."
                                : "تجربة تسوق هادئة مستوحاة من الثقافة العراقية والقيم الإسلامية. نقدم منتجات عالية الجودة مع خدمة استثنائية."}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gold">
                            {lang === "en" ? "Quick Links" : "روابط سريعة"}
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-gold transition">
                                    {lang === "en" ? "Home" : "الرئيسية"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-300 hover:text-gold transition">
                                    {lang === "en" ? "Products" : "المنتجات"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-gray-300 hover:text-gold transition">
                                    {lang === "en" ? "Cart" : "العلاگه"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin" className="text-gray-300 hover:text-gold transition">
                                    {lang === "en" ? "Admin" : "الإدارة"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gold">
                            {lang === "en" ? "Contact Us" : "اتصل بنا"}
                        </h3>
                        <div className="space-y-3 text-gray-300">
                            <p className="flex items-center gap-2">
                                <span>📞</span>
                                <span dir="ltr">+964 XXX XXX XXXX</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span>📧</span>
                                <span>info@gharimstore.com</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span>📍</span>
                                <span>{lang === "en" ? "Baghdad, Iraq" : "بغداد، العراق"}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        {lang === "en"
                            ? "© 2026 Gharim Store. All rights reserved."
                            : "© 2026 غريم ستور. جميع الحقوق محفوظة."}
                    </p>
                    <p className="mt-2 text-sm">
                        {lang === "en"
                            ? "Made with ❤️ for the Iraqi community"
                            : "صُنع بـ ❤️ للمجتمع العراقي"}
                    </p>
                </div>
            </div>
        </footer>
    );
}
