import React, { useState } from 'react'
import PredictionForm from '../components/Forms/PredictionForm'
import RiskAssessment from '../components/Forms/RiskAssessment'
import { predictLoanDefault } from '../services/api'
import './LoanPredictor.css'

export default function LoanPredictor() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const res = await predictLoanDefault(payload)
      setResult(res)
    } catch (e) {
      setError(e.message || 'Prediction failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="loan-predictor">
      {/* Left panel */}
      <div className="loan-predictor__form-panel">
        <div className="loan-predictor__panel-header">
          <div className="loan-predictor__panel-icon">
            <BrainIcon />
          </div>
          <div>
            <h2 className="loan-predictor__panel-title">Borrower Assessment</h2>
            <p className="loan-predictor__panel-sub">Enter borrower and loan information to generate a default risk prediction.</p>
          </div>
        </div>

        {/* Feature badge */}
        <div className="loan-predictor__feature-info">
          <InfoIcon />
          <span>16 features · Exact dataset field names · Backend-compatible payload</span>
        </div>

        {error && (
          <div className="loan-predictor__error" role="alert">
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        {result ? (
          <div className="loan-predictor__result-hint">
            <CheckIcon />
            Prediction complete — view result on the right panel.
            <button className="loan-predictor__new-link" onClick={handleReset}>Run new assessment</button>
          </div>
        ) : (
          <PredictionForm onSubmit={handleSubmit} loading={loading} />
        )}
      </div>

      {/* Right panel */}
      <div className="loan-predictor__result-panel">
        {loading && (
          <div className="loan-predictor__loading">
            <div className="loan-predictor__loading-spinner">
              <SpinnerBig />
            </div>
            <h3>Analysing Risk Profile</h3>
            <p>Running inference through the ML model…</p>
          </div>
        )}

        {!loading && !result && (
          <div className="loan-predictor__placeholder">
            <div className="loan-predictor__placeholder-icon">
              <ChartIcon />
            </div>
            <h3>Risk Assessment Result</h3>
            <p>Complete the borrower information form and click <strong>Assess Default Risk</strong> to generate a prediction.</p>
            <div className="loan-predictor__placeholder-steps">
              {['Fill borrower profile', 'Add employment details', 'Enter credit & loan data', 'Submit for assessment'].map((s, i) => (
                <div key={i} className="loan-predictor__placeholder-step">
                  <span className="loan-predictor__step-num">{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && result && (
          <RiskAssessment result={result} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}

function BrainIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a2.5 2.5 0 0 1 5 0c.95 0 1.84.26 2.6.7a5 5 0 0 1 2.4 5.8 5 5 0 0 1-4 8.5 5 5 0 0 1-9 0 5 5 0 0 1-4-8.5 5 5 0 0 1 2.4-5.8A5 5 0 0 1 9.5 2Z"/></svg>
}
function InfoIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
}
function AlertIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
}
function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function ChartIcon() {
  return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
}
function SpinnerBig() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.9s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
    </svg>
  )
}
