import type { ModelName } from "./variants";
/** Perbandingan antar model XPENG sendiri (data brosur/APM). Tidak membandingkan dengan merek lain tanpa sumber bertanggal. */
export type Cmp = { slug: string; a: ModelName; b: ModelName; title: string; desc: string; h1: string; answer: string; points: [string, string][]; faq: { q: string; a: string }[] };

export const COMPARES: Cmp[] = [
  {
    slug: "g6-vs-x9", a: "G6", b: "X9",
    title: "XPENG G6 vs X9: Beda Harga, Kabin & Jarak Tempuh | Dealer XPENG",
    desc: "Bandingkan XPENG G6 (SUV coupe, mulai Rp679 juta) dan X9 (MPV 7 seater, mulai Rp1,14 miliar): harga, kursi, baterai, pengisian.",
    h1: "XPENG G6 vs X9: Mana yang Cocok?",
    answer: "XPENG G6 adalah SUV coupe listrik mulai Rp679 juta, cocok untuk pemakaian harian berkapasitas lima penumpang. XPENG X9 adalah MPV listrik 7 seater mulai Rp1,14 miliar dengan bagasi 721 liter dan jarak tempuh hingga 715 km (NEDC). Pilih G6 untuk anggaran lebih ringan, X9 untuk keluarga besar.",
    points: [
      ["Bentuk & kursi", "G6: SUV coupe. X9: MPV 7 kursi dengan bagasi 721 L (hingga 2.554 L)."],
      ["Harga OTR Jakarta", "G6 Pro Rp679 juta; X9 mulai Rp1,14 miliar (Nov 2026)."],
      ["Baterai", "G6 Pro: 80,8 kWh LFP. X9: LFP 94,8 kWh (Standard Range) atau NCM 110 kWh (Long Range)."],
      ["Jarak tempuh", "G6 Pro 525 km (WLTP). X9 620–715 km (NEDC). Standar uji berbeda sehingga angka tidak bisa dibandingkan langsung."],
      ["Pengisian DC 10–80%", "Keduanya sekitar 12 menit pada charger yang mendukung."],
    ],
    faq: [{ q: "Apakah G6 atau X9 lebih hemat?", a: "G6 lebih terjangkau dari sisi harga beli. Biaya per km bergantung pemakaian; tanyakan simulasi ke sales." }, { q: "Berapa selisih harga G6 dan X9?", a: "G6 Pro Rp679 juta dan X9 Standard Range Rp1,14 miliar, selisih sekitar Rp461 juta (OTR Jakarta, Nov 2026)." }],
  },
  {
    slug: "x9-vs-g9l", a: "X9", b: "G9L",
    title: "XPENG X9 vs G9L: MPV 7 Seater atau SUV 6 Seater? | Dealer XPENG",
    desc: "Bandingkan XPENG X9 (MPV 7 seater) dan G9L Ultra AWD (SUV 6 seater, 430 kW): harga, bagasi, tenaga, jarak tempuh.",
    h1: "XPENG X9 vs G9L: Mana yang Cocok?",
    answer: "XPENG X9 mengutamakan ruang: 7 kursi dan bagasi 721 liter, harga Rp1,14–1,339 miliar. XPENG G9L Ultra AWD (Rp1,289 miliar) adalah SUV 6 seater dengan tenaga 430 kW, 0–100 km/jam 4,9 detik, tetapi bagasi 259 liter. Pilih X9 untuk kapasitas, G9L untuk performa dan kemampuan SUV.",
    points: [
      ["Bentuk & kursi", "X9: MPV 7 kursi, bagasi 721 L. G9L: SUV 6 kursi, bagasi 259 L (1.330 L, baris 3 dilipat)."],
      ["Harga OTR Jakarta", "X9 Rp1,14–1,339 miliar; G9L Ultra AWD Rp1,289 miliar."],
      ["Tenaga", "X9 FWD 235 kW; X9 AWD 370 kW. G9L AWD 430 kW."],
      ["Jarak tempuh (NEDC)", "X9 620–715 km (AWD 670 km). G9L 648 km."],
      ["Fitur SUV", "G9L: suspensi udara dual-chamber, kedalaman air 700 mm."],
    ],
    faq: [{ q: "Mana yang lebih cepat, X9 atau G9L?", a: "G9L: 0–100 km/jam 4,9 detik. X9 AWD 5,9 detik; X9 FWD 7,75–8,2 detik (brosur)." }, { q: "Mana yang lebih luas?", a: "X9 memiliki 7 kursi dan bagasi 721 L, lebih luas dari G9L (6 kursi, 259 L)." }],
  },
  {
    slug: "g6-vs-g9l", a: "G6", b: "G9L",
    title: "XPENG G6 vs G9L: Pilih SUV Listrik yang Mana? | Dealer XPENG",
    desc: "Bandingkan XPENG G6 (mulai Rp679 juta) dan G9L Ultra AWD (Rp1,289 miliar): ukuran, baterai, tenaga, kursi.",
    h1: "XPENG G6 vs G9L: Mana yang Cocok?",
    answer: "XPENG G6 Pro (Rp679 juta) adalah SUV coupe kompak dengan baterai LFP 80,8 kWh. XPENG G9L Ultra AWD (Rp1,289 miliar) adalah SUV besar 6 seater dengan baterai NCM 110 kWh dan 430 kW. G6 untuk penggunaan harian dan anggaran lebih ringan; G9L untuk keluarga yang menginginkan ruang dan performa.",
    points: [
      ["Panjang", "G6: 4.758 mm. G9L: 5.120 mm."],
      ["Kursi", "G6: 5 kursi. G9L: 6 kursi."],
      ["Harga OTR Jakarta", "G6 Pro Rp679 juta (AWD Rp769 juta); G9L Rp1,289 miliar."],
      ["Baterai", "G6 Pro 80,8 kWh LFP; G9L 110 kWh NCM."],
      ["Tenaga", "G6 Pro 218 kW; G9L 430 kW."],
    ],
    faq: [{ q: "Berapa selisih harga G6 dan G9L?", a: "G6 Pro Rp679 juta dan G9L Ultra AWD Rp1,289 miliar, selisih Rp610 juta (OTR Jakarta, Nov 2026)." }],
  },
];
