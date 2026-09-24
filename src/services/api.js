/**
 * api.js
 *
 * API service layer for CrediSense.
 *
 * When VITE_API_URL is set in .env, all requests go to the real backend.
 * When not set (or USE_MOCK=true), mock data is returned instead.
 *
 * To connect to the Python backend:
 *   1. Create a .env file at the project root:
 *        VITE_API_URL=http://localhost:8000
 *   2. Ensure the backend implements the endpoints documented below.
 *   3. Set USE_MOCK = false
 */

import axios from 'axios'
import {
  mockDashboardStats,
  mockDefaultDistribution,
  mockDefaultTrends,
  mockRiskDistribution,
  mockCreditScoreTrends,
  mockEmploymentDefaultRate,
  mockRecentApplications,
  mockPredictionResult,
  mockCreditScoreVsDefault,
  mockIncomeVsDefault,
  mockLoanAmountVsDefault,
  mockInterestRateVsDefault,
  mockDTIVsDefault,
  mockLoanPurposeVsDefault,
  mockPortfolioStats,
  mockPortfolioLoans,
  mockDatasetStats,
  mockModelMetrics,
  mockModelInfo,
  mockConfusionMatrix,
  mockROCCurve,
  mockPRCurve,
  mockFeatureImportance,
} from '../data/mockData'


// ─── Config ──────────────────────────────────────────────────────────────────

const USE_MOCK = !import.meta.env.VITE_API_URL

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Simulate network latency for mock responses
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms))

// ─── Interceptors ─────────────────────────────────────────────────────────────

client.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.detail || error.message || 'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

// ─── Dashboard ────────────────────────────────────────────────────────────────

/**
 * GET /dashboard
 * Returns high-level KPIs and summary metrics.
 */
export async function getDashboardStats() {
  if (USE_MOCK) {
    await delay()
    return {
      stats: mockDashboardStats,
      defaultDistribution: mockDefaultDistribution,
      defaultTrends: mockDefaultTrends,
      riskDistribution: mockRiskDistribution,
      creditScoreTrends: mockCreditScoreTrends,
      employmentDefaultRate: mockEmploymentDefaultRate,
      recentApplications: mockRecentApplications,
    }
  }
  return client.get('/dashboard')
}

// ─── Prediction ───────────────────────────────────────────────────────────────

/**
 * POST /predict
 *
 * Payload shape (all field names match Loan_default.csv exactly):
 * {
 *   Age: number,
 *   Income: number,
 *   LoanAmount: number,
 *   CreditScore: number,
 *   MonthsEmployed: number,
 *   NumCreditLines: number,
 *   InterestRate: number,
 *   LoanTerm: number,
 *   DTIRatio: number,
 *   Education: string,       // "High School" | "Bachelor's" | "Master's" | "PhD"
 *   EmploymentType: string,  // "Full-time" | "Part-time" | "Self-employed" | "Unemployed"
 *   MaritalStatus: string,   // "Single" | "Married" | "Divorced"
 *   HasMortgage: string,     // "Yes" | "No"
 *   HasDependents: string,   // "Yes" | "No"
 *   LoanPurpose: string,     // "Auto" | "Business" | "Education" | "Home" | "Other"
 *   HasCoSigner: string,     // "Yes" | "No"
 * }
 *
 * Expected response:
 * {
 *   prediction: 0 | 1,
 *   probability: number,   // 0.0–1.0 probability of default
 *   riskLevel: string,
 *   confidence: number,
 *   modelVersion: string,
 *   timestamp: string,
 * }
 */
export async function predictLoanDefault(payload) {
  if (USE_MOCK) {
    await delay(1200) // Slightly longer delay to simulate ML inference
    // Generate a deterministic-ish mock based on input
    const prob = Math.min(0.99, Math.max(0.01,
      (1 - payload.CreditScore / 850) * 0.4 +
      (payload.DTIRatio || 0.5) * 0.3 +
      (payload.EmploymentType === 'Unemployed' ? 0.2 : 0) +
      (Math.random() * 0.1 - 0.05)
    ))
    const predicted = prob >= 0.5 ? 1 : 0
    const conf = predicted === 1 ? prob : 1 - prob
    return {
      prediction: predicted,
      probability: parseFloat(prob.toFixed(4)),
      riskLevel: prob < 0.30 ? 'Low Risk' : prob < 0.65 ? 'Medium Risk' : 'High Risk',
      confidence: parseFloat(conf.toFixed(4)),
      modelVersion: mockPredictionResult.modelVersion,
      timestamp: new Date().toISOString(),
    }
  }
  return client.post('/predict', payload)
}

// ─── Risk Analytics ───────────────────────────────────────────────────────────

/**
 * GET /risk-analytics
 * Returns chart data for the Risk Analytics page.
 */
export async function getRiskAnalytics(params = {}) {
  if (USE_MOCK) {
    await delay()
    return {
      creditScoreVsDefault: mockCreditScoreVsDefault,
      incomeVsDefault: mockIncomeVsDefault,
      loanAmountVsDefault: mockLoanAmountVsDefault,
      interestRateVsDefault: mockInterestRateVsDefault,
      dtiVsDefault: mockDTIVsDefault,
      employmentVsDefault: mockEmploymentDefaultRate,
      loanPurposeVsDefault: mockLoanPurposeVsDefault,
    }
  }
  return client.get('/risk-analytics', { params })
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

/**
 * GET /portfolio
 * Returns portfolio-level stats and individual loan records.
 */
export async function getPortfolioData(params = {}) {
  if (USE_MOCK) {
    await delay()
    return {
      stats: mockPortfolioStats,
      loans: mockPortfolioLoans,
    }
  }
  return client.get('/portfolio', { params })
}

// ─── Dataset ──────────────────────────────────────────────────────────────────

/**
 * GET /dataset
 * Returns dataset statistics and feature metadata.
 */
export async function getDatasetStats() {
  if (USE_MOCK) {
    await delay()
    return mockDatasetStats
  }
  return client.get('/dataset')
}

export async function getApplications(params = {}) {
  if (USE_MOCK) {
    await delay()
    return mockPortfolioLoans
  }
  return client.get('/applications', { params })
}

export async function getModelPerformance() {
  if (USE_MOCK) {
    await delay()
    return {
      metrics: mockModelMetrics,
      confusionMatrix: mockConfusionMatrix,
      rocCurve: mockROCCurve,
      prCurve: mockPRCurve,
      info: mockModelInfo,
    }
  }
  return client.get('/model/performance')
}

export async function getFeatureImportance() {
  if (USE_MOCK) {
    await delay()
    return mockFeatureImportance
  }
  return client.get('/model/feature-importance')
}


