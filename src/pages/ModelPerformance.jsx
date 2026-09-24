import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts'
import { getModelPerformance } from '../services/api'
import MetricCard from '../components/UI/MetricCard'
import ChartCard from '../components/UI/ChartCard'
import './ModelPerformance.css'

export default function ModelPerformance() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getModelPerformance().then(setData).finally(() => setLoading(false))
  }, [])

  const m = data?.metrics
  const cm = data?.confusionMatrix

  return (
    <div className="model-performance">
      {/* Top Metrics */}
      <div className="model-performance__metrics">
        <MetricCard title="Accuracy" value={loading ? '—' : `${(m?.accuracy * 100).toFixed(1)}%`} trend={+1.2} color="success" loading={loading} icon={<CheckCircleIcon />} />
        <MetricCard title="Precision" value={loading ? '—' : `${(m?.precision * 100).toFixed(1)}%`} trend={+0.8} color="primary" loading={loading} icon={<TargetIcon />} />
        <MetricCard title="Recall (Sensitivity)" value={loading ? '—' : `${(m?.recall * 100).toFixed(1)}%`} trend={+1.5} color="warning" loading={loading} icon={<ActivityIcon />} />
        <MetricCard title="F1-Score" value={loading ? '—' : `${(m?.f1Score * 100).toFixed(1)}%`} trend={+1.1} color="primary" loading={loading} icon={<AwardIcon />} />
        <MetricCard title="ROC AUC" value={loading ? '—' : m?.auc?.toFixed(3)} trend={+0.012} color="success" loading={loading} icon={<TrendingUpIcon />} />
      </div>

      {/* Row 1: Confusion Matrix + ROC Curve */}
      <div className="model-performance__row">
        <ChartCard title="Confusion Matrix" subtitle="True vs predicted loan default classifications" loading={loading}>
          <div className="model-performance__cm">
            <div className="model-performance__cm-header">
              <span />
              <span>Predicted: No Default</span>
              <span>Predicted: Default</span>
            </div>

            <div className="model-performance__cm-row">
              <span className="model-performance__cm-label">Actual: No Default</span>
              <div className="model-performance__cm-cell model-performance__cm-cell--tn">
                <span className="model-performance__cm-val">{loading ? '—' : cm?.tn?.toLocaleString()}</span>
                <span className="model-performance__cm-tag">True Negative</span>
              </div>
              <div className="model-performance__cm-cell model-performance__cm-cell--fp">
                <span className="model-performance__cm-val">{loading ? '—' : cm?.fp?.toLocaleString()}</span>
                <span className="model-performance__cm-tag">False Positive</span>
              </div>
            </div>

            <div className="model-performance__cm-row">
              <span className="model-performance__cm-label">Actual: Default</span>
              <div className="model-performance__cm-cell model-performance__cm-cell--fn">
                <span className="model-performance__cm-val">{loading ? '—' : cm?.fn?.toLocaleString()}</span>
                <span className="model-performance__cm-tag">False Negative</span>
              </div>
              <div className="model-performance__cm-cell model-performance__cm-cell--tp">
                <span className="model-performance__cm-val">{loading ? '—' : cm?.tp?.toLocaleString()}</span>
                <span className="model-performance__cm-tag">True Positive</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="ROC Curve" subtitle={`Receiver Operating Characteristic (AUC = ${m?.auc || 0.885})`} loading={loading}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data?.rocCurve} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="fpr" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} label={{ value: 'False Positive Rate', position: 'bottom', offset: -4, fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} formatter={(v) => [(v*100).toFixed(1)+'%']} />
              <Area type="monotone" dataKey="tpr" stroke="var(--color-primary)" fill="var(--color-primary-light)" strokeWidth={2.5} name="TPR" />
              <Line type="monotone" dataKey="random" stroke="var(--color-text-muted)" strokeDasharray="4 4" dot={false} name="Random Baseline" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Precision-Recall Curve + Metric Tracking */}
      <div className="model-performance__row">
        <ChartCard title="Precision-Recall Curve" subtitle="Precision trade-off at varying decision thresholds" loading={loading}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data?.prCurve} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="recall" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} formatter={(v) => [(v*100).toFixed(1)+'%']} />
              <Line type="monotone" dataKey="precision" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} name="Precision" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Model Info Card */}
        <div className="model-performance__info-card">
          <h3 className="model-performance__info-title">Model Specifications</h3>
          <div className="model-performance__info-list">
            <div className="model-performance__info-item">
              <span>Model Architecture</span>
              <strong>Gradient Boosting (LightGBM)</strong>
            </div>
            <div className="model-performance__info-item">
              <span>Dataset Size</span>
              <strong>255,347 records</strong>
            </div>
            <div className="model-performance__info-item">
              <span>Input Features</span>
              <strong>16 features</strong>
            </div>
            <div className="model-performance__info-item">
              <span>Target Variable</span>
              <strong>Default (0 / 1)</strong>
            </div>
            <div className="model-performance__info-item">
              <span>Training Split</span>
              <strong>80% Train / 20% Test</strong>
            </div>
            <div className="model-performance__info-item">
              <span>Cross Validation</span>
              <strong>5-Fold Stratified CV</strong>
            </div>
            <div className="model-performance__info-item">
              <span>Last Retrained</span>
              <strong>2026-08-15</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckCircleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}
function TargetIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
}
function ActivityIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
}
function AwardIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
}
function TrendingUpIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
}
