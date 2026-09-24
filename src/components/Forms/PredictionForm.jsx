import React, { useState } from 'react'
import { FEATURE_SECTIONS, getEmptyPayload } from '../../config/modelFeatures'
import FormField from './FormField'
import './PredictionForm.css'

function validatePayload(values) {
  const errors = {}
  Object.entries(FEATURE_SECTIONS).forEach(([, features]) => {
    features.forEach(f => {
      const val = values[f.key]
      if (f.required && (val === '' || val === undefined || val === null)) {
        errors[f.key] = `${f.label} is required`
      } else if (f.type === 'number' && val !== '') {
        const num = Number(val)
        if (isNaN(num)) {
          errors[f.key] = `${f.label} must be a number`
        } else if (f.min !== undefined && num < f.min) {
          errors[f.key] = `Minimum value is ${f.min}`
        } else if (f.max !== undefined && num > f.max) {
          errors[f.key] = `Maximum value is ${f.max}`
        }
      }
    })
  })
  return errors
}

export default function PredictionForm({ onSubmit, loading }) {
  const [values, setValues] = useState(getEmptyPayload)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }))
    if (touched[key]) {
      // Live re-validate touched field
      const feature = Object.values(FEATURE_SECTIONS).flat().find(f => f.key === key)
      if (feature) {
        const fieldErrors = validatePayload({ ...values, [key]: value })
        setErrors(prev => ({ ...prev, [key]: fieldErrors[key] }))
      }
    }
  }

  const handleBlur = (key) => {
    setTouched(prev => ({ ...prev, [key]: true }))
    const fieldErrors = validatePayload(values)
    setErrors(prev => ({ ...prev, [key]: fieldErrors[key] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Touch all fields
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    setTouched(allTouched)

    const validationErrors = validatePayload(values)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0]
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // Coerce numeric fields to numbers for the API payload
    const payload = Object.fromEntries(
      Object.entries(values).map(([k, v]) => {
        const feature = Object.values(FEATURE_SECTIONS).flat().find(f => f.key === k)
        return [k, feature?.type === 'number' ? Number(v) : v]
      })
    )

    onSubmit(payload)
  }

  const handleReset = () => {
    setValues(getEmptyPayload())
    setErrors({})
    setTouched({})
  }

  const sections = Object.entries(FEATURE_SECTIONS)
  const sectionIcons = {
    'Borrower Profile': <PersonIcon />,
    'Employment':       <WorkIcon />,
    'Credit Profile':   <CreditIcon />,
    'Loan Details':     <LoanIcon />,
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit} noValidate>
      <div className="prediction-form__sections">
        {sections.map(([sectionName, features]) => (
          <div key={sectionName} className="prediction-form__section">
            <div className="prediction-form__section-header">
              <span className="prediction-form__section-icon">
                {sectionIcons[sectionName]}
              </span>
              <h3 className="prediction-form__section-title">{sectionName}</h3>
              <span className="prediction-form__section-count">{features.length} fields</span>
            </div>

            <div className="prediction-form__grid">
              {features.map(feature => (
                <div
                  key={feature.key}
                  onBlur={() => handleBlur(feature.key)}
                >
                  <FormField
                    feature={feature}
                    value={values[feature.key]}
                    onChange={handleChange}
                    error={touched[feature.key] ? errors[feature.key] : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="prediction-form__actions">
        <button
          type="button"
          className="prediction-form__reset-btn"
          onClick={handleReset}
          disabled={loading}
        >
          Reset Form
        </button>
        <button
          type="submit"
          className="prediction-form__submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <SpinnerIcon />
              Analysing Risk…
            </>
          ) : (
            <>
              <BrainIcon />
              Assess Default Risk
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}
function WorkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  )
}
function CreditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  )
}
function LoanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )
}
function BrainIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0c.95 0 1.84.26 2.6.7a5 5 0 0 1 2.4 5.8 5 5 0 0 1-4 8.5 5 5 0 0 1-9 0 5 5 0 0 1-4-8.5 5 5 0 0 1 2.4-5.8A5 5 0 0 1 9.5 2Z"/>
    </svg>
  )
}
function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
      <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
    </svg>
  )
}
