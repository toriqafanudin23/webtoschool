import type { ChipOption } from '@/components/ui/FilterChips'
import type { KeyValue } from '@/components/ui/KeyValueList'
import type { SectionLink } from '@/components/ui/SectionNav'

/**
 * TODO: ganti nilai berkurung siku dengan data resmi sekolah (sengaja tidak diisi data karangan).
 * Program unggulan memakai `ACADEMIC_PROGRAMS` dari features/home/content.ts agar
 * Beranda dan halaman Akademik selalu sama.
 */

/** Urutan di sini = urutan section di halaman = urutan tautan sub-menu. */
export const ACADEMIC_SECTIONS: readonly SectionLink[] = [
  { id: 'kurikulum', label: 'Kurikulum' },
  { id: 'program', label: 'Program unggulan', shortLabel: 'Program' },
  { id: 'ekstrakurikuler', label: 'Ekstrakurikuler' },
  { id: 'kalender', label: 'Kalender akademik', shortLabel: 'Kalender' },
  { id: 'jadwal', label: 'Jadwal pelajaran', shortLabel: 'Jadwal' },
]

export const CURRICULUM_STATEMENT =
  'SDN 1 Kembaran memakai Kurikulum Merdeka: pembelajaran berdiferensiasi yang memberi ruang bagi minat dan bakat setiap murid.'

export const CURRICULUM_PHASES: readonly KeyValue[] = [
  { label: 'Fase A', value: 'Kelas 1 dan 2' },
  { label: 'Fase B', value: 'Kelas 3 dan 4' },
  { label: 'Fase C', value: 'Kelas 5 dan 6' },
]

export const CURRICULUM_SUBJECTS_NOTE = 'Mata pelajaran: [sesuaikan dengan struktur kurikulum sekolah]'

export const EXTRACURRICULARS: readonly KeyValue[] = [
  { label: 'Pramuka', value: '[Hari dan jam]' },
  { label: 'Seni', value: '[Hari dan jam]' },
  { label: 'Olahraga', value: '[Hari dan jam]' },
]

export const ACADEMIC_CALENDAR: readonly KeyValue[] = [
  { label: 'Semester ganjil', value: '[tgl] sampai [tgl]' },
  { label: 'Pembagian rapor', value: '18 Des 2026' },
  { label: 'Semester genap', value: '[tgl] sampai [tgl]' },
]

/** TODO: ganti dengan alamat berkas PDF kalender akademik. */
export const CALENDAR_PDF_URL = '#'

/** TODO: ganti dengan alamat halaman daftar kegiatan ekstrakurikuler lengkap. */
export const EXTRACURRICULAR_LIST_URL = '#'

export type ClassGrade = '1' | '2' | '3' | '4' | '5' | '6'

export const CLASS_OPTIONS: readonly ChipOption<ClassGrade>[] = (
  ['1', '2', '3', '4', '5', '6'] as const
).map((grade) => ({ value: grade, label: `Kelas ${grade}` }))
