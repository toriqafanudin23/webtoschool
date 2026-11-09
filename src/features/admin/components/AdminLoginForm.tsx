import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { ROUTES } from '@/config/navigation'
import { ServiceUnavailableError } from '@/lib/errors'
import { isEmail } from '@/lib/validators'
import { InvalidCredentialsError, signIn } from '../api'
import { DEMO_CREDENTIALS, DEMO_ENABLED } from '../demo'

type Errors = { email?: string; password?: string }
type Failure = 'invalid' | 'unavailable' | undefined

const validateEmail = (value: string) =>
  !value.trim() ? 'Isi email dulu.' : !isEmail(value) ? 'Isi email yang benar. Contoh: nama@email.com.' : undefined
const validatePassword = (value: string) => (!value ? 'Isi kata sandi dulu.' : undefined)

export function AdminLoginForm() {
  const navigate = useNavigate()
  const rememberId = useId()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [failure, setFailure] = useState<Failure>()
  const [isSending, setIsSending] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found: Errors = { email: validateEmail(email), password: validatePassword(password) }
    setErrors(found)
    if (found.email || found.password) {
      event.currentTarget.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setFailure(undefined)
    setIsSending(true)
    try {
      await signIn({ email: email.trim(), password, remember })
      navigate(ROUTES.adminDashboard)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) setFailure('invalid')
      else if (error instanceof ServiceUnavailableError) setFailure('unavailable')
      else throw error
      setIsSending(false)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <h1 className="mb-6 text-[28px] leading-[1.2] md:text-4xl">Masuk ke panel admin</h1>

      {DEMO_ENABLED && (
        <div className="mb-5 border-l-4 border-accent bg-surface p-3.5 text-[15px]">
          <p className="font-bold">Akun demo sementara</p>
          <p>
            Email: <code className="break-all">{DEMO_CREDENTIALS.email}</code>
          </p>
          <p>
            Kata sandi: <code>{DEMO_CREDENTIALS.password}</code>
          </p>
          <p className="mt-1 text-muted">Hanya untuk mencoba tampilan. Datanya contoh.</p>
          <button
            type="button"
            onClick={() => {
              setEmail(DEMO_CREDENTIALS.email)
              setPassword(DEMO_CREDENTIALS.password)
              setErrors({})
              setFailure(undefined)
            }}
            className="mt-2 font-bold underline underline-offset-4 hover:no-underline"
          >
            Isi otomatis
          </button>
        </div>
      )}

      <div className="grid gap-5">
        <TextField
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          error={errors.email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (errors.email && !validateEmail(event.target.value)) setErrors((c) => ({ ...c, email: undefined }))
          }}
          onBlur={() => setErrors((c) => ({ ...c, email: validateEmail(email) }))}
        />
        <TextField
          label="Kata sandi"
          type="password"
          autoComplete="current-password"
          value={password}
          error={errors.password}
          onChange={(event) => {
            setPassword(event.target.value)
            if (errors.password && !validatePassword(event.target.value)) {
              setErrors((c) => ({ ...c, password: undefined }))
            }
          }}
          onBlur={() => setErrors((c) => ({ ...c, password: validatePassword(password) }))}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          id={rememberId}
          type="checkbox"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
          className="size-6 shrink-0 cursor-pointer accent-ink"
        />
        <label htmlFor={rememberId} className="cursor-pointer">
          Ingat saya di perangkat ini
        </label>
      </div>

      <div aria-live="polite">
        {failure === 'invalid' && (
          <p className="mt-5 border-l-4 border-danger bg-surface p-3.5 text-[15px]">
            Email atau kata sandi belum cocok. Periksa lagi, lalu coba masuk kembali.
          </p>
        )}
        {failure === 'unavailable' && (
          <p className="mt-5 border-l-4 border-danger bg-surface p-3.5 text-[15px]">
            Login admin belum aktif, jadi Anda belum bisa masuk. Hubungi pengelola website sekolah.
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSending} className="mt-5 md:w-full">
        {isSending ? 'Memeriksa…' : 'Masuk'}
      </Button>

      <p className="mt-5">
        <button
          type="button"
          aria-expanded={showReset}
          onClick={() => setShowReset((open) => !open)}
          className="font-bold underline underline-offset-4 hover:no-underline"
        >
          Lupa kata sandi?
        </button>
      </p>
      {showReset && (
        <p className="mt-2 text-muted">
          Minta pengelola website sekolah untuk mengatur ulang kata sandi Anda.
        </p>
      )}
    </form>
  )
}
