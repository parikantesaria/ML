import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

const NAV_ITEMS = [
  { id: 'overview',          path: '/',            label: 'Overview',           icon: <GridIcon /> },
  { id: 'loan-predictor',    path: '/predict',     label: 'Loan Predictor',     icon: <BrainIcon /> },
  { id: 'risk-analytics',    path: '/analytics',   label: 'Risk Analytics',     icon: <ChartIcon /> },
  { id: 'feature-importance',path: '/features',    label: 'Feature Importance', icon: <DatabaseIcon /> },
  { id: 'model-performance', path: '/performance', label: 'Model Performance',  icon: <CpuIcon /> },
  { id: 'settings',          path: '/settings',    label: 'Settings',           icon: <SettingsIcon /> },
]

export default function Sidebar({ collapsed, mobileOpen, onMobileClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path) => {
    navigate(path)
    if (onMobileClose) onMobileClose()
  }

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''} ${mobileOpen ? 'sidebar--mobile-open' : ''}`}>
      {/* Brand */}
      <div className="sidebar__brand" onClick={() => handleNav('/')}>
        <div className="sidebar__logo">
          <LogoIcon />
        </div>
        {!collapsed && (
          <div className="sidebar__brand-text">
            <span className="sidebar__brand-name">CrediSense</span>
            <span className="sidebar__brand-tag">Credit Risk Platform</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        <div className="sidebar__section-label">{!collapsed && 'PLATFORM'}</div>
        {NAV_ITEMS.slice(0, 5).map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={location.pathname === item.path}
            collapsed={collapsed}
            onClick={() => handleNav(item.path)}
          />
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar__bottom">
        <div className="sidebar__section-label">{!collapsed && 'ACCOUNT'}</div>
        {NAV_ITEMS.slice(5).map(item => (
          <NavItem
            key={item.id}
            item={item}
            active={location.pathname === item.path}
            collapsed={collapsed}
            onClick={() => handleNav(item.path)}
          />
        ))}

        {/* User card */}
        {!collapsed && (
          <div className="sidebar__user">
            <div className="sidebar__user-avatar">AC</div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Analyst</span>
              <span className="sidebar__user-role">Credit Risk Team</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

function NavItem({ item, active, collapsed, onClick }) {
  return (
    <button
      className={`sidebar__nav-item ${active ? 'sidebar__nav-item--active' : ''}`}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      aria-current={active ? 'page' : undefined}
    >
      <span className="sidebar__nav-icon">{item.icon}</span>
      {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
      {active && !collapsed && <span className="sidebar__nav-indicator" />}
    </button>
  )
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="7" fill="#1A56DB"/>
      <path d="M7 14L11 18L21 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 7L21 14L14 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  )
}
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  )
}
function BrainIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0c.95 0 1.84.26 2.6.7a5 5 0 0 1 2.4 5.8 5 5 0 0 1-4 8.5 5 5 0 0 1-9 0 5 5 0 0 1-4-8.5 5 5 0 0 1 2.4-5.8A5 5 0 0 1 9.5 2Z"/>
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )
}
function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12"/><line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  )
}
function DatabaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  )
}
function CpuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/>
      <line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/>
      <line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/>
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  )
}

