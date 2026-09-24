import React from 'react'
import RiskBadge from '../UI/RiskBadge'
import './RiskAssessment.css'

export default function RiskAssessment({ result, onReset }) {
  const { prediction, probability, riskLevel, confidence, modelVersion, timestamp } = result
  const isDefault = prediction === 1
  const pct = Math.round(probability * 100)
  const displayConfidence = confidence !== undefined
    ? Math.round(confidence * 100)
    : Math.round((isDefault ? probability : 1 - probability) * 100)

  const getGaugeColor = () => {
    if (probability < 0.30) return 'var(--color-success)'
    if (probability < 0.65) return 'var(--color-warning)'
    return 'var(--color-danger)'
  }

  const gaugeAngle = probability * 180 // 0 to 180 degrees

  return (
    <div className={`risk-assessment risk-assessment--${isDefault ? 'default' : 'no-default'}`}>
      {/* Verdict Banner */}
      <div className="risk-assessment__banner">
        <div className="risk-assessment__banner-icon">
          {isDefault ? <AlertIcon /> : <CheckIcon />}
        </div>
        <div className="risk-assessment__banner-content">
          <span className="risk-assessment__verdict">
            {isDefault ? 'Default Predicted' : 'No Default Predicted'}
          </span>
          <span className="risk-assessment__verdict-sub">
            {isDefault
              ? 'This borrower profile is associated with a high likelihood of loan default.'
              : 'This borrower profile meets the credit risk criteria for loan approval.'}
          </span>
        </div>
        <RiskBadge level={riskLevel} size="md" />
      </div>

      {/* Metrics Grid */}
      <div className="risk-assessment__metrics">
        {/* Probability Gauge */}
        <div className="risk-assessment__gauge-card">
          <span className="risk-assessment__metric-label">Probability of Default</span>
          <div className="risk-assessment__gauge">
            <svg viewBox="0 0 200 110" className="risk-assessment__gauge-svg">
              {/* Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Fill */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={getGaugeColor()}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(probability * 251.3).toFixed(1)} 251.3`}
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
              {/* Needle */}
              <line
                x1="100"
                y1="100"
                x2={100 + 60 * Math.cos((gaugeAngle - 180) * Math.PI / 180)}
                y2={100 + 60 * Math.sin((gaugeAngle - 180) * Math.PI / 180)}
                stroke="var(--color-text-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ transition: 'all 1s ease' }}
              />
              <circle cx="100" cy="100" r="5" fill="var(--color-text-primary)" />
              {/* Labels */}
              <text x="20" y="118" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">0%</text>
              <text x="180" y="118" fill="var(--color-text-muted)" fontSize="10" textAnchor="middle">100%</text>
            </svg>
            <div className="risk-assessment__gauge-value" style={{ color: getGaugeColor() }}>
              {pct}%
            </div>
          </div>
          <div className="risk-assessment__gauge-bar-wrap">
            <div
              className="risk-assessment__gauge-bar"
              style={{
                width: `${pct}%`,
                background: getGaugeColor(),
              }}
            />
          </div>
          <div className="risk-assessment__gauge-labels">
            <span style={{ color: 'var(--color-success)', fontSize: 'var(--text-xs)' }}>Low</span>
            <span style={{ color: 'var(--color-warning)', fontSize: 'var(--text-xs)' }}>Medium</span>
            <span style={{ color: 'var(--color-danger)', fontSize: 'var(--text-xs)' }}>High</span>
          </div>
        </div>

        {/* Stats */}
        <div className="risk-assessment__stats">
          <div className="risk-assessment__stat">
            <span className="risk-assessment__stat-label">Risk Level</span>
            <RiskBadge level={riskLevel} size="lg" />
          </div>
          <div className="risk-assessment__stat">
            <span className="risk-assessment__stat-label">Model Confidence</span>
            <span className="risk-assessment__stat-value">{displayConfidence}%</span>
          </div>
          <div className="risk-assessment__stat">
            <span className="risk-assessment__stat-label">Prediction</span>
            <span className={`risk-assessment__prediction-badge risk-assessment__prediction-badge--${isDefault ? 'default' : 'safe'}`}>
              {isDefault ? 'Default (1)' : 'No Default (0)'}
            </span>
          </div>
          <div className="risk-assessment__stat">
            <span className="risk-assessment__stat-label">Model Version</span>
            <span className="risk-assessment__stat-value risk-assessment__stat-value--mono">v{modelVersion}</span>
          </div>
          <div className="risk-assessment__stat">
            <span className="risk-assessment__stat-label">Assessed At</span>
            <span className="risk-assessment__stat-value risk-assessment__stat-value--mono">
              {new Date(timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="risk-assessment__notice">
        <InfoIcon />
        <p>
          This prediction is generated by the trained ML model using the provided borrower features.
          It should be used as one input in the credit decision process, not as a sole determinant.
        </p>
      </div>

      {/* Reset */}
      <div className="risk-assessment__footer">
        <button className="risk-assessment__new-btn" onClick={onReset}>
          <PlusIcon /> Assess Another Borrower
        </button>
      </div>
    </div>
  )
}

function AlertIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}
function InfoIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  )
}
