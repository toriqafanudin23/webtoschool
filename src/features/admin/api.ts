import { ADMIN_API_URL } from '@/config/site'
import { ServiceUnavailableError } from '@/lib/errors'
import {
  DEMO_CREDENTIALS,
  DEMO_ENABLED,
  endDemoSession,
  isDemoSignedIn,
  startDemoSession,
} from './demo'
import { demoDashboard, demoList, demoRemove, demoSave, demoSetAdmission } from './demoStore'
import type { Item, ResourceDef } from './resources'

export interface Credentials {
  email: string
  password: string
  /** Pertahankan sesi di perangkat ini. */
  remember: boolean
}

/** Dilempar bila server menjawab bahwa email atau kata sandi tidak cocok. */
export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email atau kata sandi tidak cocok.')
  }
}

/**
 * Kontrak yang diharapkan: POST {ADMIN_API_URL}/auth/login (JSON) -> 2xx dan sesi dipasang server
 * lewat cookie HttpOnly (sengaja tanpa token di JavaScript); 401 bila tidak cocok.
 */
export async function signIn(credentials: Credentials): Promise<void> {
  if (DEMO_ENABLED) {
    const matches =
      credentials.email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password
    if (!matches) throw new InvalidCredentialsError()
    startDemoSession()
    return
  }
  if (!ADMIN_API_URL) throw new ServiceUnavailableError()

  let response: Response
  try {
    response = await fetch(`${ADMIN_API_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
  } catch {
    throw new ServiceUnavailableError()
  }

  if (response.status === 401) throw new InvalidCredentialsError()
  if (!response.ok) throw new ServiceUnavailableError()
}

export interface AdminSession {
  /** Nama admin untuk bilah atas; kosong pada mode pratinjau. */
  name?: string
  /** True pada sesi mode demo (lihat demo.ts): data hanya contoh. */
  isDemo?: boolean
}

export interface DashboardData {
  pendingRegistrations: number
  publishedNews: number
  upcomingAgenda: number
  newMessages: number
  followUps: { pendingFiles: number; draftNews: number; undatedAgenda: number }
  admission: { open: boolean }
  activity: readonly { admin: string; action: string }[]
}

export async function adminRequest(path: string, init?: RequestInit): Promise<Response> {
  if (!ADMIN_API_URL) throw new ServiceUnavailableError()
  try {
    return await fetch(`${ADMIN_API_URL}${path}`, { credentials: 'include', ...init })
  } catch {
    throw new ServiceUnavailableError()
  }
}

/**
 * GET {ADMIN_API_URL}/auth/me -> { name: string } | 401.
 * `null` berarti belum masuk.
 */
export async function fetchSession(): Promise<AdminSession | null> {
  if (DEMO_ENABLED) return isDemoSignedIn() ? { name: 'Admin Demo', isDemo: true } : null
  const response = await adminRequest('/auth/me')
  if (response.status === 401) return null
  if (!response.ok) throw new ServiceUnavailableError()
  return (await response.json()) as AdminSession
}

/** POST {ADMIN_API_URL}/auth/logout -> 2xx (server menghapus cookie sesi). */
export async function signOut(): Promise<void> {
  if (DEMO_ENABLED) return endDemoSession()
  const response = await adminRequest('/auth/logout', { method: 'POST' })
  if (!response.ok) throw new ServiceUnavailableError()
}

/** GET {ADMIN_API_URL}/dashboard -> DashboardData. */
export async function fetchDashboard(): Promise<DashboardData> {
  if (DEMO_ENABLED) return demoDashboard()
  const response = await adminRequest('/dashboard')
  if (!response.ok) throw new ServiceUnavailableError()
  return (await response.json()) as DashboardData
}

/** PATCH {ADMIN_API_URL}/admission { open: boolean } -> 2xx. */
export async function setAdmissionOpen(open: boolean): Promise<void> {
  if (DEMO_ENABLED) return demoSetAdmission(open)
  const response = await adminRequest('/admission', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ open }),
  })
  if (!response.ok) throw new ServiceUnavailableError()
}

/** GET {ADMIN_API_URL}/{key} -> Item[]. */
export async function listItems(def: ResourceDef): Promise<Item[]> {
  if (DEMO_ENABLED) return demoList(def)
  const response = await adminRequest(`/${def.key}`)
  if (!response.ok) throw new ServiceUnavailableError()
  return (await response.json()) as Item[]
}

/** Baru: POST {ADMIN_API_URL}/{key} (JSON, tanpa `id`) -> Item. Ubah: PUT {ADMIN_API_URL}/{key}/{id}. */
export async function saveItem(def: ResourceDef, item: Item, isNew: boolean): Promise<void> {
  if (DEMO_ENABLED) return demoSave(def, item, isNew)
  const response = await adminRequest(isNew ? `/${def.key}` : `/${def.key}/${item.id}`, {
    method: isNew ? 'POST' : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  if (!response.ok) throw new ServiceUnavailableError()
}

/** DELETE {ADMIN_API_URL}/{key}/{id} -> 2xx. */
export async function deleteItem(def: ResourceDef, id: string): Promise<void> {
  if (DEMO_ENABLED) return demoRemove(def, id)
  const response = await adminRequest(`/${def.key}/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new ServiceUnavailableError()
}
