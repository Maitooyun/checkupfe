import { useNavigate, useLocation } from 'react-router-dom'

type SuccessState = {
  fullName?: string
  accountNumber?: string
}

export default function ReportSuccessPage() {
  const navigate = useNavigate()
  const state = (useLocation().state ?? {}) as SuccessState

  const name = state.fullName ?? ''

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-center flex-1 p-4 md:p-8">
        <div className="max-w-[800px] w-full">

          {/* Success Status Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-sm"
              style={{ backgroundColor: 'var(--color-tertiary-fixed)' }}
            >
              <span
                className="material-symbols-outlined text-5xl"
                style={{ color: 'var(--color-tertiary)', fontVariationSettings: '"FILL" 1' }}
              >
                check_circle
              </span>
            </div>
            <h2 className="text-3xl font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>
              ส่งรายงานสำเร็จเรียบร้อยแล้ว
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
              ขอบคุณที่ช่วยรักษาความปลอดภัยของระบบธนาคาร
            </p>
          </div>

          {/* Report Details Card */}
          <section
            className="rounded-xl overflow-hidden mb-8"
            style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-outline-variant)',
            }}
          >
            <div
              className="px-6 py-4 border-b"
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                borderColor: 'var(--color-outline-variant)',
              }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>
                รายละเอียดรายงานความปลอดภัย
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Account Holder Name
                </span>
                <p className="text-base font-bold" style={{ color: 'var(--color-on-surface)' }}>
                  {name || '—'}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Account Number
                </span>
                <p className="text-base font-bold font-mono tracking-widest" style={{ color: 'var(--color-primary)' }}>
                  {state.accountNumber || '—'}
                </p>
              </div>

              <div
                className="md:col-span-2 p-4 rounded-lg flex items-start gap-4"
                style={{
                  backgroundColor: 'rgba(255,218,214,0.2)',
                  border: '1px solid rgba(186,26,26,0.2)',
                }}
              >
                <span className="material-symbols-outlined mt-1" style={{ color: 'var(--color-error)' }}>
                  warning
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-error)' }}>
                    Report Status
                  </span>
                  <p className="text-base" style={{ color: 'var(--color-on-surface)' }}>
                    บัญชีนี้ถูกรายงานไปแล้วทั้งหมด{' '}
                    <strong style={{ color: 'var(--color-error)' }}>1 ครั้ง</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/report')}
              className="flex items-center justify-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ border: '1px solid var(--color-outline)', color: 'var(--color-primary)' }}
            >
              <span className="material-symbols-outlined">add_moderator</span>
              Submit Another Report
            </button>
          </div>

          {/* Dot grid decoration */}
          <div className="mt-20 flex justify-center">
            <div
              className="w-full h-32 rounded-2xl opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full py-4 px-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto"
        style={{
          backgroundColor: 'var(--color-surface-container-low)',
          borderColor: 'var(--color-outline-variant)',
          color: 'var(--color-on-surface-variant)',
        }}
      >
        <p className="text-xs">
          © 2024 Mule Bank Security. All rights reserved. Confidential and Proprietary.
        </p>
        <div className="flex gap-4">
          {['Privacy Policy', 'Terms of Service', 'Security Disclosure'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-semibold underline transition-colors hover:text-[#0058bc]"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
