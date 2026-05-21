import { useState } from 'react'

type FormState = {
  firstName: string
  lastName: string
  accountNumber: string
  incidentContext: string
}

export default function ReportFormPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    accountNumber: '',
    incidentContext: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function reset() {
    setSubmitted(false)
    setForm({ firstName: '', lastName: '', accountNumber: '', incidentContext: '' })
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="max-w-[800px] mx-auto w-full px-4 md:px-8 py-8 flex-1">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold leading-10 mb-2">Submit a Mule Account Report</h1>
          <p className="text-lg leading-7 max-w-2xl" style={{ color: 'var(--color-on-surface-variant)' }}>
            Please provide the details of the suspicious bank account. Your report helps keep the banking system secure.
          </p>
        </div>

        {submitted ? (
          <div
            className="rounded-xl p-10 text-center shadow-sm"
            style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid var(--color-outline-variant)', backdropFilter: 'blur(8px)' }}
          >
            <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: 'var(--color-tertiary)' }}>
              check_circle
            </span>
            <h2 className="text-xl font-semibold mb-2">Report Submitted Successfully</h2>
            <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              Thank you. Your report has been received and will be reviewed.
            </p>
            <button
              onClick={reset}
              className="mt-6 px-8 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Account Holder Details */}
              <Card>
                <SectionHeader icon="person" label="Account Holder Details" />
                <div className="space-y-4">
                  <Field label="First Name" required>
                    <TextInput
                      placeholder="Enter first name"
                      value={form.firstName}
                      onChange={(v) => setForm({ ...form, firstName: v })}
                    />
                  </Field>
                  <Field label="Last Name" required>
                    <TextInput
                      placeholder="Enter last name"
                      value={form.lastName}
                      onChange={(v) => setForm({ ...form, lastName: v })}
                    />
                  </Field>
                </div>
              </Card>

              {/* Financial Information */}
              <Card leftAccent>
                <SectionHeader icon="account_balance" label="Financial Information" />
                <div className="flex flex-col justify-center flex-1 space-y-4">
                  <Field label="Bank Account Number" required>
                    <TextInput
                      placeholder="0000 0000 0000"
                      value={form.accountNumber}
                      onChange={(v) => setForm({ ...form, accountNumber: v.replace(/\D/g, '') })}
                      inputMode="numeric"
                      mono
                    />
                    <p className="mt-2 text-xs italic" style={{ color: 'var(--color-on-surface-variant)' }}>
                      Example: 1234567890 (Enter digits only)
                    </p>
                  </Field>
                </div>
              </Card>
            </div>

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
                onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
                onBlur={(e) => (e.target.style.boxShadow = 'none')}
              />
            </Card>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-10 py-4 rounded-lg text-sm font-semibold shadow-lg transition-all active:scale-95 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                Report Account
                <span className="material-symbols-outlined text-base">send</span>
              </button>
            </div>
          </form>
        )}
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

function Card({ children, leftAccent = false }: { children: React.ReactNode; leftAccent?: boolean }) {
  return (
    <div
      className="p-8 rounded-xl flex flex-col gap-4 shadow-sm"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-outline-variant)',
        ...(leftAccent ? { borderLeftWidth: '4px', borderLeftColor: 'var(--color-primary)' } : {}),
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
      onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
      onBlur={(e) => (e.target.style.boxShadow = 'none')}
    />
  )
}
