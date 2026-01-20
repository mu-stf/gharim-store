-- ==========================================
-- Migration: إضافة الأعمدة المفقودة
-- ==========================================

-- 1. حذف الجداول القديمة وإعادة إنشائها (خيار آمن)
-- تحذير: هذا سيحذف جميع البيانات الموجودة!

DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;

-- 2. حذف Functions و Triggers القديمة
DROP FUNCTION IF EXISTS generate_order_number() CASCADE;
DROP FUNCTION IF EXISTS set_order_number() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- الآن يمكنك تشغيل setup.sql بشكل كامل
-- ارجع إلى setup.sql وشغله من البداية

-- ملاحظة: إذا كنت تريد الحفاظ على البيانات الموجودة، استخدم هذا بدلاً من DROP:

/*
-- إضافة الأعمدة المفقودة فقط (إذا كان لديك بيانات تريد الحفاظ عليها)
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
-- ... إلخ
*/
