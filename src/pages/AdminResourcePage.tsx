import { useLocation, useNavigate } from 'react-router'
import { ResourceManager } from '@/features/admin/components/ResourceManager'
import type { ResourceDef } from '@/features/admin/resources'

/** Halaman modul admin. Rute `.../baru` dan `.../unggah` (pintasan dashboard) langsung membuka formulir tambah. */
export default function AdminResourcePage({ def }: { def: ResourceDef }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const startNew = /\/(baru|unggah)$/.test(pathname)

  return (
    <ResourceManager
      key={def.key}
      def={def}
      startNew={startNew}
      onLeaveNew={() => navigate(`/admin/${def.path}`, { replace: true })}
    />
  )
}
