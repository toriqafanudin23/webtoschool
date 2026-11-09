import { ADMIN_API_URL } from '@/config/site'

/**
 * Mode demo: login sementara tanpa backend agar panel admin bisa dilihat dan dicoba,
 * termasuk setelah di-deploy. Aktif selama `ADMIN_API_URL` kosong (kecuali env
 * `VITE_ADMIN_DEMO=false` saat build untuk mematikannya).
 * Ini bukan keamanan: kredensial tampil di halaman login dan ada di kode sumber,
 * dan datanya hanya contoh. Begitu `ADMIN_API_URL` diisi, mode ini mati sendiri.
 */
export const DEMO_ENABLED = !ADMIN_API_URL && import.meta.env.VITE_ADMIN_DEMO !== 'false'

export const DEMO_CREDENTIALS = { email: 'admin@sdn1kembaran.test', password: 'demo-admin' } as const

const SESSION_KEY = 'admin-demo-session'

export function isDemoSignedIn(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function startDemoSession(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Penyimpanan diblokir: sesi demo tidak bisa dimulai.
  }
}

export function endDemoSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // Abaikan.
  }
}
