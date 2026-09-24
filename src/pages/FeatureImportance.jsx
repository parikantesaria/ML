import React, { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { getFeatureImportance } from '../services/api'
import ChartCard from '../components/UI/ChartCard'
import './FeatureImportance.css'

export default function FeatureImportance() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeatureImportance().then(setData).finally(() => setLoading(false))
  }, [])

  return (
    <div className="feature-importance-page">
      <div className="feature-importance-page__header">
        <div>
          <h2 className="feature-importance-page__title">ML Feature Importance & Explainability</h2>
          <p className="feature-importance-page__sub">
            Relative weight of all 16 features from the Loan Default model ranked by Mean Absolute SHAP Value impact on prediction output.
          </p>
        </div>
      </div>

      <div className="feature-importance-page__grid">
        {/* Main Chart */}
        <ChartCard
          title="SHAP Feature Importance Ranking"
          subtitle="Top predictive features in the ML default risk classifier"
          loading={loading}
          className="feature-importance-page__chart-card"
        >
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, bottom: 10, left: 120 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="label"
                tick={{ fontSize: 12, fill: 'var(--color-text-primary)', fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                width={140}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 12 }}
                formatter={(v) => [`${(v * 100).toFixed(1)}% weight`, 'SHAP Importance']}
              />
              <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
                {data.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={i < 3 ? 'var(--color-primary)' : i < 8 ? 'var(--chart-4)' : 'var(--chart-1)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Feature Breakdown Table */}
        <div className="feature-importance-page__table-card">
          <h3 className="feature-importance-page__table-title">Feature Details & System Names</h3>
          <p className="feature-importance-page__table-sub">Mapping human labels to backend dataset fields</p>

          <div className="feature-importance-page__table-wrapper">
            <table className="feature-importance-page__table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>UI Label</th>
                  <th>Backend Field</th>
                  <th>Importance Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.feature}>
                    <td className="feature-importance-page__rank">#{idx + 1}</td>
                    <td className="feature-importance-page__label">{item.label}</td>
                    <td className="feature-importance-page__code"><code>{item.feature}</code></td>
                    <td>
                      <div className="feature-importance-page__score-bar-wrap">
                        <div
                          className="feature-importance-page__score-bar"
                          style={{
                            width: `${(item.importance / (data[0]?.importance || 1)) * 100}%`,
                            background: idx < 3 ? 'var(--color-primary)' : 'var(--chart-4)',
                          }}
                        />
                        <span>{(item.importance * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
