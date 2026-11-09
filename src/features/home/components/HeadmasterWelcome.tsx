import { Button } from '@/components/ui/Button'
import { PhotoSlot } from '@/components/ui/PhotoSlot'
import { Section } from '@/components/ui/Section'
import { ROUTES } from '@/config/navigation'
import { HEADMASTER, HEADMASTER_PHOTO, HEADMASTER_WELCOME } from '../content'

/** Sambutan kepala sekolah, tepat di bawah hero. Ponsel: foto lalu teks. Desktop: foto di kiri. */
export function HeadmasterWelcome() {
  const [opening, ...rest] = HEADMASTER_WELCOME

  return (
    <Section title="Sambutan kepala sekolah" id="sambutan">
      <div className="md:grid md:grid-cols-[15rem_1fr] md:gap-10">
        <figure>
          <PhotoSlot
            photo={HEADMASTER_PHOTO}
            placeholder="[Foto Kepala Sekolah]"
            className="h-72 w-full max-w-60 md:h-80"
          />
          <figcaption className="mt-3">
            <strong className="block">{HEADMASTER.name}</strong>
            <span className="text-sm text-muted md:text-base">{HEADMASTER.role}</span>
          </figcaption>
        </figure>

        <div className="mt-6 md:mt-0">
          <p className="font-display text-2xl leading-[1.35] md:text-[32px] md:leading-[1.3]">
            {opening}
          </p>
          <div className="mt-5 space-y-4 text-muted md:mt-6 md:text-lg">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-6 md:mt-8">
            <Button to={ROUTES.profile} variant="outlineDark" withArrow>
              Kenali sekolah kami
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
