import React from 'react'
import './FormField.css'

export default function FormField({ feature, value, onChange, error, readOnly }) {
  const { key, label, inputType, placeholder, min, max, step, options, hint, required, isAutoCalculated } = feature

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      <label className="form-field__label" htmlFor={key}>
        {label}
        {isAutoCalculated && <span className="form-field__auto-tag">Auto</span>}
        {required && <span className="form-field__required" aria-hidden="true">*</span>}
      </label>

      {inputType === 'select' ? (
        <select
          id={key}
          name={key}
          value={value}
          onChange={e => onChange(key, e.target.value)}
          className="form-field__input form-field__select"
          required={required}
          aria-describedby={hint ? `${key}-hint` : undefined}
        >
          <option value="">Select {label}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={key}
          type={inputType}
          name={key}
          value={value}
          onChange={e => onChange(key, e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          required={required}
          readOnly={readOnly || isAutoCalculated}
          className={`form-field__input ${isAutoCalculated ? 'form-field__input--readonly' : ''}`}
          aria-describedby={hint ? `${key}-hint` : undefined}
        />
      )}

      {hint && !error && (
        <span id={`${key}-hint`} className="form-field__hint">{hint}</span>
      )}
      {error && (
        <span className="form-field__error-msg" role="alert">{error}</span>
      )}
    </div>
  )
}
