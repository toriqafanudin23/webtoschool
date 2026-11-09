export const SITE = {
  name: 'SDN 1 Kembaran',
  type: 'Sekolah Dasar Negeri',
  tagline: 'Belajar ceria, tumbuh cerdas, dan berkarakter.',
  description:
    'Sekolah dasar negeri di Desa Kembaran, Kecamatan Kalikajar, Kabupaten Wonosobo. Ramah anak, berkurikulum merdeka, dengan guru yang mendampingi tiap murid.',
} as const

export const PPDB = {
  year: '2027/2028',
  period: '1 Maret sampai 30 April 2027',
} as const

/**
 * TODO: ganti dengan data resmi sekolah. Nilai di bawah masih placeholder
 * sesuai desain, sengaja tidak diisi data karangan.
 */
export const CONTACT = {
  address: '[Alamat lengkap], Desa Kembaran, Kec. Kalikajar, Kab. Wonosobo, Jawa Tengah',
  phone: '[Nomor telepon / WhatsApp sekolah]',
  email: '[Email sekolah]',
} as const

/**
 * Peta lokasi sekolah (halaman Kontak). Selama `placeUrl` dan `embedUrl` kosong, peta dicari lewat
 * `query` (nama sekolah + wilayah). TODO: untuk titik yang tepat, buka sekolah di Google Maps lalu:
 * - `placeUrl`: tempel tautan dari Bagikan > Salin link (mis. https://maps.app.goo.gl/...).
 * - `embedUrl`: tempel nilai `src` dari Bagikan > Sematkan peta (https://www.google.com/maps/embed?pb=...).
 */
export const MAP = {
  query: 'SD Negeri 1 Kembaran, Kalikajar, Wonosobo, Jawa Tengah',
  placeUrl: '',
  embedUrl: '',
} as const

/**
 * TODO: alamat dasar API pendaftaran (backend). Selama kosong, formulir PPDB tetap
 * bisa diisi dan drafnya tersimpan di perangkat, tetapi pengiriman dan cek status
 * menampilkan pesan "belum aktif". Kontrak API ada di features/admission/api.ts.
 */
export const ADMISSION_API_URL = ''

/** TODO: alamat dasar API pesan kontak. Kosong = formulir Kontak menampilkan "belum aktif". Kontrak: features/contact/api.ts. */
export const CONTACT_API_URL = ''

/** TODO: alamat dasar API admin (login, berita, pendaftar). Kosong = login menampilkan "belum aktif". Kontrak: features/admin/api.ts. */
export const ADMIN_API_URL = ''
