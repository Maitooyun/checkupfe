import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FormState = {
  fullName: string
  accountNumber: string
  incidentContext: string
}

export default function ReportFormPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({
    fullName: '',
    accountNumber: '',
    incidentContext: '',
  })

  const canSubmit = form.fullName.trim() !== '' && form.accountNumber.trim() !== ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/report/success', {
      state: {
        fullName: form.fullName,
        accountNumber: form.accountNumber,
      },
    })
  }

  return (
    <div className="flex flex-col flex-1 relative">
      {/* Background decorative gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[800px] mx-auto w-full px-4 md:px-8 py-8 flex-1">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold leading-10 mb-2">Submit a Mule Account Report</h1>
          <p className="text-lg leading-7 max-w-2xl" style={{ color: 'var(--color-on-surface-variant)' }}>
            Please provide the details of the suspicious bank account. Your report helps keep the banking system secure.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Account Holder Details — Full Name + Account Number */}
          <Card>
            <SectionHeader icon="person" label="Account Holder Details" />
            <div className="space-y-4">
              <Field label="Full Name" required>
                <TextInput
                  placeholder="Enter full name"
                  value={form.fullName}
                  onChange={(v) => setForm({ ...form, fullName: v })}
                />
              </Field>
              <Field label="Account Number" required>
                <TextInput
                  placeholder="Enter account number"
                  value={form.accountNumber}
                  onChange={(v) => setForm({ ...form, accountNumber: v.replace(/\D/g, '') })}
                  inputMode="numeric"
                  mono
                />
              </Field>
            </div>
          </Card>

          {/* Incident Context */}
          <Card>
            <SectionHeader icon="description" label="Incident Context" />
            <textarea
              rows={4}
              placeholder="Briefly describe why this account is suspicious (optional)..."
              value={form.incidentContext}
              onChange={(e) => setForm({ ...form, incidentContext: e.target.value })}
              className="w-full rounded-lg px-3 py-3 text-sm outline-none resize-none"
              style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                color: 'var(--color-on-surface)',
              }}
              onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px var(--color-primary)')}
              onBlur={(e) => (e.target.style.boxShadow = 'none')}
            />
          </Card>

          {/* Submit */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
            <div />
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 rounded-lg text-sm font-semibold shadow-lg transition-all active:scale-95 duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 hover:enabled:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
            >
              Report Account
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer
        className="w-full py-8 px-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto"
        style={{ backgroundColor: 'var(--color-surface-container)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface-variant)' }}
      >
        <div className="max-w-xl">
          <div className="text-sm font-bold mb-1" style={{ color: 'var(--color-on-surface)' }}>
            Mule Bank Account Reporting System
          </div>
          <p className="text-xs">
            © 2024 Mule Bank Account Reporting System. All information is user-reported and does not constitute legal confirmation of wrongdoing.
          </p>
        </div>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Security Disclosure'].map((link) => (
            <a key={link} href="#" className="text-xs transition-colors hover:text-[#0058bc]">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-8 rounded-xl flex flex-col gap-4 shadow-sm"
      style={{
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-outline-variant)',
      }}
    >
      {children}
    </div>
  )
}

function SectionHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>
        {label} {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function TextInput({
  placeholder, value, onChange, inputMode, mono = false,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  mono?: boolean
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      inputMode={inputMode}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full rounded-lg px-3 py-3 text-sm outline-none ${mono ? 'font-mono tracking-widest' : ''}`}
      style={{
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1px solid var(--color-outline-variant)',
        color: 'var(--color-on-surface)',
      }}
      onFocus={(e) => (e.target.style.boxShadow = '0 0 0 1px var(--color-primary)')}
      onBlur={(e) => (e.target.style.boxShadow = 'none')}
    />
  )
}
