# إعداد قاعدة البيانات Supabase

## الخطوات

### 1. إنشاء مشروع Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد أو استخدم المشروع الحالي
3. احفظ:
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon/public key` (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 2. تحديث ملف `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. تنفيذ Setup Script
1. افتح Supabase Dashboard
2. اذهب إلى **SQL Editor**
3. انسخ محتوى ملف `setup.sql` بالكامل
4. الصقه في SQL Editor
5. اضغط **Run** ▶️

سيقوم هذا بـ:
- إنشاء جميع الجداول (products, categories, orders, reviews, coupons)
- إضافة Indexes للأداء
- تفعيل Row Level Security
- إضافة Triggers تلقائية
- إنشاء الفئات الافتراضية

### 4. تنفيذ Seed Data Script
1. في نفس SQL Editor
2. افتح تبويب جديد
3. انسخ محتوى ملف `seed.sql`
4. الصقه واضغط **Run** ▶️

سيضيف هذا 20 منتج تجريبي:
- 5 منتجات قهوة
- 5 منتجات حلويات
- 5 هدايا
- 3 منتجات تقليدية
- 2 كتب

### 5. إعداد Storage للصور
1. في Supabase Dashboard، اذهب إلى **Storage**
2. أنشئ Bucket جديد باسم `product-images`
3. اجعله **Public**
4. ارفع صور المنتجات
5. انسخ URLs وحدّث الـ `image_url` في جدول products

**مثال على رفع صورة:**
```sql
-- بعد رفع الصورة، حدّث المنتج
UPDATE products 
SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/arabic-coffee.jpg'
WHERE name_en = 'Arabic Coffee Premium';
```

### 6. التحقق من البيانات
```sql
-- عرض جميع المنتجات
SELECT * FROM products ORDER BY section, name_ar;

-- عرض الفئات
SELECT * FROM categories;

-- إحصائيات
SELECT 
  section,
  COUNT(*) as products_count,
  SUM(stock) as total_stock,
  SUM(CASE WHEN featured = true THEN 1 ELSE 0 END) as featured_count
FROM products
GROUP BY section;
```

## ملاحظات مهمة

### الصور
حالياً المنتجات تحتوي على مسارات placeholder للصور. يجب:
1. رفع صور المنتجات إلى Supabase Storage
2. أو استخدام صور من مصدر خارجي (مؤقتاً)
3. تحديث `image_url` لكل منتج

### Placeholder Image Service
يمكنك استخدام خدمة مثل:
```
https://placehold.co/400x400/F5EFE6/4B3621?text=Product
```

### الأسعار
جميع الأسعار بالدينار العراقي (IQD) بدون فواصل عشرية.
- 75000 = 75,000 IQD

### RLS (Row Level Security)
- القراءة: مفتوحة للجميع
- الكتابة: سيتم تقييدها للـ Admin لاحقاً

## خطوات تالية

بعد إتمام إعداد قاعدة البيانات:
1. ✅ تشغيل `npm run dev`
2. ✅ زيارة `/products` للتحقق من ظهور المنتجات
3. ✅ اختبار إضافة منتج للسلة
4. ✅ اختبار Checkout

## استكشاف الأخطاء

### المنتجات لا تظهر
```sql
-- تحقق من وجود منتجات
SELECT COUNT(*) FROM products;

-- تحقق من RLS policies
SELECT * FROM pg_policies WHERE tablename = 'products';
```

### خطأ في الاتصال
- تحقق من `.env.local`
- تأكد من صحة الـ URL و Key
- أعد تشغيل `npm run dev`

### صور لا تظهر
- تأكد من أن Storage Bucket عام (public)
- تحقق من صحة المسارات
