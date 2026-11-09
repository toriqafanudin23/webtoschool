import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { cn } from '@/lib/cn'
import { ServiceUnavailableError } from '@/lib/errors'
import { formatDate } from '@/lib/format'
import { deleteItem, listItems, saveItem } from '../api'
import { labelOf, type Item, type ResourceDef } from '../resources'
import { ConfirmDialog } from './ConfirmDialog'
import { ItemDialog } from './ItemDialog'

interface ResourceManagerProps {
  def: ResourceDef
  /** Dibuka langsung dalam keadaan tambah baru (rute `/baru` dan `/unggah`). */
  startNew?: boolean
  /** Dipanggil saat dialog tambah dari rute `/baru` ditutup. */
  onLeaveNew?: () => void
}

type Load = 'loading' | 'ready' | 'unavailable'
type Editing = Item | 'new' | null

const BADGE: Record<string, string> = { draf: 'bg-accent', baru: 'bg-accent', ditolak: 'bg-danger text-white' }

function cell(def: ResourceDef, item: Item, name: string): string {
  const field = def.fields.find((f) => f.name === name)
  const value = item[name] ?? ''
  if (!value) return ''
  if (field?.kind === 'date') return /^\d{4}-\d{2}-\d{2}$/.test(value) ? formatDate(value) : value
  return labelOf(field, value)
}

function exportCsv(def: ResourceDef, items: readonly Item[]): void {
  const quote = (v: string) => `"${v.replaceAll('"', '""')}"`
  const rows = [def.fields.map((f) => f.label), ...items.map((i) => def.fields.map((f) => labelOf(f, i[f.name] ?? '')))]
  const blob = new Blob(['\ufeff' + rows.map((r) => r.map(quote).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${def.key}-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(link.href)
}

/** Daftar + cari + saring + tambah/ubah/hapus untuk satu modul; semua dibentuk dari `ResourceDef`. */
export function ResourceManager({ def, startNew, onLeaveNew }: ResourceManagerProps) {
  const [items, setItems] = useState<Item[]>([])
  const [load, setLoad] = useState<Load>('loading')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [editing, setEditing] = useState<Editing>(startNew && def.canCreate ? 'new' : null)
  const [deleting, setDeleting] = useState<Item | null>(null)
  const [deleteError, setDeleteError] = useState<string>()
  const [pending, setPending] = useState(false)

  const reload = useCallback(async () => {
    try {
      setItems(await listItems(def))
      setLoad('ready')
    } catch (error) {
      if (!(error instanceof ServiceUnavailableError)) throw error
      setLoad('unavailable')
    }
  }, [def])

  useEffect(() => {
    // Memuat data awal; `reload` mengatur state setelah permintaan selesai.
    void reload()
  }, [reload])

  const statusField = def.fields.find((f) => f.name === def.statusField)
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (item) =>
        (!status || item[def.statusField ?? ''] === status) &&
        (!q || def.fields.some((f) => f.kind !== 'image' && (item[f.name] ?? '').toLowerCase().includes(q))),
    )
  }, [items, query, status, def])

  const closeEditor = () => {
    if (editing === 'new' && startNew) onLeaveNew?.()
    setEditing(null)
  }

  const handleSave = async (item: Item) => {
    await saveItem(def, item, editing === 'new')
    await reload()
    closeEditor()
  }

  const handleDelete = async () => {
    if (!deleting) return
    setPending(true)
    setDeleteError(undefined)
    try {
      await deleteItem(def, deleting.id)
      await reload()
      setDeleting(null)
    } catch (error) {
      if (!(error instanceof ServiceUnavailableError)) throw error
      setDeleteError('Belum terhapus karena server tidak bisa dihubungi. Coba lagi nanti.')
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 lg:mb-6">
        <h1 className="text-[32px] leading-[1.2] lg:text-[40px]">{def.title}</h1>
        <div className="flex flex-wrap gap-3">
          {def.exportable && (
            <Button variant="outlineDark" size="sm" disabled={items.length === 0} onClick={() => exportCsv(def, items)}>
              Ekspor CSV
            </Button>
          )}
          {def.canCreate && (
            <Button variant="dark" size="sm" onClick={() => setEditing('new')}>
              Tambah {def.singular}
            </Button>
          )}
        </div>
      </div>

      {load === 'unavailable' && (
        <p role="status" className="mb-5 border-l-4 border-brand bg-surface p-3.5 text-[15px]">
          Data belum terhubung ke server, jadi daftar belum tampil.
        </p>
      )}

      <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <TextField label="Cari" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        {statusField && (
          <label className="block">
            <span className="mb-1.5 block text-[15px] font-bold">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block h-12 w-full border-2 border-ink bg-white px-3.5 text-base md:w-56"
            >
              <option value="">Semua</option>
              {statusField.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <section aria-label={def.title} className="border border-line bg-white px-5 lg:px-6">
        {load === 'loading' ? (
          <p className="py-5 text-muted">Memuat…</p>
        ) : visible.length === 0 ? (
          <p className="py-5 text-muted">{items.length === 0 ? def.empty : 'Tidak ada yang cocok dengan pencarian.'}</p>
        ) : (
          <ul>
            {visible.map((item) => {
              const badge = def.statusField ? item[def.statusField] : ''
              const thumb = item.imageUrl
              const meta = def.metaFields.map((name) => cell(def, item, name)).filter(Boolean).join(' · ')
              return (
                <li key={item.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line py-4 first:border-t-0">
                  {thumb && <img src={thumb} alt="" className="size-14 shrink-0 object-cover" />}
                  <div className="min-w-0 flex-1 basis-56">
                    <strong className="block break-words">{item[def.titleField]}</strong>
                    {meta && <span className="text-sm text-muted">{meta}</span>}
                  </div>
                  {badge && (
                    <span className={cn('px-2.5 py-1 text-sm font-bold', BADGE[badge] ?? 'bg-surface')}>
                      {labelOf(statusField, badge)}
                    </span>
                  )}
                  <div className="flex gap-5">
                    <button type="button" onClick={() => setEditing(item)} className="font-bold underline underline-offset-4 hover:no-underline">
                      Ubah<span className="sr-only"> {item[def.titleField]}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteError(undefined)
                        setDeleting(item)
                      }}
                      className="font-bold text-danger underline underline-offset-4 hover:no-underline"
                    >
                      Hapus<span className="sr-only"> {item[def.titleField]}</span>
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      {editing && (
        <ItemDialog
          key={editing === 'new' ? 'new' : editing.id}
          def={def}
          item={editing === 'new' ? undefined : editing}
          onSave={handleSave}
          onClose={closeEditor}
        />
      )}

      <ConfirmDialog
        open={deleting !== null}
        title={`Hapus ${def.singular}?`}
        description={`"${deleting?.[def.titleField] ?? ''}" akan dihapus dan tidak bisa dikembalikan.`}
        confirmLabel={`Hapus ${def.singular}`}
        pending={pending}
        error={deleteError}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </>
  )
}
