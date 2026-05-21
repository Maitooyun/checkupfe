import { NavLink, Outlet, useLocation } from 'react-router-dom'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Chatbot',
  '/report': 'Report Form',
}

export default function Layout() {
  const location = useLocation()
  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Mule Bank'

  const navBase = 'flex items-center gap-4 px-4 py-4 text-sm font-semibold transition-all duration-200'
  const navActive = { backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)', borderLeft: '4px solid var(--color-primary-container)' }
  const navInactive = { color: 'rgba(255,255,255,0.8)' }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-on-surface)' }}>
      {/* Top App Bar */}
      <header
        className="sticky top-0 z-50 h-16 border-b md:hidden flex items-center px-4"
        style={{ backgroundColor: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)' }}
      >
        <span className="text-base font-bold" style={{ color: 'var(--color-on-surface)' }}>{pageTitle}</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — desktop */}
        <aside
          className="hidden md:flex flex-col w-[280px] shrink-0 h-screen sticky top-0"
          style={{ backgroundColor: 'var(--color-secondary)', borderRight: '1px solid var(--color-outline-variant)' }}
        >
          {/* Brand */}
          <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <h1 className="text-lg font-bold" style={{ color: 'var(--color-on-secondary)' }}>Mule Bank</h1>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-tertiary-fixed)' }}
              />
              <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.8)' }}>Verified Secure</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4">
            <NavLink
              to="/dashboard"
              className={navBase}
              style={({ isActive }) => isActive ? navActive : navInactive}
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>
            <NavLink
              to="/"
              end
              className={navBase}
              style={({ isActive }) => isActive ? navActive : navInactive}
            >
              <span className="material-symbols-outlined">chat_bubble</span>
              Chatbot
            </NavLink>
            <NavLink
              to="/report"
              className={navBase}
              style={({ isActive }) => isActive ? navActive : navInactive}
            >
              <span className="material-symbols-outlined">report</span>
              Report Form
            </NavLink>
          </nav>

          {/* Account status */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-on-primary-fixed-variant)' }}
              >
                <span className="material-symbols-outlined">shield</span>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-on-secondary)' }}>Account Status</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Protected by MuleGuard</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto flex flex-col" style={{ backgroundColor: 'var(--color-surface-bright)' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 border-t md:hidden z-50"
        style={{ backgroundColor: 'var(--color-surface-container-highest)', borderColor: 'var(--color-outline-variant)' }}
      >
        <NavLink
          to="/dashboard"
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
          })}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-semibold">Dashboard</span>
        </NavLink>
        <NavLink
          to="/"
          end
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
          })}
        >
          <span className="material-symbols-outlined">chat</span>
          <span className="text-[10px] font-semibold">Chatbot</span>
        </NavLink>
        <NavLink
          to="/report"
          className="flex flex-col items-center gap-1 transition-transform active:scale-90"
          style={({ isActive }) => ({
            color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
          })}
        >
          <span className="material-symbols-outlined">description</span>
          <span className="text-[10px] font-semibold">Report</span>
        </NavLink>
      </nav>
    </div>
  )
}
