import { ArrowUpRight, Megaphone, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { ROUTES } from '@/config/navigation'
import { PPDB } from '@/config/site'
import { Container } from '@/components/ui/Container'

const DISMISS_KEY = 'announcement-dismissed'

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Pita kuning di paling atas: info periode PPDB dan pintasan cek status.
 * Bisa ditutup; pilihan disimpan di sessionStorage sehingga pita muncul lagi
 * pada kunjungan berikutnya (tab baru). Bila penyimpanan diblokir, penutupan
 * tetap berlaku di memori sampai halaman dimuat ulang.
 */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(readDismissed)

  if (dismissed) return null

  function dismiss() {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Abaikan: pita tetap tertutup selama halaman belum dimuat ulang.
    }
  }

  return (
    <div className="bg-accent text-[13px] font-semibold text-ink md:text-sm">
      <Container className="flex items-center justify-between gap-4 py-[9px] md:py-2.5">
        <p className="flex items-center gap-2">
          <Megaphone aria-hidden="true" className="size-4 shrink-0" />
          <span className="md:hidden">PPDB dibuka {PPDB.period}</span>
          <span className="hidden md:inline">
            PPDB {PPDB.year} dibuka {PPDB.period}
          </span>
        </p>

        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.admissionStatus}
            className="hidden items-center gap-1 underline underline-offset-4 hover:no-underline md:inline-flex"
          >
            Cek status pendaftaran
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>

          <button
            type="button"
            aria-label="Tutup pengumuman"
            onClick={dismiss}
            className="-my-1.5 -mr-1.5 grid size-8 shrink-0 place-items-center hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
          >
            <X aria-hidden="true" className="size-4" strokeWidth={2.6} />
          </button>
        </div>
      </Container>
    </div>
  )
}
