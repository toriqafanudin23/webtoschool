import { Outlet, useLoaderData, useNavigate } from 'react-router'
import { ROUTES } from '@/config/navigation'
import { SITE } from '@/config/site'
import { ServiceUnavailableError } from '@/lib/errors'
import { signOut, type AdminSession } from '../api'
import { AdminMobileChrome } from './AdminMobileChrome'
import { AdminNav } from './AdminNav'

/**
 * Kerangka panel admin. Desktop (`lg`): sidebar navy 260px dan bilah atas putih.
 * Ponsel: bilah atas navy, tab bawah, dan menu layar penuh (AdminMobileChrome).
 */
export function AdminLayout() {
  const session = useLoaderData<AdminSession>()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      // Tanpa backend (mis. pratinjau) tidak ada sesi yang bisa dihapus; tetap kembali ke halaman login.
      if (!(error instanceof ServiceUnavailableError)) throw error
    }
    navigate(ROUTES.adminLogin)
  }

  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[260px_1fr]">
      <title>{`Panel admin | ${SITE.name}`}</title>
      <meta name="robots" content="noindex" />
      <a
        href="#konten-admin"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
      >
        Lewati ke konten utama
      </a>

      <aside className="sticky top-0 hidden h-dvh flex-col overflow-y-auto bg-ink text-white lg:flex">
        <div className="px-7 pt-7 pb-6">
          <p className="font-display text-2xl leading-[1.15]">{SITE.name}</p>
          <p className="mt-1 text-sm">Panel admin</p>
        </div>
        <AdminNav />
      </aside>

      <div className="min-w-0">
        <AdminMobileChrome onSignOut={handleSignOut} />

        <header className="hidden h-21 items-center justify-between gap-6 border-b border-line bg-white px-10 lg:flex">
          <input
            type="search"
            disabled
            aria-label="Cari berita, agenda, pendaftar"
            title="Pencarian segera hadir"
            placeholder="Cari berita, agenda, pendaftar"
            className="h-13.5 w-full max-w-90 border-2 border-ink bg-white px-3.5 text-base placeholder:text-muted/70 disabled:cursor-not-allowed"
          />
          <p className="flex items-center gap-3 whitespace-nowrap">
            <span>{session.name ?? '[Nama admin]'}</span>
            <button type="button" onClick={handleSignOut} className="font-bold underline underline-offset-4 hover:no-underline">
              Keluar
            </button>
          </p>
        </header>

        {session.isDemo && (
          <p role="status" className="bg-accent px-5 py-2 text-sm font-semibold text-ink lg:px-10">
            Mode demo: data hanya contoh dan tersimpan di browser ini saja. Perubahan belum tampil di website publik dan belum terhubung ke server.
          </p>
        )}

        <main id="konten-admin" className="px-5 pt-5 pb-24 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
