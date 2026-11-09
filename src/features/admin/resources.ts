export type FieldKind = 'text' | 'textarea' | 'date' | 'tel' | 'select' | 'image'

export interface Option {
  value: string
  label: string
}

export interface ResourceField {
  name: string
  label: string
  kind: FieldKind
  required?: boolean
  options?: readonly Option[]
  hint?: string
  /** Tidak bisa diubah admin setelah dibuat (data yang masuk dari formulir publik). */
  lockedOnEdit?: boolean
}

export type Item = { id: string } & Record<string, string>

/** Satu modul pengelolaan konten (Berita, Agenda, dst.). Satu definisi = satu halaman panel. */
export interface ResourceDef {
  /** Nama koleksi; juga jalur API: `{ADMIN_API_URL}/{key}`. */
  key: string
  /** Segmen rute di bawah /admin. */
  path: string
  title: string
  singular: string
  titleField: string
  /** Kolom yang ditampilkan di bawah judul pada daftar. */
  metaFields: readonly string[]
  statusField?: string
  fields: readonly ResourceField[]
  canCreate: boolean
  exportable?: boolean
  empty: string
  /** Data contoh untuk mode demo. */
  seed: readonly Item[]
}

const PUBLISH: readonly Option[] = [
  { value: 'draf', label: 'Draf' },
  { value: 'terbit', label: 'Terbit' },
]

export const RESOURCES: readonly ResourceDef[] = [
  {
    key: 'news',
    path: 'berita',
    title: 'Berita',
    singular: 'berita',
    titleField: 'title',
    metaFields: ['category', 'date'],
    statusField: 'status',
    canCreate: true,
    empty: 'Belum ada berita. Tulis berita pertama Anda.',
    fields: [
      { name: 'title', label: 'Judul', kind: 'text', required: true },
      {
        name: 'category',
        label: 'Kategori',
        kind: 'select',
        required: true,
        options: [
          { value: 'Pengumuman', label: 'Pengumuman' },
          { value: 'Kegiatan', label: 'Kegiatan' },
          { value: 'Prestasi', label: 'Prestasi' },
        ],
      },
      { name: 'date', label: 'Tanggal', kind: 'date', required: true },
      { name: 'body', label: 'Isi berita', kind: 'textarea' },
      { name: 'status', label: 'Status', kind: 'select', required: true, options: PUBLISH },
    ],
    seed: [
      { id: 'n1', title: 'Contoh: Kegiatan Jumat Bersih di sekolah', category: 'Kegiatan', date: '2026-11-06', body: '', status: 'terbit' },
      { id: 'n2', title: 'Contoh: Informasi jadwal ujian semester', category: 'Pengumuman', date: '2026-11-03', body: '', status: 'terbit' },
      { id: 'n3', title: 'Contoh: Draf berita prestasi murid', category: 'Prestasi', date: '2026-11-08', body: '', status: 'draf' },
    ],
  },
  {
    key: 'announcements',
    path: 'pengumuman',
    title: 'Pengumuman',
    singular: 'pengumuman',
    titleField: 'title',
    metaFields: ['date'],
    statusField: 'status',
    canCreate: true,
    empty: 'Belum ada pengumuman.',
    fields: [
      { name: 'title', label: 'Judul pengumuman', kind: 'text', required: true },
      { name: 'date', label: 'Tanggal', kind: 'date', required: true },
      { name: 'body', label: 'Isi pengumuman', kind: 'textarea' },
      { name: 'status', label: 'Status', kind: 'select', required: true, options: PUBLISH },
    ],
    seed: [{ id: 'a1', title: 'Contoh: Libur semester ganjil', date: '2026-11-07', body: '', status: 'terbit' }],
  },
  {
    key: 'agenda',
    path: 'agenda',
    title: 'Agenda',
    singular: 'agenda',
    titleField: 'title',
    metaFields: ['date'],
    canCreate: true,
    empty: 'Belum ada agenda.',
    fields: [
      { name: 'title', label: 'Nama kegiatan', kind: 'text', required: true },
      { name: 'date', label: 'Tanggal', kind: 'date', required: true },
    ],
    seed: [
      { id: 'g1', title: 'Peringatan Hari Guru Nasional', date: '2026-11-25' },
      { id: 'g2', title: 'Pembagian rapor semester ganjil', date: '2026-12-18' },
    ],
  },
  {
    key: 'gallery',
    path: 'galeri',
    title: 'Galeri',
    singular: 'foto',
    titleField: 'caption',
    metaFields: [],
    canCreate: true,
    empty: 'Belum ada foto. Unggah foto kegiatan sekolah.',
    fields: [
      { name: 'caption', label: 'Keterangan foto', kind: 'text', required: true },
      { name: 'imageUrl', label: 'Foto', kind: 'image', required: true, hint: 'JPG atau PNG. Foto dikecilkan otomatis.' },
    ],
    seed: [],
  },
  {
    key: 'staff',
    path: 'guru',
    title: 'Guru dan tendik',
    singular: 'guru atau tendik',
    titleField: 'name',
    metaFields: ['role', 'category'],
    canCreate: true,
    empty: 'Belum ada data guru dan tenaga kependidikan.',
    fields: [
      { name: 'name', label: 'Nama', kind: 'text', required: true },
      { name: 'role', label: 'Jabatan', kind: 'text', required: true },
      {
        name: 'category',
        label: 'Kategori',
        kind: 'select',
        required: true,
        options: [
          { value: 'kepala-sekolah', label: 'Kepala sekolah' },
          { value: 'guru-kelas', label: 'Guru kelas' },
          { value: 'guru-mapel', label: 'Guru mapel' },
          { value: 'tendik', label: 'Tenaga kependidikan' },
        ],
      },
      { name: 'imageUrl', label: 'Foto', kind: 'image' },
    ],
    seed: [
      { id: 's1', name: 'Contoh Kepala Sekolah', role: 'Kepala sekolah', category: 'kepala-sekolah', imageUrl: '' },
      { id: 's2', name: 'Contoh Guru Kelas 1', role: 'Guru kelas', category: 'guru-kelas', imageUrl: '' },
    ],
  },
  {
    key: 'admission',
    path: 'ppdb',
    title: 'Pendaftar PPDB',
    singular: 'pendaftar',
    titleField: 'fullName',
    metaFields: ['birthDate', 'guardianName', 'guardianPhone'],
    statusField: 'status',
    canCreate: false,
    exportable: true,
    empty: 'Belum ada pendaftar.',
    fields: [
      { name: 'fullName', label: 'Nama murid', kind: 'text', lockedOnEdit: true },
      { name: 'birthDate', label: 'Tanggal lahir', kind: 'date', lockedOnEdit: true },
      { name: 'address', label: 'Alamat', kind: 'textarea', lockedOnEdit: true },
      { name: 'guardianName', label: 'Orang tua atau wali', kind: 'text', lockedOnEdit: true },
      { name: 'guardianPhone', label: 'Nomor WhatsApp', kind: 'tel', lockedOnEdit: true },
      {
        name: 'status',
        label: 'Status pendaftaran',
        kind: 'select',
        required: true,
        options: [
          { value: 'baru', label: 'Menunggu verifikasi' },
          { value: 'terverifikasi', label: 'Berkas terverifikasi' },
          { value: 'diterima', label: 'Diterima' },
          { value: 'ditolak', label: 'Ditolak' },
        ],
      },
    ],
    seed: [
      { id: 'p1', fullName: 'Contoh Calon Murid A', birthDate: '2021-03-12', address: 'Desa Kembaran', guardianName: 'Contoh Wali A', guardianPhone: '081200000001', status: 'baru' },
      { id: 'p2', fullName: 'Contoh Calon Murid B', birthDate: '2021-07-30', address: 'Desa Kembaran', guardianName: 'Contoh Wali B', guardianPhone: '081200000002', status: 'terverifikasi' },
    ],
  },
]

export const labelOf = (field: ResourceField | undefined, value: string): string =>
  field?.options?.find((option) => option.value === value)?.label ?? value
