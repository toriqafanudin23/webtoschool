import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { IconTile } from '@/components/ui/IconTile'
import type { PhotoSource } from '@/components/ui/PhotoSlot'
import { Section } from '@/components/ui/Section'
import { FACILITY_GROUPS } from '../content'

interface FacilityPhotoProps {
  photo: PhotoSource
  icon: LucideIcon
}

/** Foto 4:3. Bila berkas foto belum ada (atau gagal dimuat), tampil ikon sementara dengan ukuran yang sama. */
function FacilityPhoto({ photo, icon }: FacilityPhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={photo.alt}
        className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-surface text-muted"
      >
        <IconTile icon={icon} />
        <span className="text-xs">Foto segera ditambahkan</span>
      </div>
    )
  }

  return (
    <div className="aspect-[4/3] bg-accent">
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="size-full object-cover"
      />
    </div>
  )
}

/** Sarana dan prasarana: dua kelompok, tiap item berupa kartu foto dengan nama dan keterangan. */
export function FacilitiesSection() {
  return (
    <Section title="Sarana dan prasarana" id="fasilitas">
      <div className="space-y-8 md:space-y-10">
        {FACILITY_GROUPS.map(({ title, items }) => (
          <div key={title}>
            <h3 className="mb-4 text-xl md:text-2xl">{title}</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-8">
              {items.map(({ name, description, icon, photo }) => (
                <li key={name}>
                  <FacilityPhoto photo={photo} icon={icon} />
                  <strong className="mt-2 block leading-snug md:mt-2.5">{name}</strong>
                  <span className="text-sm text-muted md:text-base">{description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
