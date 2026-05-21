import { useState } from 'react'

type Severity = 'high' | 'medium' | 'low'

type Account = {
  name: string
  accountNumber: string
  reports: number
  remarks: string
  severity: Severity
}

const ACCOUNTS: Account[] = [
  { name: 'John Carter',    accountNumber: '098-X-XXX452', reports: 15, remarks: 'Suspicious transfer',                severity: 'high'   },
  { name: 'Eric Vault',     accountNumber: '402-X-XXX118', reports: 12, remarks: 'Fraud, Identity Theft',              severity: 'high'   },
  { name: 'Sarah Connor',   accountNumber: '154-X-XXX901', reports: 8,  remarks: 'Unusual high-value transactions',    severity: 'medium' },
  { name: 'Michael Scott',  accountNumber: '001-X-XXX763', reports: 5,  remarks: 'Multiple small transfers',           severity: 'medium' },
  { name: 'Alice Wong',     accountNumber: '223-X-XXX551', reports: 4,  remarks: 'Recent account activation',          severity: 'low'    },
  { name: 'Bob Miller',     accountNumber: '901-X-XXX234', reports: 4,  remarks: 'Rapid fund dispersal',               severity: 'low'    },
  { name: 'Charlie Davis',  accountNumber: '334-X-XXX882', reports: 3,  remarks: 'International wires',                severity: 'low'    },
  { name: 'Diana Prince',   accountNumber: '556-X-XXX771', reports: 3,  remarks: 'Identity verification pending',      severity: 'low'    },
  { name: 'Edward Norton',  accountNumber: '772-X-XXX109', reports: 2,  remarks: 'Suspicious login attempt',           severity: 'low'    },
  { name: 'Fiona Glenanne', accountNumber: '881-X-XXX663', reports: 2,  remarks: 'Frequent password resets',           severity: 'low'    },
]

const TOTAL_RESULTS = 128
const TOTAL_PAGES = 13

export default function DashboardPage() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = ACCOUNTS.filter(
    a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.accountNumber.includes(search),
  )

  return (
    <div className="flex flex-col flex-1">
      <div className="px-4 md:px-8 py-8 flex-1">
        {/* Page header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold leading-10 mb-1" style={{ color: 'var(--color-on-surface)' }}>
            ภาพรวมแผงควบคุม (Dashboard Overview)
          </h2>
          <p className="text-base" style={{ color: 'var(--color-on-surface-variant)' }}>
            ติดตามสถานะการรายงานและความปลอดภัยล่าสุดของระบบธนาคาร
          </p>
          <p className="text-sm mt-1 italic" style={{ color: 'var(--color-outline)' }}>
            * จำนวนการแจ้งเหตุเป็นยอดสะสมสำหรับแต่ละบัญชี
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="รายงานทั้งหมดวันนี้"
            value="1,284"
            icon="monitoring"
            trend="+12.5% เทียบกับเมื่อวาน"
            trendColor="var(--color-tertiary)"
            trendIcon="arrow_upward"
            valueColor="var(--color-primary)"
          />
          <StatCard
            label="บัญชีที่ถูกตรวจสอบ (Flagged)"
            value="42"
            icon="report_problem"
            trend="ต้องดำเนินการทันที 8 รายการ"
            trendColor="var(--color-error)"
            trendIcon="warning"
            valueColor="var(--color-error)"
            iconBg="rgba(186,26,26,0.08)"
            iconColor="var(--color-error)"
          />
          <StatCard
            label="จัดการเรียบร้อยแล้ว"
            value="1,156"
            icon="check_circle"
            trend="เวลาเฉลี่ยในการปิดเคส: 14 นาที"
            trendColor="var(--color-on-surface-variant)"
            trendIcon="schedule"
            valueColor="var(--color-tertiary)"
            iconBg="rgba(0,107,39,0.08)"
            iconColor="var(--color-tertiary)"
          />
        </div>

        {/* Table section */}
        <section
          className="rounded-xl overflow-hidden border"
          style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderColor: 'var(--color-outline-variant)' }}
        >
          {/* Toolbar */}
          <div
            className="px-6 py-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
            style={{ backgroundColor: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)' }}
          >
            <h3 className="text-xl font-semibold" style={{ color: 'var(--color-on-surface)' }}>
              รายชื่อบัญชีที่ถูกรายงานบ่อยที่สุด
            </h3>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative flex items-center">
                <span
                  className="material-symbols-outlined absolute left-3 pointer-events-none"
                  style={{ fontSize: '18px', color: 'var(--color-outline)' }}
                >
                  search
                </span>
                <input
                  className="pl-9 pr-4 py-1.5 text-sm rounded-lg border outline-none w-56 transition-shadow"
                  placeholder="ค้นหา"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    borderColor: 'var(--color-outline-variant)',
                    color: 'var(--color-on-surface)',
                  }}
                  onFocus={e => (e.target.style.boxShadow = '0 0 0 2px var(--color-primary)')}
                  onBlur={e => (e.target.style.boxShadow = 'none')}
                />
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ borderColor: 'var(--color-outline)', color: 'var(--color-on-surface)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>filter_list</span>
                กรองข้อมูล
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
                ส่งออกรายงาน
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ backgroundColor: 'rgba(242,244,247,0.6)' }}>
                  {[
                    'ชื่อบัญชี (ACCOUNT NAME)',
                    'เลขบัญชี (ACCOUNT NUMBER)',
                    'จำนวนการแจ้ง (REPORTS)',
                    'หมายเหตุ (REMARKS)',
                  ].map(h => (
                    <th
                      key={h}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-on-surface-variant)', borderBottom: '1px solid var(--color-outline-variant)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <AccountRow key={row.accountNumber} row={row} alt={i % 2 === 1} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-sm"
            style={{ borderColor: 'var(--color-outline-variant)', backgroundColor: 'var(--color-surface)' }}
          >
            <span style={{ color: 'var(--color-on-surface-variant)' }}>
              แสดง 1–10 จาก {TOTAL_RESULTS} รายการ
            </span>
            <div className="flex items-center gap-1">
              <PageButton
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                icon="chevron_left"
              />
              {[1, 2, 3].map(p => (
                <PageButton key={p} label={p} active={currentPage === p} onClick={() => setCurrentPage(p)} />
              ))}
              <span className="px-1 text-sm" style={{ color: 'var(--color-outline)' }}>...</span>
              <PageButton label={TOTAL_PAGES} active={currentPage === TOTAL_PAGES} onClick={() => setCurrentPage(TOTAL_PAGES)} />
              <PageButton
                onClick={() => setCurrentPage(p => Math.min(p + 1, TOTAL_PAGES))}
                disabled={currentPage === TOTAL_PAGES}
                icon="chevron_right"
              />
            </div>
          </div>
        </section>

        {/* Info section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security update */}
          <div
            className="p-8 rounded-xl relative overflow-hidden"
            style={{ backgroundColor: 'var(--color-secondary-container)' }}
          >
            <div className="relative z-10">
              <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-on-secondary-container)' }}>
                อัปเดตระบบรักษาความปลอดภัย
              </h4>
              <p className="text-base mb-6" style={{ color: 'var(--color-on-secondary-container)', opacity: 0.9 }}>
                เราได้เพิ่มฟีเจอร์การตรวจสอบด้วย AI สำหรับบัญชีม้าที่อาจเกิดขึ้น
                ระบบจะแจ้งเตือนอัตโนมัติหากพบพฤติกรรมการโอนเงินที่ผิดปกติในทันที
              </p>
              <button
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
              >
                อ่านรายละเอียดเพิ่มเติม
              </button>
            </div>
            <div
              className="absolute -right-10 -bottom-10 pointer-events-none select-none"
              style={{ opacity: 0.08 }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '200px', fontVariationSettings: '"wght" 200' }}>
                verified_user
              </span>
            </div>
          </div>

          {/* Article */}
          <div
            className="border rounded-xl p-8 flex items-center gap-6"
            style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderColor: 'var(--color-outline-variant)' }}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVE9_3E5bCEUodp27N3npF9eajADYt1H9ewXIUr9yxNkFYgurX08xXBlv4svLxNg9lqx8iOY4e7Am70OY2Tj_5wetfuO7MMH3liSoGg45fHMSA_TP_iwvR2Dkcy-2ZwGf9tolD7AGzjT2wL4QyOP5fXQYIFrucog_a10gStOXzDt6jSsKJ0UAiriwXSAFy-SvRtGAD7pJ7cZi8NWGFW4YsGiWh7Qzwhr-WoMe_6A7ZBBhPlxBMLOB6VvWiFTLCgHMoSuPc1kcKj0Q"
              alt="Bank Analyst"
              className="w-32 h-32 rounded-full object-cover shrink-0"
              style={{ filter: 'grayscale(1)' }}
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-primary)' }}>
                บทความเด่น
              </p>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>
                วิธีสังเกตบัญชีม้าสมัยใหม่
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                คู่มือการวิเคราะห์เส้นทางการเงินสำหรับเจ้าหน้าที่สืบสวนและธนาคารพาณิชย์
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full py-8 px-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 mt-auto"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'var(--color-outline-variant)',
          color: 'var(--color-on-surface-variant)',
        }}
      >
        <p className="text-xs">
          © 2024 Mule Bank Security. All rights reserved. Confidential and Proprietary.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Security Disclosure'].map(link => (
            <a key={link} href="#" className="text-xs transition-colors hover:text-[#0058bc]">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon, trend, trendColor, trendIcon, valueColor,
  iconBg = 'rgba(0,88,188,0.08)', iconColor = 'var(--color-primary)',
}: {
  label: string; value: string; icon: string
  trend: string; trendColor: string; trendIcon: string; valueColor: string
  iconBg?: string; iconColor?: string
}) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col justify-between border shadow-sm"
      style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderColor: 'var(--color-outline-variant)' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--color-on-surface-variant)' }}>{label}</p>
          <h3 className="text-5xl font-bold mt-2 leading-none" style={{ color: valueColor }}>{value}</h3>
        </div>
        <div className="p-2 rounded-lg" style={{ backgroundColor: iconBg }}>
          <span className="material-symbols-outlined" style={{ color: iconColor }}>{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: trendColor }}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{trendIcon}</span>
        <span>{trend}</span>
      </div>
    </div>
  )
}

function AccountRow({ row, alt }: { row: Account; alt: boolean }) {
  const countColor =
    row.severity === 'high' ? 'var(--color-error)' :
    row.severity === 'medium' ? 'var(--color-primary)' :
    'var(--color-on-surface-variant)'

  const barColor =
    row.severity === 'high' ? 'var(--color-error)' :
    row.severity === 'medium' ? 'var(--color-primary)' :
    'var(--color-on-surface-variant)'

  const barWidth = Math.round((row.reports / 15) * 100)

  return (
    <tr
      style={{ borderBottom: '1px solid var(--color-outline-variant)', cursor: 'default' }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container-low)')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center shrink-0"
            style={{ backgroundColor: alt ? 'rgba(63,96,140,0.1)' : 'rgba(0,88,188,0.1)' }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '16px', color: alt ? 'var(--color-secondary)' : 'var(--color-primary)' }}
            >
              person
            </span>
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--color-on-surface)' }}>{row.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-xs font-mono tracking-wider" style={{ color: 'var(--color-on-surface-variant)' }}>
          {row.accountNumber}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: countColor }}>{row.reports} ครั้ง</span>
          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-outline-variant)' }}>
            <div className="h-full rounded-full" style={{ width: `${barWidth}%`, backgroundColor: barColor }} />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-on-surface)' }}>{row.remarks}</td>
    </tr>
  )
}

function PageButton({
  label, active = false, disabled = false, onClick, icon,
}: {
  label?: number; active?: boolean; disabled?: boolean
  onClick?: () => void; icon?: string
}) {
  if (icon) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-8 h-8 flex items-center justify-center rounded border transition-colors disabled:opacity-40"
        style={{ borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)' }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{icon}</span>
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded text-sm font-semibold transition-colors"
      style={
        active
          ? { backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }
          : { color: 'var(--color-on-surface)' }
      }
    >
      {label}
    </button>
  )
}
