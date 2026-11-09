import { ExternalLink, MapPin, Navigation } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { MAP } from '@/config/site'

const query = encodeURIComponent(MAP.query)

const MAP_LINK = MAP.placeUrl || `https://www.google.com/maps/search/?api=1&query=${query}`
const DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${query}`
const EMBED_SRC = MAP.embedUrl || `https://www.google.com/maps?q=${query}&output=embed`

/** Peta tertanam (dimuat saat mendekati layar) dengan tombol cadangan bila peta gagal tampil. */
export function LocationSection() {
  return (
    <Section title="Lokasi" id="lokasi">
      <div className="h-60 border-2 border-ink bg-surface md:h-90">
        <iframe
          title="Peta lokasi SDN 1 Kembaran"
          src={EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="size-full border-0"
        />
      </div>

      <div className="mt-4 grid gap-3 md:flex">
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'dark' })}
        >
          <MapPin aria-hidden="true" className="size-5 shrink-0" />
          Buka di Google Maps
          <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
          <span className="sr-only">(tab baru)</span>
        </a>
        <a
          href={DIRECTIONS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'outlineDark' })}
        >
          <Navigation aria-hidden="true" className="size-5 shrink-0" />
          Petunjuk arah
          <span className="sr-only">(tab baru)</span>
        </a>
      </div>
    </Section>
  )
}
