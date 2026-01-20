"use client";

import Logo from "@/components/Logo";
import PresentationToggle from "@/components/PresentationToggle";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const { lang } = useLanguage();

  const categories = [
    { id: "coffee", icon: "☕", name_en: "Coffee", name_ar: "قهوة", color: "from-amber-500 to-orange-600" },
    { id: "sweets", icon: "🍰", name_en: "Sweets", name_ar: "حلويات", color: "from-pink-500 to-rose-600" },
    { id: "gifts", icon: "🎁", name_en: "Gifts", name_ar: "هدايا", color: "from-purple-500 to-indigo-600" },
    { id: "traditional", icon: "🏺", name_en: "Traditional", name_ar: "تقليدية", color: "from-emerald-500 to-teal-600" },
    { id: "books", icon: "📚", name_en: "Books", name_ar: "كتب", color: "from-blue-500 to-cyan-600" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-beige via-cream to-white py-20 md:py-32 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-olive opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center gap-8">
            {/* Logo with Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="animate-float"
            >
              <Logo />
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-brown mb-4">
                {lang === "en" ? "Gharim Store" : "غريم ستور"}
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-gold to-olive mx-auto rounded-full"></div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed"
            >
              {lang === "en"
                ? "A calm shopping experience inspired by Iraqi culture and Islamic values"
                : "تجربة تسوق هادئة مستوحاة من الثقافة العراقية والقيم الإسلامية"}
            </motion.p>



            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <Link
                href="/products"
                className="px-8 py-4 bg-brown text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                {lang === "en" ? "Browse Products" : "تصفح المنتجات"} 🛍️
              </Link>
              <Link
                href="/cart"
                className="px-8 py-4 bg-white text-brown border-2 border-brown rounded-lg font-bold text-lg hover:bg-beige transition-all hover:shadow-xl"
              >
                {lang === "en" ? "View Cart" : "عرض العلاگه"} 🛒
              </Link>
            </motion.div>

            {/* Presentation Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <PresentationToggle />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brown mb-4">
              {lang === "en" ? "Shop by Category" : "تسوق حسب الفئة"}
            </h2>
            <p className="text-lg text-gray-600">
              {lang === "en"
                ? "Explore our carefully curated collections"
                : "استكشف مجموعاتنا المختارة بعناية"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/${category.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-2">
                    <div className={`text-6xl mb-4 group-hover:scale-110 transition-transform`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-brown">
                      {lang === "en" ? category.name_en : category.name_ar}
                    </h3>
                    <div className={`h-1 w-16 bg-gradient-to-r ${category.color} mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-beige to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold text-brown mb-2">
                {lang === "en" ? "Fast Delivery" : "توصيل سريع"}
              </h3>
              <p className="text-gray-600">
                {lang === "en"
                  ? "Quick delivery across all Iraqi governorates"
                  : "توصيل سريع لجميع المحافظات العراقية"}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-brown mb-2">
                {lang === "en" ? "Quality Products" : "منتجات عالية الجودة"}
              </h3>
              <p className="text-gray-600">
                {lang === "en"
                  ? "Carefully selected premium products"
                  : "منتجات ممتازة مختارة بعناية"}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center p-8 bg-white rounded-2xl shadow-lg"
            >
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-brown mb-2">
                {lang === "en" ? "24/7 Support" : "دعم على مدار الساعة"}
              </h3>
              <p className="text-gray-600">
                {lang === "en"
                  ? "Always here to help via WhatsApp"
                  : "دائماً هنا للمساعدة عبر واتساب"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brown text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {lang === "en" ? "Ready to Start Shopping?" : "جاهز للبدء بالتسوق؟"}
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              {lang === "en"
                ? "Discover our amazing collection of products today!"
                : "اكتشف مجموعتنا الرائعة من المنتجات اليوم!"}
            </p>
            <Link
              href="/products"
              className="inline-block px-10 py-4 bg-gold text-brown rounded-lg font-bold text-lg hover:bg-light-gold transition-all hover:shadow-2xl hover:scale-105"
            >
              {lang === "en" ? "Shop Now" : "تسوق الآن"} →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
