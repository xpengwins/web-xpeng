/**
 * DATA PRODUK — sumber tunggal untuk semua halaman.
 * Sumber: brosur XPENG Indonesia (G6 Pro, New X9, G9L), materi harga APM (peluncuran 11 Nov 2026),
 * paket leasing IMFI November 2026, dan pemberitaan peluncuran. Cek ulang sebelum tayang & setiap harga berubah.
 * Nilai yang belum ada di sumber ditulis "Tanya sales" — jangan ditebak.
 */
export type ColorKey = "white" | "silver" | "graphite" | "black" | "purple" | "matte" | "green" | "dblack" | "mgray";
export type CarType = "g6" | "x9" | "g9l";
export type ModelName = "G6" | "X9" | "G9L";

export const COLORS: Record<ColorKey, { name: string; hex: string; matte?: boolean }> = {
  white: { name: "Arctic White", hex: "#f1f1ee" },
  silver: { name: "Silver Frost", hex: "#c6cacd" },
  graphite: { name: "Graphite Gray", hex: "#5d6166" },
  black: { name: "Midnight Black", hex: "#14161a" },
  purple: { name: "Stellar Purple", hex: "#5b3f8c" },
  matte: { name: "Matte Gray", hex: "#74777a", matte: true },
  green: { name: "Waving Green", hex: "#1f5a46" },
  dblack: { name: "Diamond Black", hex: "#0f1112" },
  mgray: { name: "Mirror Gray", hex: "#8b9094" },
};

export type Variant = {
  slug: string;
  model: ModelName;
  type: CarType;
  name: string;
  tag: string;
  /** harga OTR Jakarta, juta rupiah */
  priceJt: number;
  range: string;
  rangeUnit: string;
  defaultColor: ColorKey;
  colors: ColorKey[];
  sub: string;
  /** baris untuk tabel varian */
  t: { drive: string; power: string; torque: string; accel: string; battery: string; range: string; charge: string };
  spec: [string, string][];
};

const NA = "Tanya sales";

export const VARIANTS: Variant[] = [
  {
    slug: "g6-pro", model: "G6", type: "g6", name: "G6 Pro", tag: "SUV Coupe Listrik", priceJt: 679,
    range: "525", rangeUnit: "km WLTP", defaultColor: "white", colors: ["white", "silver", "purple", "graphite", "black"],
    sub: "SUV coupe listrik dengan baterai LFP 80,8 kWh, pengisian cepat 800V, dan XPILOT Assist.",
    t: { drive: "RWD", power: "218 kW", torque: "440 N·m", accel: "6,7 dtk", battery: "80,8 kWh LFP", range: "525 km WLTP · 618 km NEDC", charge: "12 menit (10–80%)" },
    spec: [["Penggerak", "RWD"], ["Daya / torsi", "218 kW / 440 N·m"], ["0–100 km/jam", "6,7 detik"], ["Baterai", "80,8 kWh LFP"],
      ["Jarak tempuh", "525 km (WLTP) · 618 km (NEDC)"], ["Pengisian DC 10–80%", "12 menit (puncak 451 kW)"],
      ["Dimensi (P×L×T)", "4.758 × 1.920 × 1.650 mm"], ["Wheelbase", "2.899 mm"], ["Airbag", "7"], ["Audio", "18 speaker"]],
  },
  {
    slug: "g6-pro-awd", model: "G6", type: "g6", name: "G6 Pro AWD", tag: "Black Edition", priceJt: 769,
    range: "510", rangeUnit: "km WLTP", defaultColor: "black", colors: ["black"],
    sub: "Varian tertinggi G6: tenaga dan torsi lebih besar dibanding G6 Pro, tampil dalam Black Edition.",
    t: { drive: "AWD", power: NA, torque: NA, accel: "4,13 dtk", battery: NA, range: "510 km WLTP · 600 km NEDC", charge: NA },
    spec: [["Penggerak", "AWD"], ["0–100 km/jam", "4,13 detik"], ["Jarak tempuh", "510 km (WLTP) · 600 km (NEDC)"], ["Edisi", "Black Edition"],
      ["Spesifikasi lengkap", "Tanya sales (brosur AWD belum tersedia)"]],
  },
  {
    slug: "x9-standard-range", model: "X9", type: "x9", name: "X9 Standard Range", tag: "MPV Listrik Premium 7 Seater", priceJt: 1140,
    range: "620", rangeUnit: "km NEDC", defaultColor: "white", colors: ["white", "silver", "matte", "black"],
    sub: "MPV listrik 7 seater dengan baterai LFP 94,8 kWh. Di pemberitaan peluncuran varian ini disebut Standard Range Pro.",
    t: { drive: "FWD", power: "235 kW", torque: "450 N·m", accel: "8,2 dtk", battery: "94,8 kWh LFP", range: "620 km NEDC", charge: "12 menit (10–80%)" },
    spec: [["Penggerak", "FWD"], ["Daya / torsi", "235 kW / 450 N·m"], ["0–100 km/jam", "8,2 detik"], ["Baterai", "94,8 kWh LFP"], ["Jarak tempuh", "620 km (NEDC)"],
      ["Pengisian DC 10–80%", "12 menit (puncak 537 kW)"], ["Dimensi (P×L×T)", "5.316 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Kursi / bagasi", "7 kursi · 721 L"]],
  },
  {
    slug: "x9-long-range-pro", model: "X9", type: "x9", name: "X9 Long Range Pro", tag: "MPV Listrik Premium 7 Seater", priceJt: 1219,
    range: "715", rangeUnit: "km NEDC", defaultColor: "matte", colors: ["white", "silver", "matte", "black"],
    sub: "Baterai NCM 110 kWh dengan jarak tempuh hingga 715 km (NEDC) untuk perjalanan jauh keluarga.",
    t: { drive: "FWD", power: "235 kW", torque: "450 N·m", accel: "7,75 dtk", battery: "110 kWh NCM", range: "715 km NEDC", charge: "12 menit (10–80%)" },
    spec: [["Penggerak", "FWD"], ["Daya / torsi", "235 kW / 450 N·m"], ["0–100 km/jam", "7,75 detik"], ["Baterai", "110 kWh NCM"], ["Jarak tempuh", "715 km (NEDC)"],
      ["Pengisian DC 10–80%", "12 menit (puncak 542 kW)"], ["Dimensi (P×L×T)", "5.316 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Kursi / bagasi", "7 kursi · 721 L"]],
  },
  {
    slug: "x9-long-range-pro-plus", model: "X9", type: "x9", name: "X9 Long Range Pro+", tag: "MPV Listrik Premium 7 Seater", priceJt: 1259,
    range: "715", rangeUnit: "km NEDC", defaultColor: "black", colors: ["white", "silver", "matte", "black"],
    sub: "Penggerak dan baterai sama dengan Long Range Pro, dengan kursi baris kedua Grand Sofa (tanpa lorong) dan penyetelan elektrik 18 arah.",
    t: { drive: "FWD", power: "235 kW", torque: "450 N·m", accel: "7,75 dtk", battery: "110 kWh NCM", range: "715 km NEDC", charge: "12 menit (10–80%)" },
    spec: [["Penggerak", "FWD"], ["Daya / torsi", "235 kW / 450 N·m"], ["0–100 km/jam", "7,75 detik"], ["Baterai", "110 kWh NCM"], ["Jarak tempuh", "715 km (NEDC)"],
      ["Pengisian DC 10–80%", "12 menit (puncak 542 kW)"], ["Dimensi (P×L×T)", "5.316 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Kursi / bagasi", "7 kursi · 721 L"]],
  },
  {
    slug: "x9-long-range-pro-plus-awd", model: "X9", type: "x9", name: "X9 Long Range Pro+ AWD", tag: "MPV Listrik Premium 7 Seater", priceJt: 1339,
    range: "670", rangeUnit: "km NEDC", defaultColor: "white", colors: ["white", "silver", "matte", "black"],
    sub: "Varian tertinggi X9: dual motor AWD 370 kW, 0–100 km/jam 5,9 detik. Di materi harga tertulis X9 Long Range AWD.",
    t: { drive: "AWD (PMSM + IM)", power: "370 kW", torque: "640 N·m", accel: "5,9 dtk", battery: "110 kWh NCM", range: "670 km NEDC", charge: "12 menit (10–80%)" },
    spec: [["Penggerak", "AWD (PMSM + IM)"], ["Daya / torsi", "370 kW / 640 N·m"], ["0–100 km/jam", "5,9 detik"], ["Baterai", "110 kWh NCM"], ["Jarak tempuh", "670 km (NEDC)"],
      ["Pengisian DC 10–80%", "12 menit (puncak 542 kW)"], ["Dimensi (P×L×T)", "5.316 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Kursi / bagasi", "7 kursi · 721 L"]],
  },
  {
    slug: "g9l-ultra-awd", model: "G9L", type: "g9l", name: "G9L Ultra AWD", tag: "SUV Listrik 6 Seater", priceJt: 1289,
    range: "648", rangeUnit: "km NEDC", defaultColor: "green", colors: ["green", "white", "dblack", "mgray"],
    sub: "SUV listrik 6 seater dengan baterai NCM 110 kWh, dual motor AWD 430 kW, dan rear-wheel steering.",
    t: { drive: "AWD (dual motor)", power: "430 kW", torque: "695 N·m", accel: "4,9 dtk", battery: "110 kWh NCM", range: "648 km NEDC", charge: "11,7 menit (10–80%)" },
    spec: [["Penggerak", "AWD (dual motor)"], ["Daya / torsi", "430 kW / 695 N·m"], ["0–100 km/jam", "4,9 detik"], ["Baterai", "110 kWh NCM"], ["Jarak tempuh", "648 km (NEDC)"],
      ["Pengisian DC 10–80%", "11,7 menit (puncak hingga 540 kW)"], ["Dimensi (P×L×T)", "5.120 × 1.999 × 1.788 mm"], ["Wheelbase", "3.100 mm"],
      ["Kursi / bagasi", "6 kursi · 259 L (1.330 L, baris 3 dilipat)"], ["Fitur chassis", "Suspensi udara dual-chamber, rear-wheel steering"], ["Kedalaman air", "700 mm"]],
  },
];

export type Faq = { q: string; a: string };
export type Model = {
  slug: string; name: ModelName | "L03"; type: CarType; headline: string;
  title: string; desc: string; h1: string;
  /** jawaban langsung 40–60 kata */
  answer: string; whoFor: string[]; diff: string; faq: Faq[];
};

const BATT = "Menurut pemberitaan peluncuran XPENG Indonesia: garansi kendaraan, baterai tegangan tinggi, BMS, dan motor listrik 8 tahun/160.000 km, gratis servis 5 tahun/100.000 km, dengan syarat servis berkala tiap 12 bulan/20.000 km. Konfirmasi syarat terbaru ke sales.";

export const MODELS: Model[] = [
  {
    slug: "g6", name: "G6", type: "g6", headline: "SUV Coupe Listrik",
    title: "Harga XPENG G6 November 2026 | Dealer XPENG Jakarta",
    desc: "XPENG G6 Pro Rp679 juta dan G6 Pro AWD Rp769 juta (OTR Jakarta). Spesifikasi, warna, simulasi kredit & booking test drive.",
    h1: "XPENG G6: Harga, Varian & Spesifikasi",
    answer: "Harga XPENG G6 Pro Rp679 juta dan G6 Pro AWD Black Edition Rp769 juta, on the road Jakarta, menurut materi APM November 2026. G6 Pro menempuh hingga 525 km (WLTP) dengan baterai LFP 80,8 kWh dan bisa diisi 10–80% dalam sekitar 12 menit di charger DC yang kompatibel.",
    whoFor: ["Pengguna harian di kota dan antar kota yang ingin SUV coupe listrik dengan jarak tempuh jauh.", "Yang mengutamakan pengisian cepat (800V) dan fitur bantuan berkendara XPILOT Assist.", "Pilih AWD jika mengutamakan akselerasi (0–100 km/jam 4,13 detik)."],
    diff: "G6 Pro (RWD) mengutamakan efisiensi dan jarak tempuh 525 km WLTP. G6 Pro AWD (Black Edition) menambah penggerak semua roda dengan tenaga dan torsi lebih besar; jarak tempuh WLTP sedikit turun menjadi 510 km.",
    faq: [
      { q: "Berapa harga XPENG G6 terbaru?", a: "G6 Pro Rp679 juta dan G6 Pro AWD Rp769 juta, on the road Jakarta (materi APM November 2026). Harga dapat berubah; hubungi kami untuk konfirmasi." },
      { q: "Berapa jarak tempuh XPENG G6 Pro?", a: "Menurut brosur, hingga 525 km (WLTP) atau 618 km (NEDC). Jarak tempuh nyata bergantung gaya berkendara, beban, suhu, dan penggunaan AC." },
      { q: "Berapa lama mengisi daya XPENG G6 Pro?", a: "DC 10–80% sekitar 12 menit dengan daya puncak hingga 451 kW pada charger yang mendukung. AC 11 kW butuh sekitar 9,2 jam untuk 5–100%." },
      { q: "Apa saja pilihan warna XPENG G6 Pro?", a: "Arctic White, Silver Frost, Stellar Purple, Graphite Gray, dan Midnight Black. G6 Pro AWD hadir sebagai Black Edition." },
      { q: "Apakah ada garansi baterai?", a: BATT },
      { q: "Bagaimana cara test drive XPENG G6?", a: "Isi formulir di halaman Test Drive atau hubungi kami lewat WhatsApp; tim kami akan menjadwalkan unit yang tersedia." },
    ],
  },
  {
    slug: "x9", name: "X9", type: "x9", headline: "MPV Listrik Premium 7 Seater",
    title: "Harga XPENG X9 November 2026 | Dealer XPENG Jakarta",
    desc: "Harga XPENG X9 mulai Rp1,14 miliar OTR Jakarta. Bandingkan 4 varian: Standard Range, Long Range Pro, Pro+, dan AWD.",
    h1: "XPENG X9: Harga, Varian & Spesifikasi",
    answer: "Harga XPENG X9 mulai Rp1,14 miliar (Standard Range) hingga Rp1,339 miliar (Long Range Pro+ AWD), on the road Jakarta, menurut materi APM November 2026. X9 adalah MPV listrik 7 seater dengan jarak tempuh hingga 715 km (NEDC) dan pengisian DC 10–80% sekitar 12 menit.",
    whoFor: ["Keluarga besar atau pengguna yang butuh kabin 7 kursi dengan bagasi 721 liter.", "Perjalanan jauh: pilih Long Range (715 km NEDC).", "Pilih AWD jika mengutamakan tenaga (370 kW, 0–100 km/jam 5,9 detik)."],
    diff: "Standard Range memakai baterai LFP 94,8 kWh (620 km NEDC). Long Range Pro dan Pro+ memakai baterai NCM 110 kWh (715 km NEDC) dengan penggerak FWD yang sama. Beda kabin menurut brosur: Standard Range dan Long Range Pro memakai kursi baris kedua Zero-gravity Sofa dengan penyetelan elektrik 14 arah, sedangkan Pro+ dan Pro+ AWD memakai Zero-gravity Grand Sofa tanpa lorong dengan penyetelan 18 arah. Long Range Pro+ AWD menambah motor kedua (370 kW) dengan jarak tempuh 670 km NEDC.",
    faq: [
      { q: "Berapa harga XPENG X9 terbaru?", a: "Standard Range Rp1,14 miliar, Long Range Pro Rp1,219 miliar, Long Range Pro+ Rp1,259 miliar, dan Long Range Pro+ AWD Rp1,339 miliar (OTR Jakarta, materi APM November 2026)." },
      { q: "Berapa jarak tempuh XPENG X9?", a: "Standard Range 620 km, Long Range Pro/Pro+ 715 km, dan Long Range Pro+ AWD 670 km, semuanya standar NEDC menurut brosur. Angka nyata dapat berbeda." },
      { q: "Berapa kapasitas kursi dan bagasi XPENG X9?", a: "7 kursi. Bagasi 721 liter dan dapat diperluas hingga 2.554 liter menurut brosur." },
      { q: "Berapa lama mengisi daya XPENG X9?", a: "DC 10–80% sekitar 12 menit (puncak 537–542 kW). AC 11 kW sekitar 9,5–11 jam untuk 5–100% tergantung baterai." },
      { q: "Apa saja pilihan warna XPENG X9?", a: "Arctic White, Silver Frost, Matte Gray, dan Midnight Black menurut brosur." },
      { q: "Apakah ada garansi baterai?", a: BATT },
      { q: "Apa beda X9 Long Range Pro dan Pro+?", a: "Penggerak dan baterai sama. Menurut brosur, Pro+ memakai kursi baris kedua Zero-gravity Grand Sofa tanpa lorong dengan penyetelan elektrik 18 arah (Pro: Sofa 14 arah). Minta daftar fitur terbaru ke sales untuk detail lengkap." },
    ],
  },
  {
    slug: "g9l", name: "G9L", type: "g9l", headline: "SUV Listrik 6 Seater",
    title: "Harga XPENG G9L Ultra AWD 2026 | Dealer XPENG Jakarta",
    desc: "XPENG G9L Ultra AWD Rp1,289 miliar OTR Jakarta: 6 seater, 430 kW, 648 km NEDC. Spesifikasi, kredit & test drive.",
    h1: "XPENG G9L Ultra AWD: Harga & Spesifikasi",
    answer: "Harga XPENG G9L Ultra AWD Rp1,289 miliar, on the road Jakarta, diumumkan pada peluncuran 11 November 2026. SUV listrik 6 seater ini memakai baterai NCM 110 kWh, dual motor 430 kW, jarak tempuh hingga 648 km (NEDC), dan pengisian DC 10–80% sekitar 11,7 menit.",
    whoFor: ["Keluarga yang menginginkan SUV listrik besar dengan kursi baris kedua captain dan kabin mewah.", "Yang mengutamakan performa: 0–100 km/jam 4,9 detik.", "Yang butuh kemampuan menantang jalan: suspensi udara dan kedalaman air 700 mm."],
    diff: "G9L saat ini tersedia dalam satu varian, Ultra AWD. Dibanding X9 (MPV 7 seater), G9L adalah SUV 6 seater dengan bagasi lebih kecil (259 L) tetapi tenaga lebih besar (430 kW).",
    faq: [
      { q: "Berapa harga XPENG G9L?", a: "G9L Ultra AWD Rp1,289 miliar on the road Jakarta (materi peluncuran 11 November 2026). Harga dapat berubah." },
      { q: "Berapa jarak tempuh XPENG G9L?", a: "Hingga 648 km (NEDC) menurut brosur. Jarak tempuh nyata bergantung kondisi berkendara." },
      { q: "Berapa lama mengisi daya XPENG G9L?", a: "DC 10–80% sekitar 11,7 menit dengan daya puncak hingga 540 kW pada charger yang mendukung." },
      { q: "Berapa jumlah kursi dan bagasi G9L?", a: "6 kursi. Bagasi 259 liter, menjadi 1.330 liter saat baris ketiga dilipat." },
      { q: "Apa saja pilihan warna G9L?", a: "Waving Green, Arctic White, Diamond Black, dan Mirror Gray." },
      { q: "Apakah ada garansi baterai?", a: BATT },
    ],
  },
  {
    slug: "l03", name: "L03", type: "g6", headline: "Segera Hadir",
    title: "XPENG L03: Harga & Pre-Order | Dealer XPENG Jakarta",
    desc: "Status XPENG L03 di Indonesia: sudah dipamerkan di GIIAS 2026 dan menerima pre-order; harga resmi belum diumumkan.",
    h1: "XPENG L03: Status, Harga & Pre-Order",
    answer: "XPENG L03 sudah dipamerkan di GIIAS 2026 dan menerima pre-order, tetapi harga resmi belum diumumkan per 29 Oktober 2026. Halaman ini akan diperbarui begitu harga, varian, dan spesifikasi resmi tersedia. Hubungi kami untuk masuk daftar informasi pre-order.",
    whoFor: ["Calon pembeli yang ingin menunggu model baru dan memantau harga resmi sebelum memutuskan."],
    diff: "Belum ada varian resmi yang diumumkan. Kami tidak mencantumkan spesifikasi atau harga sebelum ada sumber resmi.",
    faq: [
      { q: "Berapa harga XPENG L03?", a: "Belum diumumkan secara resmi per 29 Oktober 2026. Hubungi kami untuk informasi terbaru." },
      { q: "Apakah XPENG L03 sudah bisa dipesan?", a: "Menurut pemberitaan, L03 sudah menerima pre-order. Hubungi kami untuk prosedur dan ketersediaan." },
      { q: "Apakah ada XPENG P7 di Indonesia?", a: "P7 pernah dipamerkan, tetapi belum tersedia setir kanan sehingga belum dijual di Indonesia." },
    ],
  },
];

export const variantsOf = (m: ModelName) => VARIANTS.filter((v) => v.model === m);
export const modelOf = (v: Variant) => MODELS.find((m) => m.name === v.model)!;

export const rp = (jt: number) =>
  jt >= 1000 ? "Rp " + (jt / 1000).toFixed(3).replace(".", ",").replace(/0+$/, "").replace(/,$/, "") + " M" : "Rp " + jt + " jt";
export const idr = (n: number) => "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));
export const idrFull = (jt: number) => "Rp " + new Intl.NumberFormat("id-ID").format(jt * 1_000_000);

/** Opsional: foto asli. Taruh di public/cars lalu isi, mis. "g6-pro|white": "/cars/g6-pro-white.webp" */
export const PHOTOS: Record<string, string> = {};
