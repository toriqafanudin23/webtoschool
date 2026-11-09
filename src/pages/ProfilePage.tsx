import { PageHero } from '@/components/layout/PageHero'
import { SectionNav } from '@/components/ui/SectionNav'
import { ROUTES } from '@/config/navigation'
import { SITE } from '@/config/site'
import { FacilitiesSection } from '@/features/profile/components/FacilitiesSection'
import { HistorySection } from '@/features/profile/components/HistorySection'
import { IdentitySection } from '@/features/profile/components/IdentitySection'
import { PROFILE_SECTIONS } from '@/features/profile/content'
import { StaffSection } from '@/features/profile/components/StaffSection'
import { VisionMissionSection } from '@/features/profile/components/VisionMissionSection'

export default function ProfilePage() {
  return (
    <>
      <title>{`Profil sekolah | ${SITE.name}`}</title>
      <PageHero
        breadcrumb={[{ label: 'Beranda', to: ROUTES.home }, { label: 'Profil sekolah' }]}
        title="Profil sekolah"
        description={`Sejarah, identitas, visi dan misi, guru, serta sarana dan prasarana ${SITE.name}.`}
      />
      <SectionNav sections={PROFILE_SECTIONS} label="Bagian profil" />
      <HistorySection />
      <IdentitySection />
      <VisionMissionSection />
      <StaffSection />
      <FacilitiesSection />
    </>
  )
}
