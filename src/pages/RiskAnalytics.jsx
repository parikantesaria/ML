import React, { useEffect, useState } from 'react'
import {
  ScatterChart, Scatter, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { getRiskAnalytics } from '../services/api'
import ChartCard from '../components/UI/ChartCard'
import './RiskAnalytics.css'

export default function RiskAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRiskAnalytics().then(setData).finally(() => setLoading(false))
  }, [])

  const tooltipStyle = {
    contentStyle: { borderRadius: 8, border: '1px solid var(--color-border)', fontSize: 12 },
  }

  return (
    <div className="risk-analytics">
      <div className="risk-analytics__info">
        <InfoIcon />
        <span>Visualisations below show the relationship between input features and default rate using data from the Loan Default dataset. Hover over points for exact values.</span>
      </div>

      <div className="risk-analytics__grid">
        {/* Credit Score vs Default */}
        <ChartCard
          title="Credit Score vs Default Rate"
          subtitle="Higher credit scores generally correlate with lower default likelihood"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={230}>
            <ScatterChart margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" dataKey="creditScore" name="Credit Score" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} domain={[300, 850]} />
              <YAxis type="number" dataKey="defaultRate" name="Default Rate" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip {...tooltipStyle} formatter={(v, n) => [n === 'Default Rate' ? `${(v*100).toFixed(1)}%` : v, n]} />
              <Scatter data={data?.creditScoreVsDefault} fill="var(--chart-1)" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Income vs Default */}
        <ChartCard
          title="Income vs Default Rate"
          subtitle="Lower income borrowers tend to show higher default rates"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={230}>
            <ScatterChart margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" dataKey="income" name="Income" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <YAxis type="number" dataKey="defaultRate" name="Default Rate" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip {...tooltipStyle} formatter={(v, n) => [n === 'Default Rate' ? `${(v*100).toFixed(1)}%` : `$${v.toLocaleString()}`, n]} />
              <Scatter data={data?.incomeVsDefault} fill="var(--chart-3)" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Interest Rate vs Default */}
        <ChartCard
          title="Interest Rate vs Default Rate"
          subtitle="Higher interest rates are associated with significantly elevated default risk"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={data?.interestRateVsDefault} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="interestRate" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit="%" />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip {...tooltipStyle} formatter={(v) => `${(v*100).toFixed(1)}%`} />
              <Line type="monotone" dataKey="defaultRate" stroke="var(--chart-5)" strokeWidth={2.5} dot={false} name="Default Rate" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* DTI vs Default */}
        <ChartCard
          title="DTI Ratio vs Default Rate"
          subtitle="Debt-to-Income ratio is a strong predictor of loan default"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={data?.dtiVsDefault} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="dtiRatio" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip {...tooltipStyle} formatter={(v) => `${(v*100).toFixed(1)}%`} />
              <Line type="monotone" dataKey="defaultRate" stroke="var(--chart-4)" strokeWidth={2.5} dot={false} name="Default Rate" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Employment Type vs Default */}
        <ChartCard
          title="Employment Type vs Default Rate"
          subtitle="Unemployed borrowers show the highest default rate in the dataset"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={data?.employmentVsDefault} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="type" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip {...tooltipStyle} formatter={(v) => `${v}%`} />
              <Bar dataKey="defaultRate" radius={[4, 4, 0, 0]} name="Default Rate">
                {data?.employmentVsDefault?.map((entry, i) => (
                  <Cell key={i} fill={entry.defaultRate > 20 ? 'var(--chart-5)' : entry.defaultRate > 13 ? 'var(--chart-4)' : 'var(--chart-1)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Loan Purpose vs Default */}
        <ChartCard
          title="Loan Purpose vs Default Rate"
          subtitle="Business and Other purpose loans carry higher default risk"
          loading={loading}
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={data?.loanPurposeVsDefault} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="purpose" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip {...tooltipStyle} formatter={(v, n) => [n === 'Default Rate' ? `${v}%` : v.toLocaleString(), n]} />
              <Bar dataKey="defaultRate" radius={[4, 4, 0, 0]} name="Default Rate" fill="var(--chart-6)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Loan Amount vs Default */}
        <ChartCard
          title="Loan Amount vs Default Rate"
          subtitle="Larger loan amounts show a mild increase in default probability"
          loading={loading}
          className="risk-analytics__wide"
        >
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data?.loanAmountVsDefault} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="loanAmount" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip {...tooltipStyle} formatter={(v, n) => [n === 'Default Rate' ? `${(v*100).toFixed(1)}%` : `$${v.toLocaleString()}`, n]} />
              <Line type="monotone" dataKey="defaultRate" stroke="var(--chart-7)" strokeWidth={2.5} dot={false} name="Default Rate" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

function InfoIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
}
