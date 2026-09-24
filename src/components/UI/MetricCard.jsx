import React from 'react'
import './MetricCard.css'

export default function MetricCard({ title, value, subtitle, trend, trendLabel, icon, color = 'primary', loading = false }) {
  const isPositive = trend > 0
  const isNeutral = trend === 0 || trend === undefined

  return (
    <div className={`metric-card metric-card--${color}`}>
      <div className="metric-card__header">
        <span className="metric-card__title">{title}</span>
        {icon && <div className="metric-card__icon">{icon}</div>}
      </div>

      {loading ? (
        <div className="metric-card__skeleton" />
      ) : (
        <>
          <div className="metric-card__value">{value}</div>
          <div className="metric-card__footer">
            {!isNeutral && (
              <span className={`metric-card__trend ${isPositive ? 'metric-card__trend--up' : 'metric-card__trend--down'}`}>
                {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {Math.abs(trend)}%
              </span>
            )}
            {subtitle && <span className="metric-card__subtitle">{subtitle}</span>}
            {trendLabel && <span className="metric-card__trend-label">{trendLabel}</span>}
          </div>
        </>
      )}
    </div>
  )
}

function ArrowUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  )
}
function ArrowDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
    </svg>
  )
}
