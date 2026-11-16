/**
 * Panduan = jawaban atas pertanyaan nyata calon pembeli (dari tim sales). Satu pertanyaan = satu URL.
 * Fakta bertanggal + sumber. Yang tidak ada sumber resmi ditulis "tanyakan ke sales", bukan ditebak.
 */
export type Block = { h: string; p?: string; ul?: string[]; table?: { head: string[]; rows: string[][] } };
export type Guide = {
  slug: string; q: string; title: string; desc: string; answer: string; blocks: Block[];
  related: string[]; sources: { t: string; u: string }[]; verify?: string;
};

const WARRANTY = { t: "Autofun: paket garansi & servis XPENG (Jul 2026)", u: "https://www.autofun.co.id/berita/makin-serius-xpeng-buka-showroom-baru-dengan-fasilitas-lengkap-479095" };
const ESDM = { t: "Auto2000: tarif SPKLU sesuai Permen ESDM No. 1/2023 (Apr 2026)", u: "https://auto2000.co.id/berita-dan-tips/biaya-charge-mobil-listrik-di-spklu" };
const PLNTARIF = { t: "Katadata: tarif listrik PLN per September 2026", u: "https://katadata.co.id/amp/lifestyle/varia/6aa1f76ac3a84/daftar-lengkap-tarif-listrik-pln-terbaru-per-september-2026" };
const BROCHURE = { t: "Brosur resmi XPENG Indonesia (G6 Pro, New X9, G9L)", u: "" };
const CONFIRM = "Syarat garansi dan layanan dapat berubah; konfirmasi versi terbaru ke sales sebelum membeli.";

export const GUIDES: Guide[] = [
  {
    slug: "garansi-baterai-xpeng", q: "Bagaimana jika baterai XPENG rusak setelah garansi 8 tahun?",
    title: "Garansi Baterai XPENG 8 Tahun & Setelahnya | Dealer XPENG", desc: "Garansi baterai XPENG 8 tahun/160.000 km, syarat servis berkala, teknologi pengaman baterai, dan hal yang perlu ditanyakan untuk masa setelah garansi.",
    answer: "Baterai tegangan tinggi, BMS, dan motor listrik XPENG digaransi 8 tahun atau 160.000 km (mana tercapai lebih dulu) menurut pemberitaan peluncuran XPENG Indonesia. Setelah garansi berakhir, kami belum menemukan harga atau skema penggantian baterai yang dipublikasikan resmi. Tanyakan ke sales, jangan percaya angka tanpa sumber.",
    blocks: [
      { h: "Garansi yang berlaku sekarang", ul: ["Kendaraan: 8 tahun/160.000 km.", "Baterai tegangan tinggi, BMS, dan motor listrik: 8 tahun/160.000 km.", "Syarat: servis berkala setiap 12 bulan atau 20.000 km (mana tercapai lebih dulu); pemeriksaan awal di 5.000 km atau 3 bulan."] },
      { h: "Bagaimana baterai dirancang menghadapi usia pakai", p: "Menurut brosur G6 Pro: baterai 5C generasi baru dengan desain 4-3-4 untuk ketahanan benturan, api, dan thermal runaway, deteksi gangguan real-time dengan isolasi sirkuit otomatis, serta platform 800V. G6 Pro memakai sel LFP; X9 Long Range memakai NCM. Brosur tidak mencantumkan umur siklus, jadi kami tidak menyebut angkanya." },
      { h: "Setelah 8 tahun: yang perlu ditanyakan ke sales", ul: ["Apakah ada program pengganti baterai atau perpanjangan garansi, dan berapa biayanya?", "Apakah baterai bisa diperbaiki per modul (Battery Repair tersedia di layanan purnajual dealer menurut pemberitaan) atau harus diganti utuh?", "Berapa batas kesehatan baterai (SOH) yang dihitung sebagai kerusakan di bawah garansi?"] },
    ],
    related: ["biaya-servis-xpeng", "harga-jual-kembali-xpeng"], sources: [WARRANTY, { t: "Detik Oto: garansi XPENG G6 & X9", u: "https://oto.detik.com/mobil-listrik/d-8509170/keraguan-beli-mobil-listrik-xpeng-punya-jawaban-teknisnya" }, BROCHURE], verify: CONFIRM,
  },
  {
    slug: "harga-jual-kembali-xpeng", q: "Apakah harga jual kembali XPENG turun?",
    title: "Harga Jual Kembali XPENG: Apa yang Perlu Diketahui | Dealer XPENG", desc: "Faktor yang memengaruhi nilai jual kembali mobil listrik XPENG dan pertanyaan yang perlu diajukan sebelum membeli.",
    answer: "Belum ada data harga jual kembali XPENG yang dipublikasikan resmi karena merek ini baru dipasarkan di Indonesia, jadi kami tidak memberi angka persentase. Nilai bekas umumnya dipengaruhi kondisi baterai, riwayat servis resmi, sisa garansi, dan permintaan pasar. Tanyakan ke sales apakah ada program buyback atau garansi yang ikut berpindah.",
    blocks: [
      { h: "Faktor yang umumnya memengaruhi nilai bekas mobil listrik", ul: ["Kesehatan baterai dan sisa garansi baterai.", "Riwayat servis berkala di bengkel resmi (juga syarat garansi XPENG).", "Kondisi fisik, jarak tempuh, dan kelengkapan fitur.", "Permintaan pasar bekas, yang masih berkembang untuk mobil listrik."] },
      { h: "Pertanyaan yang sebaiknya diajukan sebelum membeli", ul: ["Apakah sisa garansi tetap berlaku untuk pemilik kedua? Pada sebagian merek, garansi hanya melekat pada pemilik pertama.", "Apakah ada program tukar tambah atau buyback resmi?", "Apakah pemakaian komersial (taksi online, rental) memengaruhi garansi?"] },
    ],
    related: ["garansi-baterai-xpeng", "garansi-modifikasi-xpeng"], sources: [{ t: "Carmudi: penyebab garansi mobil listrik gugur", u: "https://www.carmudi.co.id/journal/penyebab-garansi-mobil-listrik-gugur/" }], verify: CONFIRM,
  },
  {
    slug: "antre-spklu-mobil-listrik", q: "Apakah antre di SPKLU sekarang susah?",
    title: "Antre di SPKLU: Cara Mengatasinya untuk Pemilik XPENG | Dealer XPENG", desc: "Kapan SPKLU ramai, mengapa home charging mengurangi ketergantungan pada SPKLU, dan seberapa cepat XPENG mengisi daya DC.",
    answer: "SPKLU bisa ramai pada musim mudik: PLN mencatat pemakaian naik 4,14 kali saat Lebaran 2026, dan sebagian titik yang padat sudah ditingkatkan ke fast charging. Untuk pemakaian harian, banyak pemilik mengisi di rumah. Saat harus ke SPKLU, XPENG menerima DC 10–80% sekitar 12 menit sehingga waktu per antrean singkat.",
    blocks: [
      { h: "Mengurangi antrean dari sisi pemakaian", ul: ["Isi di rumah (AC 11 kW) semalam untuk pemakaian harian, lihat panduan waktu home charging.", "Hindari jam dan hari puncak libur panjang; isi hingga 80% saja di SPKLU, karena sesi 10–80% paling cepat.", "Rencanakan titik cadangan di rute jauh dan cek ketersediaan lewat aplikasi charger (PLN Mobile atau aplikasi XPENG)."] },
      { h: "Kecepatan pengisian XPENG", p: "Menurut brosur, DC 10–80% sekitar 12 menit (G6 Pro puncak 451 kW; X9 hingga 542 kW; G9L 11,7 menit) pada charger yang mendukung. Daya nyata dibatasi kemampuan charger di lokasi, sehingga di SPKLU biasa waktunya lebih lama." },
      { h: "Catatan jujur", p: "Kami belum punya data antrean per lokasi di Jabodetabek. Bila Anda sering melewati rute tertentu, tanyakan sales soal titik charger yang biasa dipakai pelanggan XPENG." },
    ],
    related: ["waktu-charge-xpeng-di-rumah", "biaya-charge-xpeng-rumah-vs-spklu"],
    sources: [{ t: "Investortrust: penggunaan SPKLU naik 4,14 kali saat Lebaran 2026", u: "https://investortrust.id/business/98814/penggunaan-spklu-naik-4-14-kali-saat-lebaran-2026-pln-ungkap-tren-kendaraan-listrik" }, BROCHURE],
  },
  {
    slug: "biaya-servis-xpeng", q: "Apakah biaya servis XPENG mahal?",
    title: "Biaya Servis XPENG: Gratis Servis 5 Tahun & Jadwalnya | Dealer XPENG", desc: "Paket gratis servis XPENG 5 tahun/100.000 km, jadwal servis berkala, dan layanan purnajual di dealer.",
    answer: "Setiap pembelian XPENG disebut mencakup gratis servis 5 tahun atau 100.000 km (mana tercapai lebih dulu), dengan servis berkala tiap 12 bulan atau 20.000 km. Karena itu biaya servis berkala di periode tersebut ditanggung paket. Tarif di luar paket belum dipublikasikan; tanyakan ke sales.",
    blocks: [
      { h: "Jadwal servis", ul: ["Pemeriksaan awal: 5.000 km atau 3 bulan setelah serah terima.", "Servis berkala: setiap 12 bulan atau 20.000 km, mana tercapai lebih dulu."] },
      { h: "Layanan di dealer 3S", p: "Dealer 3S XPENG (Sales, Service, Spare Parts) menyediakan servis berkala, perbaikan umum, spooring, servis AC, pemeriksaan kaki-kaki, dan diagnosis kendaraan. Dealer di Pondok Indah juga menyebut quick repair, heavy repair, battery repair, dan wheel alignment." },
      { h: "Yang perlu dikonfirmasi", ul: ["Item apa saja yang termasuk gratis servis (jasa, oli reduksi, filter kabin, dsb.) dan mana yang dihitung terpisah.", "Estimasi biaya servis setelah 5 tahun/100.000 km."] },
    ],
    related: ["suku-cadang-xpeng", "garansi-baterai-xpeng"], sources: [WARRANTY, { t: "Gridoto: dealer flagship XPENG Pondok Indah", u: "https://www.gridoto.com/amp/224308834/xpeng-buka-dealer-flagship-di-pondok-indah-fasilitasnya-lengkap" }], verify: CONFIRM,
  },
  {
    slug: "suku-cadang-xpeng", q: "Apakah suku cadang XPENG susah didapat?",
    title: "Suku Cadang XPENG: Gudang Lokal & Dealer 3S | Dealer XPENG", desc: "Ketersediaan suku cadang XPENG di Indonesia: gudang lokal, dealer 3S, dan jaringan servis.",
    answer: "XPENG menyatakan menyediakan suku cadang dan aksesori asli melalui jaringan dealer 3S, didukung gudang lokal di Indonesia untuk mempercepat distribusi dan memperpendek waktu tunggu. Ketersediaan tiap komponen tetap perlu dicek ke bengkel resmi, terutama untuk bagian khusus.",
    blocks: [
      { h: "Yang sudah dinyatakan", ul: ["Gudang suku cadang lokal di Indonesia (Autofun, Jul 2026).", "Dealer 3S menggabungkan penjualan, servis, dan suku cadang, termasuk di Alam Sutera dengan 7 service bay (JawaPos, Jul 2026).", "XPENG juga menyiapkan mekanik keliling untuk wilayah yang belum ada dealer (Otodriver, 2026)."] },
      { h: "Yang belum bisa kami janjikan", p: "Lama waktu tunggu per komponen dan harga suku cadang belum kami temukan dalam sumber resmi. Tanyakan estimasi ke dealer untuk komponen yang Anda khawatirkan." },
    ],
    related: ["biaya-servis-xpeng", "garansi-modifikasi-xpeng"], sources: [WARRANTY, { t: "JawaPos: dealer 3S Alam Sutera", u: "https://jawapos.com/otomotif/2607280171/xpeng-resmikan-dealer-3s-di-alam-sutera-hadirkan-7-service-bay-untuk-tingkatkan-layanan-purnajual" }, { t: "Otodriver: mekanik terbang XPENG", u: "https://otodriver.com/berita/2026/xpeng-siapkan-mekanik-terbang-untuk-wilayah-yang-belum-ada-dealer-xpeediccler" }], verify: CONFIRM,
  },
  {
    slug: "xpeng-mobil-listrik-apa", q: "XPENG itu mobil listrik apa?",
    title: "XPENG Mobil Listrik Apa? Merek, Model & Distributor | Dealer XPENG", desc: "Mengenal XPENG: merek mobil listrik berbasis teknologi pintar, model yang dijual di Indonesia, dan distributor resminya.",
    answer: "XPENG adalah merek mobil listrik asal Tiongkok yang berdiri pada 2014 dan berfokus pada kendaraan terkoneksi dan kecerdasan buatan. Di Indonesia XPENG didistribusikan oleh PT Erajaya Active Lifestyle sebagai agen pemegang merek. Model yang dijual: G6, X9, dan G9L, serta L03 yang dalam tahap pre-order.",
    blocks: [
      { h: "Model di Indonesia (harga OTR Jakarta, Nov 2026)", ul: ["G6: SUV coupe, mulai Rp679 juta.", "X9: MPV 7 seater, mulai Rp1,14 miliar.", "G9L Ultra AWD: SUV 6 seater, Rp1,289 miliar.", "L03: sudah menerima pre-order, harga belum diumumkan per 29 Okt 2026."] },
      { h: "Layanan di Indonesia", p: "Jaringan dealer 3S (sales, servis, suku cadang) dan gudang suku cadang lokal. Garansi kendaraan dan baterai 8 tahun/160.000 km menurut pemberitaan peluncuran." },
    ],
    related: ["secanggih-apa-xpeng", "xpeng-bagus-atau-tidak"], sources: [{ t: "Kumparan Oto: profil XPENG di GIIAS 2025", u: "https://kumparan.com/kumparanoto/xpeng-g6-tampil-di-giias-2025-ada-diskon-hingga-rp-40-juta-25Z7kpcegjk" }, { t: "Fortune IDN: Erajaya memasarkan XPENG", u: "https://www.fortuneidn.com/business/erajaya-resmi-pasarkan-xpeng-yang-bakal-diproduksi-lokal-00-my5jv-6q8pm5" }],
  },
  {
    slug: "secanggih-apa-xpeng", q: "Secanggih apa teknologi XPENG?",
    title: "Teknologi XPENG: XPILOT, Pengisian 800V & Fitur Pintar | Dealer XPENG", desc: "Fitur teknologi XPENG menurut brosur: bantuan berkendara XPILOT, platform 800V, pengisian cepat, dan sistem kabin pintar.",
    answer: "Menurut brosur, XPENG G6 dan X9 memakai platform 800V silicon carbide dengan pengisian DC 10–80% sekitar 12 menit, bantuan berkendara XPILOT Assist, asisten suara \"Hey XPENG\", pembaruan OTA, dan fitur parkir otomatis. X9 menambah rear-wheel steering dan suspensi udara. XPILOT adalah bantuan, bukan mengemudi otomatis penuh.",
    blocks: [
      { h: "Menurut brosur", table: { head: ["Fitur", "G6 Pro", "X9", "G9L"], rows: [
        ["Platform", "800V SiC", "800V SiC", "—"], ["Pengisian DC 10–80%", "12 menit", "12 menit", "11,7 menit"],
        ["Bantuan berkendara", "XPILOT Assist, prosesor NVIDIA Orin-X", "XPILOT Assist, 27 sensor", "Lihat brosur"],
        ["Fitur parkir", "Auto parking, summon jarak jauh", "Auto parking, summon jarak jauh", "Lihat brosur"],
        ["Airbag", "7", "9", "9"], ["Rear-wheel steering", "—", "Ya", "Ya"] ] } },
      { h: "Catatan penting", p: "Brosur menegaskan XPILOT adalah fungsi bantuan dan tidak dapat mengatasi semua kondisi lalu lintas, cuaca, dan jalan; pengemudi harus selalu memperhatikan lalu lintas. Fitur dapat berbeda per varian dan periode produksi." },
    ],
    related: ["xpeng-mobil-listrik-apa", "xpeng-bagus-atau-tidak"], sources: [BROCHURE],
  },
  {
    slug: "xpeng-bagus-atau-tidak", q: "Saya baru dengar XPENG, apakah bagus?",
    title: "XPENG Bagus atau Tidak? Fakta Keselamatan, Garansi & Layanan | Dealer XPENG", desc: "Fakta yang bisa dicek tentang XPENG: peringkat keselamatan, garansi, jaringan servis, dan cara menilai langsung lewat test drive.",
    answer: "Penilaian \"bagus\" bergantung kebutuhan Anda, jadi kami beri fakta yang bisa dicek: XPENG G6 memperoleh peringkat bintang lima Euro NCAP menurut XPENG, garansi kendaraan dan baterai 8 tahun/160.000 km, gratis servis 5 tahun, serta dealer 3S di Jabodetabek. Cara paling jujur menilai adalah test drive.",
    blocks: [
      { h: "Fakta yang bisa dicek", ul: ["Keselamatan: peringkat Euro NCAP bintang lima untuk G6 (pernyataan XPENG); brosur X9 menyebut standar EN-NCAP 5 bintang.", "Garansi: 8 tahun/160.000 km untuk kendaraan dan komponen listrik utama.", "Layanan: dealer 3S, gudang suku cadang lokal, servis gratis 5 tahun/100.000 km.", "Distribusi resmi: PT Erajaya Active Lifestyle."] },
      { h: "Cara menilai sendiri", ul: ["Test drive rute yang biasa Anda lewati.", "Tanyakan simulasi biaya listrik per bulan sesuai jarak harian Anda.", "Lihat langsung bengkel dan ruang tunggu servis di dealer."] },
    ],
    related: ["xpeng-mobil-listrik-apa", "secanggih-apa-xpeng"], sources: [{ t: "XPENG: G6 meraih Euro NCAP 5 bintang (siaran kemitraan ERAL)", u: "https://www.xpeng.com/news/01942c8176a5930995738a0282fe0227" }, WARRANTY], verify: "Peringkat keselamatan adalah klaim produsen; cek laporan Euro NCAP untuk detail dan spesifikasi unit yang dinilai.",
  },
  {
    slug: "garansi-modifikasi-xpeng", q: "Apakah garansi XPENG hilang kalau dimodifikasi?",
    title: "Modifikasi XPENG dan Garansi: Yang Aman & Berisiko | Dealer XPENG", desc: "Apakah modifikasi menggugurkan garansi mobil listrik XPENG? Prinsip umum dan hal yang wajib ditanyakan ke bengkel resmi sebelum memasang aksesori.",
    answer: "Kami belum menemukan pernyataan resmi XPENG Indonesia khusus modifikasi. Di industri mobil listrik, perubahan pada sistem kelistrikan paling berisiko membatalkan garansi, sedangkan sebagian merek menilai klaim kasus per kasus. Tanyakan ke sales atau bengkel resmi sebelum memasang aksesori, dan simpan bukti pemasangan.",
    blocks: [
      { h: "Prinsip umum (bukan kebijakan XPENG)", ul: ["Menyambung atau mengubah kelistrikan (audio, lampu, GPS, aksesori elektronik) dinilai paling berisiko, juga untuk keselamatan.", "Modifikasi eksterior non-listrik umumnya dinilai lebih ringan dibanding kelistrikan, tetapi tetap tanyakan.", "Sebagian merek menilai kasus per kasus: garansi gugur bila kerusakan terbukti terkait modifikasi."] },
      { h: "Sebelum memodifikasi", ul: ["Minta jawaban tertulis dari dealer soal aksesori yang Anda inginkan.", "Gunakan aksesori resmi bila tersedia.", "Pasang di bengkel resmi dan simpan nota."] },
    ],
    related: ["biaya-servis-xpeng", "garansi-baterai-xpeng"], sources: [{ t: "Detik Oto: jangan modifikasi mobil listrik sembarangan (Jul 2025)", u: "https://oto.detik.com/mobil-listrik/d-8002791/ingat-mobil-listrik-jangan-dimodifikasi-sembarangan" }, { t: "Autofun: jawaban Jaecoo soal modifikasi dan garansi (Sep 2026)", u: "https://www.autofun.co.id/berita/modifikasi-mobil-listrik-gugurkan-garansi-ini-jawaban-jaecoo-indonesia-482217" }], verify: "Ini prinsip umum industri dan contoh merek lain, bukan kebijakan XPENG. Minta kepastian tertulis dari dealer.",
  },
  {
    slug: "biaya-charge-xpeng-rumah-vs-spklu", q: "Berapa biaya mengisi daya XPENG di rumah dan di SPKLU?",
    title: "Biaya Charge XPENG: Rumah vs SPKLU (Hitungan Nov 2026) | Dealer XPENG", desc: "Perbandingan biaya mengisi daya XPENG di rumah dan di SPKLU berdasarkan tarif PLN dan aturan ESDM, dengan contoh hitungan G6 Pro dan X9.",
    answer: "Di rumah, tarif PLN non-subsidi 1.300–2.200 VA sekitar Rp1.445 per kWh. Di SPKLU sekitar Rp2.466 per kWh ditambah biaya layanan Rp25.000 (fast) atau Rp57.000 (ultra fast) per sesi. Contoh G6 Pro mengisi 10–80% (±56,6 kWh): sekitar Rp82 ribu di rumah dan sekitar Rp196 ribu di SPKLU ultra fast.",
    blocks: [
      { h: "Tarif acuan", ul: ["Rumah, R-1 1.300–2.200 VA: Rp1.444,70/kWh; R-2 3.500–5.500 VA: Rp1.699,53/kWh (PLN, per Sep 2026).", "SPKLU: sekitar Rp2.466/kWh; fast charging (25–50 kW) tambahan maks. Rp25.000/sesi; ultra fast (>50 kW) tambahan maks. Rp57.000/sesi.", "PLN punya program diskon 30% untuk pengisian pukul 22.00–05.00 bagi pelanggan yang memasang home charging PLN; cek syaratnya (CNBC Indonesia, Agu 2026)."] },
      { h: "Contoh hitungan: isi 10–80% (tarif rumah Rp1.444,70/kWh)", table: { head: ["Model", "Energi (±)", "Rumah", "SPKLU ultra fast"], rows: [
        ["G6 Pro (80,8 kWh)", "56,6 kWh", "±Rp82 ribu", "±Rp196 ribu"], ["X9 Standard Range (94,8 kWh)", "66,4 kWh", "±Rp96 ribu", "±Rp221 ribu"], ["X9 Long Range (110 kWh)", "77 kWh", "±Rp111 ribu", "±Rp247 ribu"] ] } },
      { h: "Cara membaca hitungan", p: "Dihitung dari kapasitas baterai bruto dalam brosur dikali tarif, belum termasuk rugi pengisian (sekitar beberapa persen), pajak, dan biaya admin tiap operator. Penggunaan nyata sedikit lebih tinggi. Tarif PLN dievaluasi berkala; cek tarif terbaru." },
      { h: "Gratis pengisian", p: "Menurut pemberitaan peluncuran, pembeli XPENG mendapat gratis pengisian daya 1 tahun melalui XPENG App (kuota dan syarat perlu dikonfirmasi ke sales)." },
    ],
    related: ["waktu-charge-xpeng-di-rumah", "antre-spklu-mobil-listrik"], sources: [PLNTARIF, ESDM, { t: "CNBC Indonesia: program home charging PLN (Agu 2026)", u: "https://cnbcindonesia.com/news/20260806185224-4-757253/makin-banyak-warga-ri-pasang-charger-ev-6-bulan-tambah-21865-rumah" }, { t: "Otodriver: gratis isi daya 1 tahun via XPENG App", u: "https://otodriver.com/berita/2026/xpeng-siapkan-mekanik-terbang-untuk-wilayah-yang-belum-ada-dealer-xpeediccler" }, BROCHURE], verify: "Estimasi, bukan penawaran. Tarif PLN dan operator SPKLU dapat berubah.",
  },
  {
    slug: "waktu-charge-xpeng-di-rumah", q: "Berapa lama mengisi XPENG dengan wall charger di rumah (10–90% dan 10–100%)?",
    title: "Waktu Charge XPENG di Rumah: 10–90% & 10–100% (Wallbox 11 kW) | Dealer XPENG", desc: "Estimasi waktu mengisi XPENG G6 Pro dan X9 dengan wallbox AC 11 kW dari 10% ke 90% dan 100%, dihitung dari data brosur.",
    answer: "Dengan AC 11 kW, brosur mencatat 5–100% sekitar 9,2 jam (G6 Pro), 9,5 jam (X9 Standard Range), dan 11 jam (X9 Long Range). Dari itu, estimasi kami 10–90% sekitar 7,7 jam (G6 Pro), 8 jam (X9 SR), 9,3 jam (X9 LR); 10–100% sekitar 8,7, 9, dan 10,4 jam. Ini perkiraan, bukan angka resmi.",
    blocks: [
      { h: "Estimasi dengan wallbox 11 kW", table: { head: ["Model", "5–100% (brosur)", "10–90% (estimasi)", "10–100% (estimasi)"], rows: [
        ["G6 Pro", "9,2 jam", "±7,7 jam", "±8,7 jam"], ["X9 Standard Range", "9,5 jam", "±8 jam", "±9 jam"], ["X9 Long Range Pro/Pro+", "11 jam", "±9,3 jam", "±10,4 jam"], ["X9 Long Range Pro+ AWD", "11 jam", "±9,3 jam", "±10,4 jam"] ] } },
      { h: "Cara menghitung", p: "Angka 10–90% dan 10–100% adalah skala proporsional dari waktu 5–100% pada brosur. Mendekati 100% pengisian biasanya melambat, jadi 10–100% bisa sedikit lebih lama." },
      { h: "Syarat daya di rumah", p: "Waktu di atas berlaku bila rumah dan wallbox mampu menyalurkan 11 kW (umumnya tiga fase). Jika hanya 7,4 kW (satu fase), G6 Pro butuh kira-kira 8,7 jam untuk 10–90% dan 9,8 jam untuk 10–100%, belum termasuk rugi pengisian. Daya listrik terpasang dan instalasi perlu dicek teknisi atau PLN." },
      { h: "Belum tersedia", p: "Waktu AC untuk G9L tidak kami cantumkan karena belum kami verifikasi dari brosur; tanyakan ke sales." },
    ],
    related: ["biaya-charge-xpeng-rumah-vs-spklu", "antre-spklu-mobil-listrik"], sources: [BROCHURE], verify: "Estimasi dari data brosur; hasil nyata bergantung suhu, kondisi baterai, dan daya yang tersedia.",
  },
];

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);
