import React, { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { getDashboardStats } from '../services/api'
import MetricCard from '../components/UI/MetricCard'
import ChartCard from '../components/UI/ChartCard'
import DataTable from '../components/UI/DataTable'
import RiskBadge from '../components/UI/RiskBadge'
import './Overview.css'

const COLUMNS = [
  { key: 'id',             label: 'Loan ID',       width: 110 },
  { key: 'age',            label: 'Age',            width: 60 },
  { key: 'income',         label: 'Income',         type: 'currency', width: 110 },
  { key: 'loanAmount',     label: 'Loan Amount',    type: 'currency', width: 120 },
  { key: 'creditScore',    label: 'Credit Score',   width: 100 },
  { key: 'employmentType', label: 'Employment',     width: 120 },
  { key: 'loanPurpose',    label: 'Purpose',        width: 100 },
  { key: 'interestRate',   label: 'Rate (%)',        width: 80, align: 'right' },
  { key: 'default',        label: 'Status',          type: 'default', width: 110, nosort: true },
]

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

export default function Overview() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDashboardStats()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const s = data?.stats

  return (
    <div className="overview">
      {/* KPI Cards */}
      <div className="overview__metrics">
        <MetricCard
          title="Total Applications"
          value={loading ? '—' : s?.totalApplications?.toLocaleString()}
          trend={s?.totalApplicationsChange}
          trendLabel="vs last month"
          color="primary"
          loading={loading}
          icon={<AppIcon />}
        />
        <MetricCard
          title="Default Rate"
          value={loading ? '—' : `${s?.defaultRate?.toFixed(2)}%`}
          trend={s?.defaultRateChange}
          trendLabel="vs last month"
          color="danger"
          loading={loading}
          icon={<AlertIcon />}
        />
        <MetricCard
          title="High Risk Applications"
          value={loading ? '—' : s?.highRiskApplications?.toLocaleString()}
          trend={s?.highRiskChange}
          trendLabel="vs last month"
          color="warning"
          loading={loading}
          icon={<ShieldIcon />}
        />
        <MetricCard
          title="Model Accuracy"
          value={loading ? '—' : `${s?.modelAccuracy?.toFixed(1)}%`}
          trend={s?.modelAccuracyChange}
          trendLabel="vs last version"
          color="success"
          loading={loading}
          icon={<CpuIcon />}
        />
      </div>

      {/* Row 1: Pie + Trend */}
      <div className="overview__row overview__row--2col">
        <ChartCard title="Default Distribution" subtitle="Overall default vs non-default breakdown" loading={loading}>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data?.defaultDistribution}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={50}
                dataKey="value"
                labelLine={false}
                label={CustomPieLabel}
              >
                {data?.defaultDistribution?.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip formatter={(v) => v.toLocaleString()} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Default Trends" subtitle="Monthly applications vs defaults" loading={loading}>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data?.defaultTrends} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="applications" stroke="var(--chart-1)" strokeWidth={2} dot={false} name="Applications" />
              <Line type="monotone" dataKey="defaults" stroke="var(--chart-5)" strokeWidth={2} dot={false} name="Defaults" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Risk + Credit Score */}
      <div className="overview__row overview__row--2col">
        <ChartCard title="Risk Distribution" subtitle="Portfolio segmented by risk level" loading={loading}>
          <div className="overview__risk-dist">
            {data?.riskDistribution?.map(r => (
              <div key={r.name} className="overview__risk-item">
                <div className="overview__risk-bar-wrap">
                  <div
                    className="overview__risk-bar"
                    style={{
                      width: `${(r.value / (data?.stats?.totalApplications || 1) * 100).toFixed(1)}%`,
                      background: r.fill,
                    }}
                  />
                </div>
                <div className="overview__risk-info">
                  <span className="overview__risk-name" style={{ color: r.fill }}>{r.name}</span>
                  <span className="overview__risk-value">{r.value.toLocaleString()}</span>
                  <span className="overview__risk-pct">
                    {((r.value / (data?.stats?.totalApplications || 1)) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Credit Score Distribution" subtitle="Applicant credit score ranges" loading={loading}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data?.creditScoreTrends} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} />
              <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Applicants" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Employment Default Rate */}
      <ChartCard title="Default Rate by Employment Type" subtitle="Default rate (%) segmented by borrower employment status" loading={loading}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data?.employmentDefaultRate} layout="vertical" margin={{ top: 4, right: 40, bottom: 0, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit="%" domain={[0, 30]} />
            <YAxis type="category" dataKey="type" tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} width={100} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--color-border)' }} formatter={(v) => `${v}%`} />
            <Bar dataKey="defaultRate" fill="var(--chart-5)" radius={[0, 4, 4, 0]} name="Default Rate" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Applications Table */}
      <div className="overview__table-card">
        <div className="overview__table-header">
          <div>
            <h3 className="overview__table-title">Recent Applications</h3>
            <p className="overview__table-subtitle">Latest loan applications processed by the platform</p>
          </div>
        </div>
        <DataTable
          columns={COLUMNS}
          data={data?.recentApplications || []}
          loading={loading}
          paginated={false}
          sortable={true}
        />
      </div>
    </div>
  )
}

function AppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
}
function AlertIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
}
function ShieldIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
function CpuIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>
}
