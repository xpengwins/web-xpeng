# XPENG Dealer Website (Next.js 16)

Situs dealer XPENG (G6, X9, G9L, L03) berbasis SEO/AEO/GEO + anti-blokir. Domain baru, BUKAN xpengwins.com.

## Struktur
- `data/variants.ts` — semua data produk (harga bertanggal, spesifikasi brosur, FAQ). Ubah di sini, semua halaman ikut.
- `data/credit.ts` — tabel paket leasing (Bunga 0%, Reguler, IMFI).
- `data/dealer.json` — identitas dealer (WAJIB diisi sebelum live).
- `lib/site.ts` — domain (NEXT_PUBLIC_SITE_URL), bulan harga, tanggal pembaruan.
- `app/` — halaman: `/`, `/harga-xpeng`, `/model/[g6|x9|g9l|l03]`, `/simulasi-kredit`, `/test-drive`, `/dealer`, `/tentang`, `/kebijakan-privasi`, sitemap, robots, API lead.
- `scripts/monitor.mjs` — monitoring harian; `docs/CHECKLIST-LAUNCH.md` — checklist peluncuran.

## Menjalankan
npm install → npm run dev. Build: npm run build (gagal otomatis bila domain live tetapi dealer.json kosong).

## Perilaku domain
Selama NEXT_PUBLIC_SITE_URL kosong / vercel.app / pages.dev, situs `noindex` dan robots memblokir semua. Setelah domain asli diisi, indeks otomatis aktif.
