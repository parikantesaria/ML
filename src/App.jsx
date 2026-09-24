import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Overview from './pages/Overview'
import LoanPredictor from './pages/LoanPredictor'
import RiskAnalytics from './pages/RiskAnalytics'
import ModelPerformance from './pages/ModelPerformance'
import FeatureImportance from './pages/FeatureImportance'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="predict" element={<LoanPredictor />} />
          <Route path="analytics" element={<RiskAnalytics />} />
          <Route path="performance" element={<ModelPerformance />} />
          <Route path="features" element={<FeatureImportance />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
