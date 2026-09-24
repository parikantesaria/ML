import React from 'react'
import './RiskBadge.css'

const CONFIG = {
  Low:    { label: 'Low Risk',    className: 'risk-badge--low' },
  Medium: { label: 'Medium Risk', className: 'risk-badge--medium' },
  High:   { label: 'High Risk',   className: 'risk-badge--high' },
  'Low Risk':    { label: 'Low Risk',    className: 'risk-badge--low' },
  'Medium Risk': { label: 'Medium Risk', className: 'risk-badge--medium' },
  'High Risk':   { label: 'High Risk',   className: 'risk-badge--high' },
}

export default function RiskBadge({ level, size = 'sm' }) {
  const config = CONFIG[level] || { label: level, className: 'risk-badge--neutral' }
  return (
    <span className={`risk-badge risk-badge--${size} ${config.className}`}>
      <span className="risk-badge__dot" />
      {config.label}
    </span>
  )
}
