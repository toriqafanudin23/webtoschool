import { SITE } from '@/config/site'
import { AboutSection } from '@/features/home/components/AboutSection'
import { AcademicSection } from '@/features/home/components/AcademicSection'
import { HeadmasterWelcome } from '@/features/home/components/HeadmasterWelcome'
import { Hero } from '@/features/home/components/Hero'
import { NewsAgendaSection } from '@/features/home/components/NewsAgendaSection'
import { RegistrationCta } from '@/features/home/components/RegistrationCta'

export default function HomePage() {
  return (
    <>
      <title>{`${SITE.name} | ${SITE.tagline}`}</title>
      <Hero />
      <HeadmasterWelcome />
      <AboutSection />
      <AcademicSection />
      <NewsAgendaSection />
      <RegistrationCta />
    </>
  )
}
