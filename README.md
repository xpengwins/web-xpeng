# XPENG Wins — Next.js

Next.js (App Router) + React + TypeScript + Tailwind v4.

## Struktur
- `data/variants.ts` — **semua data varian, harga, warna, spesifikasi** (edit di sini; nanti bisa dipindah ke Supabase)
- `components/Showroom.tsx` — hero "The Line" + detail dengan ganti warna
- `components/CreditCalc.tsx` — simulasi cicilan · `components/LeadForm.tsx` — form test drive/booking
- `app/api/leads/route.ts` — API simpan lead (Supabase kalau env diisi, kalau tidak hanya log)
- `app/model/[slug]` — halaman per model (G6, X9), static untuk SEO
- `supabase/schema.sql` — tabel `leads`
- `public/cars/` — taruh foto asli mobil, lalu daftarkan di `PHOTOS` (data/variants.ts)

## Deploy (tanpa install apa pun di HP)
1. Import repo ini di **Vercel** atau **Cloudflare Pages** → framework Next.js → Deploy.
2. Isi Environment Variables seperti `.env.example` (terutama `NEXT_PUBLIC_WA_NUMBER`).
3. (Opsional) Buat project Supabase → jalankan `supabase/schema.sql` → isi `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`.

## Jalankan lokal (komputer)
```
npm install
npm run dev
```
> Harga, warna & spesifikasi di `data/variants.ts` diambil dari pemberitaan — cocokkan dengan katalog resmi XPENG Indonesia sebelum tayang.
