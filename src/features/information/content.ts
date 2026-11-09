import type { ChipOption } from '@/components/ui/FilterChips'
import type { KeyValue } from '@/components/ui/KeyValueList'
import type { SectionLink } from '@/components/ui/SectionNav'
import { unsplashImage } from '@/lib/unsplash'
import type { DownloadFile, GalleryPhoto } from './types'

/**
 * Foto sementara dari Unsplash untuk dokumentasi dan galeri sekolah.
 * Ganti dengan foto asli kegiatan SDN 1 Kembaran saat aset resmi tersedia.
 * Berita dan agenda memakai `LATEST_NEWS` dan `UPCOMING_AGENDA` dari features/home/content.ts
 * agar Beranda dan halaman Informasi selalu sama.
 */

/** Urutan di sini = urutan section di halaman = urutan tautan sub-menu. */
export const INFORMATION_SECTIONS: readonly SectionLink[] = [
  { id: 'berita', label: 'Berita' },
  { id: 'pengumuman', label: 'Pengumuman' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'unduhan', label: 'Unduhan' },
]

/** Nilai selain `semua` harus sama persis dengan `NewsPost.category`. */
export type NewsFilter = 'semua' | 'Pengumuman' | 'Kegiatan' | 'Prestasi'

export const NEWS_FILTERS: readonly ChipOption<NewsFilter>[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'Pengumuman', label: 'Pengumuman' },
  { value: 'Kegiatan', label: 'Kegiatan' },
  { value: 'Prestasi', label: 'Prestasi' },
]

export const ANNOUNCEMENTS: readonly KeyValue[] = [
  { label: '[tgl]', value: '[Judul pengumuman]' },
  { label: '[tgl]', value: '[Judul pengumuman]' },
  { label: '[tgl]', value: '[Judul pengumuman]' },
]

export const GALLERY: readonly GalleryPhoto[] = [
  {
    caption: 'Belajar bersama di kelas',
    shortCaption: 'Belajar di kelas',
    photo: {
      ...unsplashImage({
        id: 'photo-1509062522246-3755977927d7',
        width: 600,
        widths: [300, 600, 900],
      }),
      alt: 'Suasana belajar interaktif murid di dalam kelas',
    },
  },
  {
    caption: 'Berkarya lewat seni',
    photo: {
      ...unsplashImage({
        id: 'photo-1574704530833-d47190a0d92f',
        width: 600,
        widths: [300, 600, 900],
      }),
      alt: 'Murid berkreasi dengan antusias dalam kegiatan seni rupa',
    },
  },
  {
    caption: 'Pojok baca',
    photo: {
      ...unsplashImage({
        id: 'photo-1574605026257-638651548eeb',
        width: 600,
        widths: [300, 600, 900],
      }),
      alt: 'Murid gemar membaca buku di pojok literasi',
    },
  },
  {
    caption: 'Guru yang mendampingi',
    photo: {
      ...unsplashImage({
        id: 'photo-1577896851231-70ef18881754',
        width: 600,
        widths: [300, 600, 900],
      }),
      alt: 'Guru mendampingi dan membimbing anak didik dengan ramah',
    },
  },
  {
    caption: 'Bermain di halaman',
    photo: {
      ...unsplashImage({
        id: 'photo-1666533835045-3a1b3dfc3538',
        width: 600,
        widths: [300, 600, 900],
      }),
      alt: 'Keceriaan anak-anak bermain bersama di halaman sekolah saat waktu istirahat',
    },
  },
  {
    caption: 'Belajar berkelompok',
    photo: {
      ...unsplashImage({
        id: 'photo-1542810634-71277d95dcbb',
        width: 600,
        widths: [300, 600, 900],
      }),
      alt: 'Kolaborasi dan kerja kelompok antarsiswa dalam memecahkan masalah',
    },
  },
]

/** TODO: ganti `href` dengan alamat berkas PDF masing-masing. */
export const DOWNLOADS: readonly DownloadFile[] = [
  { name: 'Brosur PPDB 2027/2028', href: '#' },
  { name: 'Kalender akademik', href: '#' },
  { name: 'Tata tertib sekolah', href: '#' },
]
