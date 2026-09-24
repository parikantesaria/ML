import React from 'react'
import { useLocation } from 'react-router-dom'
import './Header.css'

const ROUTE_TITLES = {
  '/':            { title: 'Credit Risk Overview',            subtitle: 'Monitor loan applications, borrower risk and model performance' },
  '/predict':     { title: 'Loan Default Predictor',          subtitle: 'Assess borrower risk using our trained ML model' },
  '/analytics':   { title: 'Risk Analytics',                  subtitle: 'Explore patterns in loan default across key variables' },
  '/applications':{ title: 'Applications Explorer',           subtitle: 'Browse and search historical loan records with all 16 ML model features' },
  '/features':    { title: 'Feature Importance & Explainability', subtitle: 'Relative SHAP impact of features in the credit risk classifier' },
  '/performance': { title: 'Model Performance & Evaluation',   subtitle: 'Evaluate classification metrics for the trained model' },
  '/settings':    { title: 'Settings',                         subtitle: 'Manage API connection endpoints, risk decision thresholds, and model parameters' },
}

export default function Header({ onToggleSidebar, onToggleMobile }) {
  const location = useLocation()
  const page = ROUTE_TITLES[location.pathname] || ROUTE_TITLES['/']

  return (
    <header className="header">
      {/* Left */}
      <div className="header__left">
        <button className="header__menu-btn header__menu-btn--desktop" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <MenuIcon />
        </button>
        <button className="header__menu-btn header__menu-btn--mobile" onClick={onToggleMobile} aria-label="Open navigation">
          <MenuIcon />
        </button>

        <div className="header__page-info">
          <h1 className="header__page-title">{page.title}</h1>
          <p className="header__page-subtitle">{page.subtitle}</p>
        </div>
      </div>

      {/* Right */}
      <div className="header__right">
        <div className="header__status">
          <span className="header__status-dot" />
          <span className="header__status-text">Model Active</span>
        </div>

        <button className="header__icon-btn" aria-label="Notifications">
          <BellIcon />
        </button>

        <div className="header__user">
          <div className="header__user-avatar">AC</div>
        </div>
      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

