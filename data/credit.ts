/**
 * Paket leasing — sumber: "XPENG Bunga 0% Jakarta / Regular" dan "package program IMFI November 2026".
 * TDP = total down payment (sesuai tabel sumber). Angka dapat berubah; syarat mengikuti perusahaan pembiayaan.
 */
export type Row = { tenor: number; tdp: number; angsuran: number };
export type Pkg = { id: string; name: string; desc: string; byVariant: Record<string, Row[]> };

const r = (tenor: number, tdp: number, angsuran: number): Row => ({ tenor, tdp, angsuran });

export const CREDIT_PERIOD = "November 2026";
export const CREDIT_AREA = "Jakarta";

export const PACKAGES: Pkg[] = [
  {
    id: "bunga-0", name: "Bunga 0%", desc: "Program Bunga 0% Jakarta, G6 Pro tenor hingga 35 bulan (3 tahun).",
    byVariant: { "g6-pro": [r(11, 259310000, 39609000), r(23, 247754000, 19805000), r(35, 249400000, 13203000)] },
  },
  {
    id: "reguler", name: "Paket Reguler", desc: "Paket reguler XPENG Jakarta, tenor 11–59 bulan.",
    byVariant: {
      "g6-pro": [r(11, 245419500, 44144000), r(23, 232283500, 22760000), r(35, 233317500, 15546000), r(47, 270708000, 11507000), r(59, 277388000, 9689000)],
      "x9-long-range-pro": [r(11, 433668000, 79250000), r(23, 409519500, 40861000), r(35, 410808000, 27909000), r(47, 477168000, 20657000), r(59, 488394000, 17393000)],
      "x9-long-range-pro-plus": [r(11, 447633000, 81851000), r(23, 422688500, 42202000), r(35, 424016000, 28825000), r(47, 492542000, 21335000), r(59, 504125000, 17964000)],
      "g9l-ultra-awd": [r(11, 458106000, 83801000), r(23, 432564500, 43207000), r(35, 433922000, 29512000), r(47, 504072000, 21843000), r(59, 515923000, 18392000)],
    },
  },
  {
    id: "imfi-bunga-ringan", name: "IMFI Bunga Ringan", desc: "Package program Indomobil Finance (IMFI), asuransi kombinasi, tenor 11–59 bulan.",
    byVariant: {
      "g6-pro": [r(11, 271700500, 41070000), r(23, 254212100, 21452000), r(35, 249287000, 15001000), r(47, 247511200, 11903000), r(59, 247389690, 10113000)],
      "g6-pro-awd": [r(11, 307199500, 46514000), r(23, 286927100, 24296000), r(35, 281336000, 16990000), r(47, 279310200, 13480000), r(59, 278652050, 11453000)],
      "x9-long-range-pro": [r(11, 480865000, 73733000), r(23, 448085480, 38513000), r(35, 438652400, 26932000), r(47, 436483600, 21369000), r(59, 435379950, 18154000)],
      "x9-long-range-pro-plus": [r(11, 496404000, 76152000), r(23, 462546280, 39777000), r(35, 453899400, 27815000), r(47, 450520600, 22070000), r(59, 449377950, 18750000)],
      "g9l-ultra-awd": [r(11, 508059000, 77967000), r(23, 473390880, 40724000), r(35, 464510400, 28478000), r(47, 461048600, 22596000), r(59, 459876450, 19197000)],
    },
  },
  {
    id: "imfi-dp-ringan", name: "IMFI DP Ringan", desc: "Package program IMFI, TDP tetap lebih rendah, tenor 12–60 bulan.",
    byVariant: {
      "g6-pro": [r(12, 170650000, 47004000), r(24, 170650000, 25185000), r(36, 170650000, 17980000), r(48, 170650000, 14415000), r(60, 170650000, 12681000)],
      "g6-pro-awd": [r(12, 193150000, 53160000), r(24, 193150000, 28482000), r(36, 193150000, 20333000), r(48, 193150000, 16301000), r(60, 193150000, 14329000)],
      "x9-long-range-pro": [r(12, 306750000, 83774000), r(24, 306750000, 44855000), r(36, 306750000, 32003000), r(48, 306750000, 25656000), r(60, 306750000, 22551000)],
      "x9-long-range-pro-plus": [r(12, 316750000, 86504000), r(24, 316750000, 46317000), r(36, 316750000, 33046000), r(48, 316750000, 26492000), r(60, 316750000, 23285000)],
      "g9l-ultra-awd": [r(12, 324250000, 88552000), r(24, 324250000, 47413000), r(36, 324250000, 33828000), r(48, 324250000, 27119000), r(60, 324250000, 23836000)],
    },
  },
];

export const CREDIT_TERMS = [
  "Perorangan: fotokopi NPWP, KTP pemohon & suami/istri, Kartu Keluarga, PBB & rekening listrik, rekening koran/tabungan 3 bulan terakhir, slip gaji (karyawan) atau SIUP/TDP (wiraswasta).",
  "Perusahaan: KTP pengurus (direktur & komisaris), akta pendirian & perubahannya, SIUP/NPWP/TDP/domisili, rekening koran 3 bulan terakhir, company profile.",
  "Status tempat tinggal wajib milik sendiri; wajib SLIK/BI Checking kolektibilitas 1 (lancar).",
  "Pembayaran angsuran wajib autodebet (Mandiri, BCA, atau BRI).",
];
