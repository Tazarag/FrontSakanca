# Sakanca — Frontend (Front-Sakanca)

Website company profile **Sakanca Alliance** — menampilkan profil perusahaan, enam sub-brand (Sakanca Visual, Auto, Escape, Tech, Dev, Pet), portofolio project, tim, dan testimoni klien. Mendukung 3 bahasa (Indonesia, English, Japanese).

Dikembangkan sebagai final project mata kuliah Rekayasa Web, dipasangkan dengan [BackSakanca](https://github.com/valeriaanaf/BackSakanca) sebagai REST API backend.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Animasi | Framer Motion |
| Mode Build | Static Export (`output: "export"`) |

---

## Fitur Utama

- Seluruh konten (Hero, About, Services, Projects, Team, Testimonials, Gallery) diambil langsung dari REST API backend, bukan data statis
- Switch bahasa ID / EN / JPN secara real-time tanpa reload halaman
- Static export — hasil build berupa file HTML/CSS/JS murni, ringan di-hosting di mana saja
- Loading & error state di setiap section yang fetch data

---

## Setup Lokal

### 1. Clone repository

```bash
git clone https://github.com/valeriaanaf/Front-Sakanca.git
cd Front-Sakanca
```

### 2. Install dependency

```bash
npm install
```

### 3. Buat file environment lokal

Buat file baru `.env.local` di root project:

```dotenv
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Arahkan ke URL backend (BackSakanca) yang sedang berjalan — lokal (`http://127.0.0.1:8000`) atau production.

### 4. Jalankan development server

```bash
npm run dev
```

Buka `http://localhost:3000` di browser.

> **Catatan:** pastikan backend (BackSakanca) sudah berjalan lebih dulu, dan domain frontend ini sudah diizinkan di `config/cors.php` backend.

### 5. Build untuk production (opsional, untuk testing static export)

```bash
npm run build
```

Hasil build statis akan tersedia di folder `/out`.

---

## Environment Variables

| Variable | Wajib | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Ya | Base URL REST API backend, contoh: `https://backsakanca-production.up.railway.app` |
| `NEXT_PUBLIC_SITE_URL` | Opsional | Digunakan untuk generate `sitemap.xml`, contoh: `https://sakanca.com` |

---

## Struktur Folder

```
src/
├── app/                     # Routing Next.js App Router, layout, sitemap, robots
├── components/
│   ├── sections/            # Satu file per section homepage
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServiceSection.tsx
│   │   ├── DetailedServiceSection.tsx
│   │   ├── ProjectSection.tsx
│   │   ├── ProfileSection.tsx      # Team Members
│   │   ├── TestimonialSection.tsx
│   │   └── GallerySection.tsx
│   ├── layout/               # Navbar, Footer
│   └── ui/                   # Komponen reusable (mis. HeroSlideshow)
├── context/
│   └── LanguageContext.tsx   # State bahasa aktif + teks UI statis (t())
├── hooks/                    # Satu hook per resource API (useHero, useServices, dst)
│   └── useApiData.ts         # Hook generik: loading, error, data
├── lib/
│   ├── api.ts                 # HTTP client + resolveImage() untuk path storage
│   └── serviceUiMeta.ts       # Mapping slug service → icon & warna
├── locales/                   # id.json, en.json, jpn.json — teks UI statis (navbar, tombol, dll)
└── types/
    └── index.ts               # TypeScript interface, cocok 1:1 dengan response API backend
```

### Konsep Penting: Dua Jenis Teks

| Jenis | Sumber | Contoh |
|---|---|---|
| Teks UI statis (navbar, tombol, judul section) | `locales/*.json`, diakses lewat `t('key')` | "Back", "View Gallery" |
| Konten dinamis (deskripsi, judul konten, nama) | API backend, tipe `Localized` (`{ID, EN, JPN}`) | `about.description[language]` |

Path gambar dari backend selalu di-resolve lewat `resolveImage()` di `lib/api.ts` sebelum dipakai di komponen `<Image>`.

---

## Deployment

| Environment | URL |
|---|---|
| Production | `https://front-sakanca.vercel.app` |

Deploy otomatis lewat Vercel setiap push ke branch `main`. Domain custom (`sakanca.com`) menyusul setelah proses pembelian domain selesai.
