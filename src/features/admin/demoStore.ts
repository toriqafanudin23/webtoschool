import type { DashboardData } from './api'
import { RESOURCES, type Item, type ResourceDef } from './resources'

/**
 * Penyimpanan MODE DEMO: data panel disimpan di localStorage browser ini saja (bukan di server,
 * dan belum memengaruhi website publik). Dibuang bersama demo.ts saat backend asli dipasang.
 */
const KEY = 'admin-demo-data-v1'
const ADMIN = 'Admin Demo'

interface Db {
  data: Record<string, Item[]>
  admissionOpen: boolean
  activity: { admin: string; action: string }[]
}

let memory: Db | undefined

function seed(): Db {
  return {
    data: Object.fromEntries(RESOURCES.map((r) => [r.key, r.seed.map((item) => ({ ...item }))])),
    admissionOpen: true,
    activity: [],
  }
}

function read(): Db {
  if (memory) return memory
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) memory = JSON.parse(raw) as Db
  } catch {
    // Penyimpanan diblokir atau rusak: pakai data contoh di memori.
  }
  return (memory ??= seed())
}

function write(db: Db, action?: string): void {
  if (action) db.activity = [{ admin: ADMIN, action }, ...db.activity].slice(0, 5)
  memory = db
  try {
    localStorage.setItem(KEY, JSON.stringify(db))
  } catch {
    // Penuh atau diblokir: perubahan tetap ada di memori sampai halaman dimuat ulang.
  }
}

const byDateDesc = (a: Item, b: Item) => (b.date ?? '').localeCompare(a.date ?? '')

export const demoList = (def: ResourceDef): Item[] => [...(read().data[def.key] ?? [])].sort(byDateDesc)

export function demoSave(def: ResourceDef, item: Item, isNew: boolean): void {
  const db = read()
  const list = db.data[def.key] ?? []
  db.data[def.key] = isNew ? [item, ...list] : list.map((current) => (current.id === item.id ? item : current))
  const published = item.status === 'terbit' ? 'Menerbitkan' : isNew ? 'Menambah' : 'Mengubah'
  write(db, `${published} ${def.singular}`)
}

export function demoRemove(def: ResourceDef, id: string): void {
  const db = read()
  db.data[def.key] = (db.data[def.key] ?? []).filter((item) => item.id !== id)
  write(db, `Menghapus ${def.singular}`)
}

export function demoSetAdmission(open: boolean): void {
  const db = read()
  db.admissionOpen = open
  write(db, open ? 'Membuka pendaftaran PPDB' : 'Menutup pendaftaran PPDB')
}

export function demoDashboard(): DashboardData {
  const { data, admissionOpen, activity } = read()
  const count = (key: string, test: (item: Item) => boolean) => (data[key] ?? []).filter(test).length
  const today = new Date().toISOString().slice(0, 10)
  const pending = count('admission', (p) => p.status === 'baru')
  const drafts = count('news', (n) => n.status === 'draf')
  return {
    pendingRegistrations: pending,
    publishedNews: count('news', (n) => n.status === 'terbit'),
    upcomingAgenda: count('agenda', (a) => (a.date ?? '') >= today),
    newMessages: 0,
    followUps: { pendingFiles: pending, draftNews: drafts, undatedAgenda: count('agenda', (a) => !a.date) },
    admission: { open: admissionOpen },
    activity,
  }
}
