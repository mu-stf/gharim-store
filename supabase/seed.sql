-- ==========================================
-- Seed Data - بدون RLS مشاكل
-- ==========================================

-- 1. تعطيل RLS مؤقتاً للإدخال
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;

-- 2. حذف البيانات القديمة (إن وجدت)
DELETE FROM products;
DELETE FROM categories;

-- 3. إضافة الفئات
INSERT INTO categories (name_en, name_ar, slug, icon) VALUES
  ('Coffee', 'قهوة', 'coffee', '☕'),
  ('Sweets', 'حلويات', 'sweets', '🍰'),
  ('Gifts', 'هدايا', 'gifts', '🎁'),
  ('Traditional', 'تقليدية', 'traditional', '🏺'),
  ('Books', 'كتب', 'books', '📚');

-- 4. إضافة المنتجات - قهوة (Coffee)
INSERT INTO products (name_en, name_ar, description_en, description_ar, price, image_url, section, stock, featured) VALUES
('Arabic Coffee Premium', 'قهوة عربية فاخرة', 'Premium Arabic coffee with authentic Iraqi taste, roasted to perfection', 'قهوة عربية فاخرة بطعم عراقي أصيل، محمصة بعناية', 75000, 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400', 'coffee', 50, true),
('Turkish Coffee', 'قهوة تركية', 'Traditional Turkish coffee ground to finest powder', 'قهوة تركية تقليدية مطحونة طحناً ناعماً', 65000, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400', 'coffee', 40, false),
('Cardamom Coffee', 'قهوة بالهيل', 'Arabic coffee blended with premium cardamom', 'قهوة عربية ممزوجة بالهيل الفاخر', 85000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', 'coffee', 30, true),
('Espresso Beans', 'حبوب إسبريسو', 'Italian espresso beans for the perfect morning brew', 'حبوب إسبريسو إيطالية للتحضير الصباحي المثالي', 95000, 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', 'coffee', 25, false),
('Coffee Gift Set', 'طقم قهوة', 'Complete coffee set with 3 types of premium coffee', 'طقم قهوة كامل يحتوي على 3 أنواع من القهوة الفاخرة', 180000, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', 'coffee', 15, true);

-- 5. حلويات (Sweets)
INSERT INTO products (name_en, name_ar, description_en, description_ar, price, image_url, section, stock, featured) VALUES
('Baklava Box', 'علبة بقلاوة', 'Authentic Iraqi baklava filled with pistachios and honey', 'بقلاوة عراقية أصيلة محشوة بالفستق والعسل', 120000, 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400', 'sweets', 20, true),
('Dates with Chocolate', 'تمر بالشوكولاتة', 'Premium dates filled with Belgian chocolate', 'تمر فاخر محشو بالشوكولاتة البلجيكية', 90000, 'https://images.unsplash.com/photo-1585519884491-9eab74b4e2d7?w=400', 'sweets', 35, false),
('Kleicha Cookies', 'كليجة عراقية', 'Traditional Iraqi cookies filled with dates', 'كليجة عراقية تقليدية محشوة بالتمر', 55000, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', 'sweets', 40, true),
('Halva', 'حلاوة طحينية', 'Sweet sesame tahini halva with pistachios', 'حلاوة طحينية حلوة مع الفستق', 45000, 'https://images.unsplash.com/photo-1587241321921-91a834d82ccf?w=400', 'sweets', 45, false),
('Mixed Sweets Box', 'علبة حلويات متنوعة', 'Assorted Iraqi sweets perfect for gifting', 'علبة حلويات عراقية متنوعة مثالية للإهداء', 150000, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 'sweets', 18, true);

-- 6. هدايا (Gifts)
INSERT INTO products (name_en, name_ar, description_en, description_ar, price, image_url, section, stock, featured) VALUES
('Ramadan Gift Box', 'صندوق هدايا رمضان', 'Special Ramadan gift box with dates, coffee, and prayer beads', 'صندوق هدايا رمضاني خاص يحتوي على تمر وقهوة ومسبحة', 200000, 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', 'gifts', 25, true),
('Prayer Mat Set', 'طقم سجادة صلاة', 'Luxury prayer mat with matching accessories', 'سجادة صلاة فاخرة مع إكسسوارات مطابقة', 135000, 'https://images.unsplash.com/photo-1609743522471-83c84ce23e32?w=400', 'gifts', 30, false),
('Islamic Wall Art', 'فن إسلامي للحائط', 'Beautiful Islamic calligraphy wall decoration', 'لوحة خط عربي إسلامية جميلة للحائط', 85000, 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400', 'gifts', 20, true),
('Tasbih Prayer Beads', 'مسبحة', 'Handcrafted wooden prayer beads', 'مسبحة خشبية مصنوعة يدوياً', 40000, 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400', 'gifts', 50, false),
('Eid Gift Set', 'طقم هدايا العيد', 'Complete Eid gift set for the whole family', 'طقم هدايا عيد كامل للعائلة', 250000, 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400', 'gifts', 12, true);

-- 7. تقليدية (Traditional)
INSERT INTO products (name_en, name_ar, description_en, description_ar, price, image_url, section, stock, featured) VALUES
('Copper Dallah', 'دلة نحاسية', 'Traditional Iraqi copper coffee pot', 'دلة قهوة نحاسية عراقية تقليدية', 180000, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400', 'traditional', 15, true),
('Palm Basket', 'سلة خوص', 'Handwoven palm basket, traditional Iraqi craft', 'سلة خوص منسوجة يدوياً، حرفة عراقية تقليدية', 60000, 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?w=400', 'traditional', 22, false),
('Traditional Tea Set', 'طقم شاي تقليدي', 'Complete traditional Iraqi tea serving set', 'طقم تقديم شاي عراقي تقليدي كامل', 220000, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400', 'traditional', 10, true);

-- 8. كتب (Books)
INSERT INTO products (name_en, name_ar, description_en, description_ar, price, image_url, section, stock, featured) VALUES
('Holy Quran Luxury Edition', 'القرآن الكريم - نسخة فاخرة', 'Beautifully bound Quran with gold accents', 'مصحف مجلد بشكل جميل مع زخارف ذهبية', 150000, 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400', 'books', 20, true),
('Islamic Stories for Children', 'قصص إسلامية للأطفال', 'Collection of Islamic stories to teach children values', 'مجموعة قصص إسلامية لتعليم الأطفال القيم', 70000, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 'books', 30, false);

-- 9. إعادة تفعيل RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- 10. التحقق
SELECT 
  section,
  COUNT(*) as products_count,
  SUM(stock) as total_stock,
  AVG(price) as avg_price
FROM products
GROUP BY section
ORDER BY section;

SELECT 'تم إضافة ' || COUNT(*) || ' منتج بنجاح! 🎉' as status FROM products;
