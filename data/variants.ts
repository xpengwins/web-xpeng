export type ColorKey = "white" | "silver" | "graphite" | "black" | "purple" | "matte" | "cyan" | "violet";
export type CarType = "g6" | "x9";

export const COLORS: Record<ColorKey, { name: string; hex: string; matte?: boolean }> = {
  white: { name: "Arctic White", hex: "#f1f1ee" },
  silver: { name: "Silver Frost", hex: "#c6cacd" },
  graphite: { name: "Graphite Gray", hex: "#5d6166" },
  black: { name: "Midnight Black", hex: "#14161a" },
  purple: { name: "Stellar Purple", hex: "#5b3f8c" },
  matte: { name: "Matte Gray", hex: "#74777a", matte: true },
  cyan: { name: "Lambent Cyan", hex: "#3db4c2" },
  violet: { name: "Polar Violet", hex: "#7b5ca8" },
};

export type Variant = {
  slug: string;
  model: "G6" | "X9";
  type: CarType;
  name: string;
  tag: string;
  /** harga OTR Jakarta dalam juta rupiah */
  priceJt: number;
  range: string;
  rangeUnit: string;
  defaultColor: ColorKey;
  colors: ColorKey[];
  sub: string;
  spec: [string, string][];
};

const FITUR = "XPILOT Assist · Intelligent parking · 360° view · Hey XPENG";
const G6C: ColorKey[] = ["white", "silver", "graphite", "black", "purple"];

// ⚠️ Cocokkan harga, warna & spesifikasi dengan katalog resmi XPENG Indonesia sebelum tayang.
export const VARIANTS: Variant[] = [
  { slug: "g6-pro", model: "G6", type: "g6", name: "G6 Pro", tag: "SUV Coupe Listrik", priceJt: 679, range: "525", rangeUnit: "km WLTP",
    defaultColor: "white", colors: G6C, sub: "SUV coupe listrik dengan baterai LFP 80,8 kWh dan pengisian daya cepat.",
    spec: [["Penggerak", "RWD"], ["Baterai", "80,8 kWh LFP"], ["Jarak tempuh", "525 km (WLTP)"], ["Fitur", FITUR]] },
  { slug: "g6-pro-awd", model: "G6", type: "g6", name: "G6 Pro AWD", tag: "Black Edition", priceJt: 769, range: "510", rangeUnit: "km WLTP",
    defaultColor: "black", colors: G6C, sub: "Varian tertinggi G6 — tenaga dan torsi lebih besar, tampil dalam Black Edition.",
    spec: [["Penggerak", "AWD"], ["Jarak tempuh", "510 km (WLTP) · 600 km (NEDC)"], ["0–100 km/jam", "4,13 detik"], ["Fitur", FITUR]] },
  { slug: "x9-standard-range-pro", model: "X9", type: "x9", name: "X9 Standard Range Pro", tag: "MPV Listrik Premium", priceJt: 1140, range: "620", rangeUnit: "km NEDC",
    defaultColor: "white", colors: ["white", "black", "matte", "cyan"], sub: "MPV listrik premium facelift: bumper baru, pelek baru, kabin lebih nyaman.",
    spec: [["Jarak tempuh", "620 km (NEDC)"], ["Dimensi (P×L×T)", "5.293 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Fitur", FITUR]] },
  { slug: "x9-long-range-pro", model: "X9", type: "x9", name: "X9 Long Range Pro", tag: "MPV Listrik Premium", priceJt: 1219, range: "LR", rangeUnit: "Long Range",
    defaultColor: "matte", colors: ["white", "black", "matte", "cyan"], sub: "Varian baterai besar untuk perjalanan jauh keluarga — cek angka jarak tempuh resmi ke sales.",
    spec: [["Baterai", "Long Range"], ["Dimensi (P×L×T)", "5.293 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Fitur", FITUR]] },
  { slug: "x9-long-range-pro-plus", model: "X9", type: "x9", name: "X9 Long Range Pro+", tag: "MPV Listrik Premium", priceJt: 1259, range: "LR+", rangeUnit: "Long Range",
    defaultColor: "violet", colors: ["white", "black", "matte", "cyan", "violet"], sub: "Varian tertinggi X9. Warna Polar Violet khusus varian ini.",
    spec: [["Baterai", "Long Range"], ["Dimensi (P×L×T)", "5.293 × 1.988 × 1.785 mm"], ["Wheelbase", "3.160 mm"], ["Fitur", FITUR]] },
];

export const MODELS = [
  { slug: "g6", name: "G6", type: "g6" as CarType, headline: "SUV Coupe Listrik", desc: "SUV coupe listrik dengan baterai LFP 80,8 kWh, tersedia RWD dan AWD." },
  { slug: "x9", name: "X9", type: "x9" as CarType, headline: "MPV Listrik Premium", desc: "MPV listrik premium berdimensi besar dengan tiga pilihan varian." },
];

/** Opsional: foto asli. Taruh file di public/cars lalu isi, mis. "g6-pro|white": "/cars/g6-pro-white.png" */
export const PHOTOS: Record<string, string> = {};

export const rp = (jt: number) =>
  jt >= 1000 ? "Rp " + (jt / 1000).toFixed(3).replace(".", ",").replace(/0+$/, "").replace(/,$/, "") + " M" : "Rp " + jt + " jt";
export const idr = (n: number) => "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));

const WA = process.env.NEXT_PUBLIC_WA_NUMBER ?? "628000000000";
export const WA_DISPLAY = process.env.NEXT_PUBLIC_WA_DISPLAY ?? "+62 800-0000-0000";
export const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
