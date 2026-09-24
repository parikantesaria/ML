import React, { useState } from 'react'
import { MODEL_CONFIG } from '../config/modelFeatures'
import './Settings.css'

export default function Settings() {
  const [useMock, setUseMock] = useState(!import.meta.env.VITE_API_URL)
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  const [thresholds, setThresholds] = useState(MODEL_CONFIG.riskThresholds)
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="settings-page">
      <div className="settings-page__header">
        <h2 className="settings-page__title">Platform & Model Settings</h2>
        <p className="settings-page__sub">Configure API connection endpoints, risk decision thresholds, and model feature options.</p>
      </div>

      {saved && (
        <div className="settings-page__toast" role="alert">
          <CheckIcon /> Settings updated successfully!
        </div>
      )}

      <form className="settings-page__form" onSubmit={handleSave}>
        {/* Backend API Configuration */}
        <div className="settings-page__section">
          <h3 className="settings-page__section-title">Backend API Integration</h3>
          <p className="settings-page__section-sub">Connect the React application to your Python ML REST backend endpoint.</p>

          <div className="settings-page__group">
            <label className="settings-page__label">API Mode</label>
            <div className="settings-page__radio-group">
              <label className="settings-page__radio">
                <input
                  type="radio"
                  name="apiMode"
                  checked={useMock}
                  onChange={() => setUseMock(true)}
                />
                <span>Mock Data Mode (Client-side Dataset Simulation)</span>
              </label>
              <label className="settings-page__radio">
                <input
                  type="radio"
                  name="apiMode"
                  checked={!useMock}
                  onChange={() => setUseMock(false)}
                />
                <span>Live Python ML Backend Endpoint</span>
              </label>
            </div>
          </div>

          <div className="settings-page__group">
            <label className="settings-page__label" htmlFor="apiUrl">
              Python ML Backend Base URL
            </label>
            <input
              id="apiUrl"
              type="url"
              className="settings-page__input"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              disabled={useMock}
              placeholder="http://localhost:8000/api"
            />
            <span className="settings-page__hint">
              Expects POST <code>{apiUrl}/predict</code> endpoint accepting payload with the 16 dataset features.
            </span>
          </div>
        </div>

        {/* Risk Thresholds */}
        <div className="settings-page__section">
          <h3 className="settings-page__section-title">Risk Level Decision Thresholds</h3>
          <p className="settings-page__section-sub">Set default probability boundaries for categorizing Low, Medium, and High risk profiles.</p>

          <div className="settings-page__grid">
            <div className="settings-page__group">
              <label className="settings-page__label">Low Risk Upper Cutoff (&le;)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                className="settings-page__input"
                value={thresholds.low}
                onChange={e => setThresholds({ ...thresholds, low: Number(e.target.value) })}
              />
              <span className="settings-page__hint">Default: 0.30 (30% default probability)</span>
            </div>

            <div className="settings-page__group">
              <label className="settings-page__label">Medium Risk Upper Cutoff (&le;)</label>
              <input
                type="number"
                step="0.05"
                min="0"
                max="1"
                className="settings-page__input"
                value={thresholds.medium}
                onChange={e => setThresholds({ ...thresholds, medium: Number(e.target.value) })}
              />
              <span className="settings-page__hint">Default: 0.65 (65% default probability)</span>
            </div>
          </div>
        </div>

        {/* Active Features Summary */}
        <div className="settings-page__section">
          <h3 className="settings-page__section-title">Registered Dataset Features (16 Total)</h3>
          <p className="settings-page__section-sub">Features loaded from <code>src/config/modelFeatures.js</code> single source of truth.</p>
          
          <div className="settings-page__tags">
            {MODEL_CONFIG.features.map(f => (
              <span key={f.key} className="settings-page__tag">
                <strong>{f.label}</strong>
                <code>{f.key}</code>
              </span>
            ))}
          </div>
        </div>

        <div className="settings-page__actions">
          <button type="submit" className="settings-page__save-btn">Save Configuration</button>
        </div>
      </form>
    </div>
  )
}

function CheckIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
