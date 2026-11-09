import type { LucideIcon } from 'lucide-react'
import type { PhotoSource } from '@/components/ui/PhotoSlot'

export type StaffCategory = 'kepala-sekolah' | 'guru-kelas' | 'guru-mapel' | 'tendik'

export interface StaffMember {
  id: string
  name: string
  /** Jabatan yang ditampilkan di bawah nama. */
  role: string
  category: StaffCategory
  photo?: PhotoSource
}

export interface Facility {
  name: string
  /** Keterangan singkat satu kalimat. */
  description: string
  icon: LucideIcon
  /** Foto: berkas di `public/fasilitas/<nama>.jpg`. Bila berkas belum ada, tampil ikon sementara. */
  photo: PhotoSource
}

export interface FacilityGroup {
  title: string
  items: readonly Facility[]
}
