# 🛍️ Gharim Store | غريم ستور

A modern, bilingual (English/Arabic) e-commerce marketplace built with Next.js, inspired by Iraqi culture and Islamic values.

![Gharim Store](public/logo.svg)

## ✨ Features

### 🌍 Bilingual Support
- **English & Arabic** with RTL support
- Dynamic language switching
- Fully localized UI

### 🎨 Modern Design
- Calm, professional aesthetic
- Gold & olive color palette  
- Smooth animations with Framer Motion
- Responsive layout

### 🛒 E-Commerce Functionality
- Product catalog with sections (coffee, sweets, gifts, etc.)
- Individual product pages
- Admin panel for product uploads
- Image storage via Supabase

### 🎯 Special Features
- **Presentation Mode**: Auto-play narration and scrolling
- **Audio Narration**: Welcome messages in EN/AR
- **Language Context**: Seamless language switching
- **Error Handling**: Graceful handling of missing assets

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase
- **Storage**: Supabase Storage
- **Animation**: Framer Motion
- **Language**: TypeScript

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd iraqi-islamic-marketplace

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔑 Environment Variables

Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these from your [Supabase Dashboard](https://app.supabase.com) → Project Settings → API

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Homepage
│   │   ├── admin/        # Admin product upload
│   │   ├── [type]/       # Product sections
│   │   └── product/[id]/ # Product details
│   ├── components/       # React components
│   │   ├── Logo.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── AudioNarration.tsx
│   │   └── PresentationToggle.tsx
│   ├── context/          # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── PresentationContext.tsx
│   └── lib/              # Utilities
│       ├── supabase.ts
│       └── utils.ts
├── public/
│   ├── logo.svg          # Store logo
│   └── audio/            # Narration files
└── package.json
```

## 🗄️ Database Setup

Create a `products` table in Supabase:

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en TEXT NOT NULL,
  name_ar TEXT,
  description_en TEXT,
  description_ar TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  section TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create storage bucket for images
-- Go to Storage → Create bucket named "products" → Make it public
```

## 📝 Usage

### Upload Products
1. Navigate to `/admin`
2. Fill in product details (English/Arabic)
3. Upload product image
4. Select section
5. Submit

### View Products
- `/` - Homepage
- `/coffee` - Coffee products
- `/sweets` - Sweets & desserts  
- `/gifts` - Gift items
- `/product/[id]` - Individual product page

## 🎨 Customization

### Colors
Edit `src/app/globals.css`:

```css
:root {
  --beige: #F5EFE6;
  --brown: #4B3621;
  --gold: #C9A44C;
  --olive: #9A9F6D;
}
```

### Logo
Replace `public/logo.svg` with your own logo

### Audio
Add narration files:
- `public/audio/narration-en.mp3`
- `public/audio/narration-ar.mp3`

## 🛠️ Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for the Iraqi community**

غريم ستور - تجربة تسوق هادئة مستوحاة من الثقافة العراقية والقيم الإسلامية
