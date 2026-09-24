import React, { useEffect, useState } from 'react'
import { getApplications } from '../services/api'
import DataTable from '../components/UI/DataTable'
import RiskBadge from '../components/UI/RiskBadge'
import './Applications.css'

const ALL_COLUMNS = [
  { key: 'id',             label: 'Loan ID',        width: 100 },
  { key: 'age',            label: 'Age',             width: 60 },
  { key: 'income',         label: 'Income',          type: 'currency', width: 110 },
  { key: 'loanAmount',     label: 'Loan Amount',     type: 'currency', width: 120 },
  { key: 'creditScore',    label: 'Credit Score',    width: 100 },
  { key: 'monthsEmployed', label: 'Employed (M)',   width: 110 },
  { key: 'numCreditLines', label: 'Credit Lines',   width: 100 },
  { key: 'interestRate',   label: 'Rate (%)',         width: 80, align: 'right' },
  { key: 'loanTerm',       label: 'Term (M)',        width: 80 },
  { key: 'dtiRatio',       label: 'DTI Ratio',       width: 90 },
  { key: 'education',      label: 'Education',       width: 120 },
  { key: 'employmentType', label: 'Employment',      width: 120 },
  { key: 'maritalStatus',  label: 'Marital Status',  width: 110 },
  { key: 'hasMortgage',    label: 'Mortgage',        width: 90 },
  { key: 'hasDependents',  label: 'Dependents',      width: 100 },
  { key: 'loanPurpose',    label: 'Purpose',         width: 100 },
  { key: 'hasCoSigner',    label: 'Co-Signer',       width: 90 },
  { key: 'default',        label: 'Default Target',  type: 'default', width: 120 },
  { key: 'riskScore',      label: 'Risk Level',      render: (v) => <RiskBadge level={v} size="sm" />, width: 120 },
]

export default function Applications() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [riskFilter, setRiskFilter] = useState('ALL')
  const [defaultFilter, setDefaultFilter] = useState('ALL')

  useEffect(() => {
    getApplications()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  const filteredData = data.filter(item => {
    if (riskFilter !== 'ALL' && item.riskScore !== riskFilter) return false
    if (defaultFilter === 'DEFAULT' && item.default !== 1) return false
    if (defaultFilter === 'NON_DEFAULT' && item.default !== 0) return false
    return true
  })

  return (
    <div className="applications-page">
      <div className="applications-page__header">
        <div>
          <h2 className="applications-page__title">Loan Applications Explorer</h2>
          <p className="applications-page__sub">
            Browse and filter historical loan records containing all 16 ML model features from the Loan Default dataset.
          </p>
        </div>
        
        <div className="applications-page__filters">
          <div className="applications-page__filter">
            <label>Risk Level:</label>
            <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
              <option value="ALL">All Risks</option>
              <option value="Low Risk">Low Risk</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="High Risk">High Risk</option>
            </select>
          </div>

          <div className="applications-page__filter">
            <label>Target Status:</label>
            <select value={defaultFilter} onChange={e => setDefaultFilter(e.target.value)}>
              <option value="ALL">All Statuses</option>
              <option value="DEFAULT">Defaulted (1)</option>
              <option value="NON_DEFAULT">Non-Default (0)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="applications-page__card">
        <DataTable
          columns={ALL_COLUMNS}
          data={filteredData}
          loading={loading}
          paginated={true}
          pageSize={10}
          searchable={true}
          sortable={true}
        />
      </div>
    </div>
  )
}
