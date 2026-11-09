import {
  BookOpen,
  Dumbbell,
  Flag,
  HeartPulse,
  Landmark,
  Library,
  Laptop,
  School,
  Shapes,
  Droplets,
  Users,
  Utensils,
  Volleyball,
} from 'lucide-react'
import type { ChipOption } from '@/components/ui/FilterChips'
import type { KeyValue } from '@/components/ui/KeyValueList'
import type { SectionLink } from '@/components/ui/SectionNav'
import { unsplashImage } from '@/lib/unsplash'
import type { FacilityGroup, StaffCategory, StaffMember } from './types'

/**
 * Foto sementara dari Unsplash untuk melengkapi tampilan website.
 * Ganti dengan foto dan data resmi SDN 1 Kembaran saat aset asli tersedia.
 */

/** Urutan di sini = urutan section di halaman = urutan tautan sub-menu. */
export const PROFILE_SECTIONS: readonly SectionLink[] = [
  { id: 'sejarah', label: 'Sejarah' },
  { id: 'identitas', label: 'Identitas' },
  { id: 'visi-misi', label: 'Visi dan misi' },
  { id: 'guru-tendik', label: 'Guru dan tendik', shortLabel: 'Guru' },
  { id: 'fasilitas', label: 'Sarana dan prasarana', shortLabel: 'Sarpras' },
]

export const HISTORY_STATEMENT =
  '[Tuliskan sejarah berdirinya SDN 1 Kembaran, Desa Kembaran, Kecamatan Kalikajar: tahun berdiri, latar belakang, dan tonggak penting.]'

export const HISTORY_PHOTO = {
  ...unsplashImage({
    id: 'photo-1580582932707-520aed937b7b',
    width: 960,
    widths: [480, 640, 960, 1280],
  }),
  alt: 'Gedung dan lingkungan sekolah SDN 1 Kembaran',
} as const

/** Hanya tampil di layar md ke atas (sesuai desain, ponsel menampilkan pernyataan dan foto saja). */
export const HISTORY_TIMELINE: readonly KeyValue[] = [
  { label: '[Tahun]', value: 'Sekolah berdiri' },
  { label: '[Tahun]', value: 'Pengembangan fasilitas' },
  { label: '[Tahun]', value: 'Prestasi membanggakan' },
]

/** TODO: ganti dengan nama resmi; dipakai di Identitas, daftar guru, dan sambutan di Beranda. */
export const HEADMASTER_NAME = '[Nama Kepala Sekolah]'

export const SCHOOL_IDENTITY: readonly KeyValue[] = [
  { label: 'Nama sekolah', value: 'SDN 1 Kembaran' },
  { label: 'NPSN', value: '20307275' },
  { label: 'Status', value: 'Negeri' },
  { label: 'Akreditasi', value: '[Akreditasi]' },
  { label: 'Kurikulum', value: 'Kurikulum Merdeka' },
  { label: 'Alamat', value: '[Alamat lengkap], Desa Kembaran' },
  { label: 'Kecamatan', value: 'Kalikajar' },
  { label: 'Kabupaten', value: 'Wonosobo, Jawa Tengah' },
  { label: 'Kepala sekolah', value: HEADMASTER_NAME },
]

export const VISION = '[Tuliskan visi SDN 1 Kembaran di sini.]'

export const MISSIONS: readonly KeyValue[] = [
  { label: 'Misi 1', value: '[Misi pertama sekolah.]' },
  { label: 'Misi 2', value: '[Misi kedua sekolah.]' },
  { label: 'Misi 3', value: '[Misi ketiga sekolah.]' },
  { label: 'Misi 4', value: '[Misi keempat sekolah.]' },
]

export type StaffFilter = 'semua' | Exclude<StaffCategory, 'kepala-sekolah'>

export const STAFF_FILTERS: readonly ChipOption<StaffFilter>[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'guru-kelas', label: 'Guru Kelas' },
  { value: 'guru-mapel', label: 'Guru Mapel' },
  { value: 'tendik', label: 'Tenaga Kependidikan', shortLabel: 'Tendik' },
]

export const STAFF: readonly StaffMember[] = [
  {
    id: 'kepala-sekolah',
    name: HEADMASTER_NAME,
    role: 'Kepala sekolah',
    category: 'kepala-sekolah',
    photo: {
      ...unsplashImage({
        id: 'photo-1560250097-0b93528c311a',
        width: 400,
        widths: [200, 400, 600],
      }),
      alt: 'Kepala Sekolah SDN 1 Kembaran',
    },
  },
  {
    id: 'guru-kelas-1',
    name: '[Nama guru]',
    role: 'Guru kelas',
    category: 'guru-kelas',
    photo: {
      ...unsplashImage({
        id: 'photo-1573496359142-b8d87734a5a2',
        width: 400,
        widths: [200, 400, 600],
      }),
      alt: 'Guru Kelas SDN 1 Kembaran',
    },
  },
  {
    id: 'guru-mapel-1',
    name: '[Nama guru]',
    role: 'Guru mapel',
    category: 'guru-mapel',
    photo: {
      ...unsplashImage({
        id: 'photo-1589206946274-929e4da3996b',
        width: 400,
        widths: [200, 400, 600],
      }),
      alt: 'Guru Mata Pelajaran SDN 1 Kembaran',
    },
  },
  {
    id: 'tendik-1',
    name: '[Nama staf]',
    role: 'Tenaga kependidikan',
    category: 'tendik',
    photo: {
      ...unsplashImage({
        id: 'photo-1507003211169-0a1dd7228f2d',
        width: 400,
        widths: [200, 400, 600],
      }),
      alt: 'Tenaga Kependidikan SDN 1 Kembaran',
    },
  },
]

/**
 * Foto sarana dan prasarana: simpan berkas di `public/fasilitas/<kode>.jpg` (nama berkas
 * ada di `public/fasilitas/README.txt`). Selama berkas belum ada, kartu menampilkan ikon.
 */
const facilityPhoto = (slug: string, alt: string) => ({ src: `/fasilitas/${slug}.jpg`, alt })

/**
 * TODO: sesuaikan dengan kondisi sebenarnya. Daftar ini adalah daftar umum sekolah dasar:
 * HAPUS yang tidak dimiliki SDN 1 Kembaran dan tambahkan yang belum ada. Keterangan sengaja
 * umum (tanpa jumlah atau ukuran); tambahkan angka hanya bila datanya resmi.
 */
export const FACILITY_GROUPS: readonly FacilityGroup[] = [
  {
    title: 'Prasarana',
    items: [
      {
        name: 'Ruang kelas',
        description: 'Ruang belajar untuk kelas 1 sampai 6.',
        icon: School,
        photo: facilityPhoto('ruang-kelas', 'Ruang kelas SDN 1 Kembaran'),
      },
      {
        name: 'Perpustakaan',
        description: 'Tempat membaca dan meminjam buku untuk murid.',
        icon: Library,
        photo: facilityPhoto('perpustakaan', 'Perpustakaan SDN 1 Kembaran'),
      },
      {
        name: 'Mushola',
        description: 'Tempat ibadah dan pembiasaan salat bagi warga sekolah.',
        icon: Landmark,
        photo: facilityPhoto('mushola', 'Mushola SDN 1 Kembaran'),
      },
      {
        name: 'Lapangan voli',
        description: 'Untuk olahraga, latihan, dan kegiatan bersama.',
        icon: Volleyball,
        photo: facilityPhoto('lapangan-voli', 'Lapangan voli SDN 1 Kembaran'),
      },
      {
        name: 'Lapangan upacara',
        description: 'Tempat upacara bendera dan kegiatan di halaman.',
        icon: Flag,
        photo: facilityPhoto('lapangan-upacara', 'Lapangan upacara SDN 1 Kembaran'),
      },
      {
        name: 'UKS',
        description: 'Unit Kesehatan Sekolah untuk pertolongan pertama.',
        icon: HeartPulse,
        photo: facilityPhoto('uks', 'UKS SDN 1 Kembaran'),
      },
      {
        name: 'Ruang guru dan kepala sekolah',
        description: 'Pusat administrasi dan layanan sekolah.',
        icon: Users,
        photo: facilityPhoto('ruang-guru', 'Ruang guru dan kepala sekolah SDN 1 Kembaran'),
      },
      {
        name: 'Kantin sekolah',
        description: 'Tempat murid jajan dan makan saat istirahat.',
        icon: Utensils,
        photo: facilityPhoto('kantin', 'Kantin sekolah SDN 1 Kembaran'),
      },
      {
        name: 'Toilet dan tempat cuci tangan',
        description: 'Sanitasi dan air bersih untuk murid dan guru.',
        icon: Droplets,
        photo: facilityPhoto('toilet', 'Toilet dan tempat cuci tangan SDN 1 Kembaran'),
      },
    ],
  },
  {
    title: 'Sarana',
    items: [
      {
        name: 'Buku dan bahan bacaan',
        description: 'Buku pelajaran dan bacaan penunjang literasi.',
        icon: BookOpen,
        photo: facilityPhoto('buku-bacaan', 'Buku dan bahan bacaan SDN 1 Kembaran'),
      },
      {
        name: 'Alat olahraga',
        description: 'Perlengkapan pendidikan jasmani dan kegiatan olahraga.',
        icon: Dumbbell,
        photo: facilityPhoto('alat-olahraga', 'Alat olahraga SDN 1 Kembaran'),
      },
      {
        name: 'Alat peraga',
        description: 'Media belajar untuk membantu murid memahami pelajaran.',
        icon: Shapes,
        photo: facilityPhoto('alat-peraga', 'Alat peraga SDN 1 Kembaran'),
      },
      {
        name: 'Perangkat TIK',
        description: 'Perangkat teknologi pendukung pembelajaran.',
        icon: Laptop,
        photo: facilityPhoto('perangkat-tik', 'Perangkat TIK SDN 1 Kembaran'),
      },
    ],
  },
]
