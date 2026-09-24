import React from 'react'
import './ChartCard.css'

export default function ChartCard({ title, subtitle, children, action, loading = false, className = '' }) {
  return (
    <div className={`chart-card ${className}`}>
      <div className="chart-card__header">
        <div className="chart-card__title-area">
          <h3 className="chart-card__title">{title}</h3>
          {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
        </div>
        {action && <div className="chart-card__action">{action}</div>}
      </div>

      <div className="chart-card__body">
        {loading ? (
          <div className="chart-card__skeleton">
            <div className="chart-card__skeleton-bars">
              {[60, 85, 45, 70, 90, 55, 75].map((h, i) => (
                <div key={i} className="chart-card__skeleton-bar" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        ) : children}
      </div>
    </div>
  )
}
