// ==========================================
// IDENTITAS DAN DATA KONSTAN KIR SMANCA
// ==========================================

export const LOGO_URL =
  "https://media.base44.com/images/public/user_6ac228e1f779d4834631696c/951cbf30d_1000398544.png";

export const NAMA_ORGANISASI = "KIR SMANCA";

export const NAMA_SEKOLAH = "UPTD SMAN 1 Campalagian";

export const INSTAGRAM_URL =
  "https://www.instagram.com/kir.sman1campalagian?stkn=azlwbnAza2lhZjY3";

// ==========================================
// FOTO DOKUMENTASI
// Foto dokumentasi asli yang diunggah pengguna
// ==========================================

export const DOKUMENTASI_FOTO = [
  {
    url: "https://media.base44.com/images/public/user_6ac228e1f779d4834631696c/2b27f7419_1000398542.jpg",
    keterangan: "Praktikum di Laboratorium Kimia KIR SMANCA",
  },
  {
    url: "https://media.base44.com/images/public/user_6ac228e1f779d4834631696c/7906c60f1_1000398541.jpg",
    keterangan:
      "Silaturahmi & Pembinaan Ekstra Kurikuler Kimia — Oktober 2023",
  },
  {
    url: "https://media.base44.com/images/public/user_6ac228e1f779d4834631696c/6c22a7096_1000398543.jpg",
    keterangan: "Observasi lapangan ilmiah KIR SMANCA",
  },
];

// ==========================================
// PILIHAN KELAS
// X Merdeka 1–11
// XI Merdeka 1–11
// ==========================================

export const KELAS_OPTIONS = [
  ...Array.from(
    { length: 11 },
    (_, i) => `X Merdeka ${i + 1}`
  ),

  ...Array.from(
    { length: 11 },
    (_, i) => `XI Merdeka ${i + 1}`
  ),
];

// ==========================================
// DEFAULT PROFIL ORGANISASI
// ==========================================

export const DEFAULT_PROFIL = {
  deskripsi:
    "Kelompok Ilmiah Remaja (KIR) SMANCA merupakan organisasi ekstrakurikuler yang menjadi wadah bagi peserta didik untuk mengembangkan kemampuan berpikir ilmiah, kreativitas, penelitian, dan inovasi.",

  visi:
    "Menjadi wadah penelitian dan inovasi pelajar yang berkarakter, kritis, dan berdaya saing di tingkat regional maupun nasional.",

  misi:
    "1. Mengembangkan kemampuan berpikir ilmiah dan kritis.\n" +
    "2. Membangun kreativitas dan inovasi pelajar.\n" +
    "3. Melatih keterampilan penelitian dan presentasi ilmiah.\n" +
    "4. Membangun kerja sama dan jiwa kepemimpinan.",

  keunggulan:
    "Berpikir Kritis\n" +
    "Kreativitas dan Inovasi\n" +
    "Penelitian Ilmiah",
};

// ==========================================
// DEFAULT PENGATURAN WEBSITE
// ==========================================

export const DEFAULT_PENGATURAN = {
  judul_website: "KIR SMANCA",

  deskripsi_hero:
    "Selamat datang di website resmi Kelompok Ilmiah Remaja (KIR) SMANCA. Bergabunglah bersama kami untuk mengembangkan kreativitas, kemampuan berpikir kritis, keterampilan penelitian, serta semangat berinovasi dalam dunia ilmu pengetahuan.",

  info_pendaftaran:
    "Pendaftaran anggota baru KIR SMANCA dibuka untuk seluruh siswa UPTD SMAN 1 Campalagian. Silakan isi formulir pendaftaran secara lengkap.",

  info_kontak:
    "KIR SMANCA — UPTD SMAN 1 Campalagian. Hubungi kami melalui Instagram resmi.",

  instagram: INSTAGRAM_URL,

  footer_text:
    "© 2026 KIR SMANCA | UPTD SMAN 1 Campalagian — All Rights Reserved.",
};

// ==========================================
// HELPER
// Mengambil satu record profil/pengaturan
// atau menggunakan data default
// ==========================================

export async function getSingleRecord(entity, fallback) {
  try {
    const page = await entity.filter({}, { limit: 1 });

    if (page.items && page.items.length > 0) {
      return page.items[0];
    }

    return {
      ...fallback,
      _missing: true,
    };
  } catch {
    return {
      ...fallback,
      _missing: true,
    };
  }
}
