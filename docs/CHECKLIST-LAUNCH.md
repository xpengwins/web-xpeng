# Checklist sebelum domain baru live (XPENG)

## Wajib diisi manusia (tidak boleh ditebak)
- [ ] data/dealer.json: legalName (nama PT), addressLine, district, city, province, postalCode, phone/whatsapp, jam operasional, consultantName
- [ ] Foto asli showroom/unit/serah terima (izin pelanggan) → public/cars + PHOTOS di data/variants.ts
- [ ] Verifikasi harga & promo terbaru → ubah PRICE_MONTH/UPDATED_* di lib/site.ts
- [ ] Brosur G6 Pro AWD & L03 (belum ada di project) agar spesifikasi lengkap
- [ ] Konfirmasi garansi baterai (FAQ memakai kalimat hati-hati "konfirmasi ke sales")
- [ ] Ulasan pelanggan asli → baru boleh dipasang Review schema

## Domain
- [ ] Beli domain BARU. Jangan redirect dari/ke xpengwins.com
- [ ] Set NEXT_PUBLIC_SITE_URL=https://domainbaru (https, tanpa slash akhir) lalu deploy → noindex otomatis hilang, robots & sitemap aktif
- [ ] 2FA + registrar lock + SPF/DKIM/DMARC; Cloudflare WAF
- [ ] Search Console (Domain property) + Bing Webmaster; kirim /sitemap.xml
- [ ] Google Business Profile: nama/alamat/telepon identik dengan situs
- [ ] Transparency Report Safe Browsing: cek domain baru bersih

## Teknis (sudah diverifikasi di build lokal)
- [x] 1 H1 per halaman, title/meta unik, canonical per halaman
- [x] JSON-LD: WebSite, BreadcrumbList, FAQPage (hanya FAQ yang tampil), Car; AutoDealer hanya bila identitas diisi
- [x] sitemap.xml hanya URL kanonik; robots.txt blokir total selama belum live
- [x] CSP, HSTS, nosniff, frame deny, referrer, permissions headers
- [x] Tanpa skrip pihak ketiga; form dengan honeypot + rate limit
- [ ] Setelah live: Lighthouse mobile (LCP<2,5s, INP<200ms, CLS<0,1) — belum bisa diukur sebelum ada URL publik

## Monitoring
SITE_URL=https://domainbaru node scripts/monitor.mjs  (harian via n8n/cron; ALERT_WEBHOOK & GSB_API_KEY opsional)
Mingguan: Search Console → Security issues, Manual actions, Pages, Crawl stats, CWV; cek user/owner asing.
Bulanan: audit backlink, harga kedaluwarsa, uji restore backup (3 salinan).
