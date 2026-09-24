/**
 * mockData.js
 *
 * Development mock responses that mirror the shape of real API responses.
 * Replace each function's return value with a real API call when the
 * Python backend is connected.
 *
 * All field names match the actual Loan_default.csv dataset exactly.
 */

// ─── Dashboard / Overview ────────────────────────────────────────────────────

export const mockDashboardStats = {
  totalApplications: 255347,
  defaultRate: 11.64,
  highRiskApplications: 29723,
  modelAccuracy: 88.7,
  totalApplicationsChange: +4.2,
  defaultRateChange: -0.8,
  highRiskChange: +2.1,
  modelAccuracyChange: +0.3,
}

export const mockDefaultDistribution = [
  { name: 'No Default', value: 225784, fill: '#1A56DB' },
  { name: 'Default',    value: 29563,  fill: '#DC2626' },
]

export const mockDefaultTrends = [
  { month: 'Jan', defaults: 2340, applications: 19800 },
  { month: 'Feb', defaults: 2190, applications: 18900 },
  { month: 'Mar', defaults: 2480, applications: 21200 },
  { month: 'Apr', defaults: 2310, applications: 20100 },
  { month: 'May', defaults: 2650, applications: 22400 },
  { month: 'Jun', defaults: 2820, applications: 24100 },
  { month: 'Jul', defaults: 2540, applications: 21900 },
  { month: 'Aug', defaults: 2730, applications: 23600 },
  { month: 'Sep', defaults: 2410, applications: 20800 },
  { month: 'Oct', defaults: 2290, applications: 19700 },
  { month: 'Nov', defaults: 2560, applications: 22100 },
  { month: 'Dec', defaults: 2440, applications: 21000 },
]

export const mockRiskDistribution = [
  { name: 'Low Risk',    value: 152843, fill: '#059669' },
  { name: 'Medium Risk', value: 72781,  fill: '#D97706' },
  { name: 'High Risk',   value: 29723,  fill: '#DC2626' },
]

export const mockCreditScoreTrends = [
  { range: '300–400', count: 18240 },
  { range: '400–500', count: 42100 },
  { range: '500–600', count: 68400 },
  { range: '600–700', count: 71200 },
  { range: '700–800', count: 43700 },
  { range: '800–850', count: 11707 },
]

export const mockEmploymentDefaultRate = [
  { type: 'Full-time',     defaultRate: 7.4  },
  { type: 'Part-time',     defaultRate: 14.1 },
  { type: 'Self-employed', defaultRate: 13.8 },
  { type: 'Unemployed',    defaultRate: 22.3 },
]

export const mockRecentApplications = [
  { id: 'CS-001847', age: 42, income: 85000,  loanAmount: 45000, creditScore: 720, employmentType: 'Full-time',     loanPurpose: 'Home',      interestRate: 6.5,  dtiRatio: 0.28, default: 0 },
  { id: 'CS-001846', age: 29, income: 38000,  loanAmount: 22000, creditScore: 430, employmentType: 'Part-time',     loanPurpose: 'Auto',      interestRate: 18.2, dtiRatio: 0.72, default: 1 },
  { id: 'CS-001845', age: 55, income: 120000, loanAmount: 80000, creditScore: 810, employmentType: 'Full-time',     loanPurpose: 'Business',  interestRate: 4.8,  dtiRatio: 0.19, default: 0 },
  { id: 'CS-001844', age: 33, income: 52000,  loanAmount: 35000, creditScore: 590, employmentType: 'Self-employed', loanPurpose: 'Education', interestRate: 11.3, dtiRatio: 0.44, default: 0 },
  { id: 'CS-001843', age: 61, income: 28000,  loanAmount: 18000, creditScore: 380, employmentType: 'Unemployed',    loanPurpose: 'Other',     interestRate: 21.7, dtiRatio: 0.83, default: 1 },
  { id: 'CS-001842', age: 38, income: 95000,  loanAmount: 120000, creditScore: 760, employmentType: 'Full-time',   loanPurpose: 'Home',      interestRate: 5.2,  dtiRatio: 0.31, default: 0 },
  { id: 'CS-001841', age: 24, income: 32000,  loanAmount: 15000, creditScore: 510, employmentType: 'Part-time',    loanPurpose: 'Auto',      interestRate: 14.9, dtiRatio: 0.55, default: 1 },
  { id: 'CS-001840', age: 47, income: 110000, loanAmount: 200000,creditScore: 790, employmentType: 'Full-time',    loanPurpose: 'Home',      interestRate: 4.1,  dtiRatio: 0.25, default: 0 },
]

// ─── Prediction Result ───────────────────────────────────────────────────────

export const mockPredictionResult = {
  prediction: 0,
  probability: 0.27,
  riskLevel: 'Low Risk',
  confidence: 0.88,
  modelVersion: '1.0.0',
  timestamp: new Date().toISOString(),
}

// ─── Risk Analytics ──────────────────────────────────────────────────────────

export const mockCreditScoreVsDefault = Array.from({ length: 60 }, (_, i) => ({
  creditScore: 300 + Math.round(Math.random() * 550),
  defaultRate: Math.max(0, Math.min(1, 0.95 - (300 + i * 9.2) / 1200 + (Math.random() - 0.5) * 0.25)),
}))

export const mockIncomeVsDefault = Array.from({ length: 60 }, (_, i) => ({
  income: 10000 + i * 3500,
  defaultRate: Math.max(0, 0.7 - (i * 0.011) + (Math.random() - 0.5) * 0.15),
}))

export const mockLoanAmountVsDefault = Array.from({ length: 60 }, (_, i) => ({
  loanAmount: 5000 + i * 4000,
  defaultRate: Math.max(0, 0.05 + i * 0.0035 + (Math.random() - 0.5) * 0.1),
}))

export const mockInterestRateVsDefault = Array.from({ length: 30 }, (_, i) => ({
  interestRate: 2 + i * 0.9,
  defaultRate: Math.max(0, Math.min(1, 0.03 + i * 0.034 + (Math.random() - 0.5) * 0.08)),
}))

export const mockDTIVsDefault = Array.from({ length: 20 }, (_, i) => ({
  dtiRatio: (i * 0.05).toFixed(2),
  defaultRate: Math.max(0, Math.min(1, 0.02 + i * 0.049 + (Math.random() - 0.5) * 0.06)),
}))

export const mockLoanPurposeVsDefault = [
  { purpose: 'Auto',      defaultRate: 12.4, count: 48300 },
  { purpose: 'Business',  defaultRate: 15.8, count: 31700 },
  { purpose: 'Education', defaultRate: 9.2,  count: 41200 },
  { purpose: 'Home',      defaultRate: 7.8,  count: 84100 },
  { purpose: 'Other',     defaultRate: 14.1, count: 50047 },
]

// ─── Portfolio ───────────────────────────────────────────────────────────────

export const mockPortfolioStats = {
  totalValue: 12480000000,
  totalLoans: 255347,
  defaultExposure: 1452200000,
  defaultRate: 11.64,
  avgLoanSize: 48880,
  avgCreditScore: 582,
}

export const mockPortfolioLoans = Array.from({ length: 100 }, (_, i) => {
  const defaulted = Math.random() < 0.116
  const creditScore = 300 + Math.round(Math.random() * 550)
  const income = 15000 + Math.round(Math.random() * 135000)
  const loanAmount = 5000 + Math.round(Math.random() * 295000)
  const purposes = ['Auto', 'Business', 'Education', 'Home', 'Other']
  const employments = ['Full-time', 'Part-time', 'Self-employed', 'Unemployed']
  const probability = defaulted
    ? 0.55 + Math.random() * 0.44
    : Math.random() * 0.44
  return {
    id: `CS-${String(2000 - i).padStart(6, '0')}`,
    age: 20 + Math.round(Math.random() * 50),
    income,
    loanAmount,
    creditScore,
    interestRate: parseFloat((2 + Math.random() * 22).toFixed(2)),
    loanTerm: [12, 24, 36, 48, 60][Math.floor(Math.random() * 5)],
    dtiRatio: parseFloat((Math.random()).toFixed(2)),
    employmentType: employments[Math.floor(Math.random() * 4)],
    loanPurpose: purposes[Math.floor(Math.random() * 5)],
    default: defaulted ? 1 : 0,
    probability: parseFloat(probability.toFixed(3)),
    riskLevel: probability < 0.30 ? 'Low' : probability < 0.65 ? 'Medium' : 'High',
    applicationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }
})

// ─── Dataset Stats ───────────────────────────────────────────────────────────

export const mockDatasetStats = {
  numRecords: 255347,
  numFeatures: 17,
  missingValues: 0,
  duplicateRecords: 0,
  targetDistribution: { 0: 225784, 1: 29563 },
  featureList: [
    { name: 'LoanID',         type: 'object',  missing: 0, unique: 255347, role: 'Identifier' },
    { name: 'Age',            type: 'int64',   missing: 0, unique: 56,     role: 'Feature' },
    { name: 'Income',         type: 'int64',   missing: 0, unique: 166234, role: 'Feature' },
    { name: 'LoanAmount',     type: 'int64',   missing: 0, unique: 216412, role: 'Feature' },
    { name: 'CreditScore',    type: 'int64',   missing: 0, unique: 551,    role: 'Feature' },
    { name: 'MonthsEmployed', type: 'int64',   missing: 0, unique: 121,    role: 'Feature' },
    { name: 'NumCreditLines', type: 'int64',   missing: 0, unique: 4,      role: 'Feature' },
    { name: 'InterestRate',   type: 'float64', missing: 0, unique: 19800,  role: 'Feature' },
    { name: 'LoanTerm',       type: 'int64',   missing: 0, unique: 5,      role: 'Feature' },
    { name: 'DTIRatio',       type: 'float64', missing: 0, unique: 980,    role: 'Feature' },
    { name: 'Education',      type: 'object',  missing: 0, unique: 4,      role: 'Feature' },
    { name: 'EmploymentType', type: 'object',  missing: 0, unique: 4,      role: 'Feature' },
    { name: 'MaritalStatus',  type: 'object',  missing: 0, unique: 3,      role: 'Feature' },
    { name: 'HasMortgage',    type: 'object',  missing: 0, unique: 2,      role: 'Feature' },
    { name: 'HasDependents',  type: 'object',  missing: 0, unique: 2,      role: 'Feature' },
    { name: 'LoanPurpose',    type: 'object',  missing: 0, unique: 5,      role: 'Feature' },
    { name: 'HasCoSigner',    type: 'object',  missing: 0, unique: 2,      role: 'Feature' },
    { name: 'Default',        type: 'int64',   missing: 0, unique: 2,      role: 'Target' },
  ],
  sampleRows: [
    { LoanID: 'I38PQUQS96', Age: 56, Income: 85994,  LoanAmount: 50587,  CreditScore: 520, MonthsEmployed: 80,  NumCreditLines: 4, InterestRate: 15.23, LoanTerm: 36, DTIRatio: 0.44, Education: "Bachelor's", EmploymentType: 'Full-time',  MaritalStatus: 'Divorced', HasMortgage: 'Yes', HasDependents: 'Yes', LoanPurpose: 'Other',      HasCoSigner: 'Yes', Default: 0 },
    { LoanID: 'HPSK72WA7R', Age: 69, Income: 50432,  LoanAmount: 124440, CreditScore: 458, MonthsEmployed: 15,  NumCreditLines: 1, InterestRate: 4.81,  LoanTerm: 60, DTIRatio: 0.68, Education: "Master's",   EmploymentType: 'Full-time',  MaritalStatus: 'Married',  HasMortgage: 'No',  HasDependents: 'No',  LoanPurpose: 'Other',      HasCoSigner: 'Yes', Default: 0 },
    { LoanID: 'C1OZ6DPJ8Y', Age: 46, Income: 84208,  LoanAmount: 129188, CreditScore: 451, MonthsEmployed: 26,  NumCreditLines: 3, InterestRate: 21.17, LoanTerm: 24, DTIRatio: 0.31, Education: "Master's",   EmploymentType: 'Unemployed', MaritalStatus: 'Divorced', HasMortgage: 'Yes', HasDependents: 'Yes', LoanPurpose: 'Auto',       HasCoSigner: 'No',  Default: 1 },
    { LoanID: 'V2KKSFM3UN', Age: 32, Income: 31713,  LoanAmount: 44799,  CreditScore: 743, MonthsEmployed: 0,   NumCreditLines: 3, InterestRate: 7.07,  LoanTerm: 24, DTIRatio: 0.23, Education: 'High School',EmploymentType: 'Full-time',  MaritalStatus: 'Married',  HasMortgage: 'No',  HasDependents: 'No',  LoanPurpose: 'Business',   HasCoSigner: 'No',  Default: 0 },
    { LoanID: 'EY08JDHTZP', Age: 60, Income: 20437,  LoanAmount: 9139,   CreditScore: 633, MonthsEmployed: 8,   NumCreditLines: 4, InterestRate: 6.51,  LoanTerm: 48, DTIRatio: 0.73, Education: "Bachelor's", EmploymentType: 'Unemployed', MaritalStatus: 'Divorced', HasMortgage: 'No',  HasDependents: 'Yes', LoanPurpose: 'Auto',       HasCoSigner: 'No',  Default: 0 },
    { LoanID: 'A9S62RQ7US', Age: 25, Income: 90298,  LoanAmount: 90448,  CreditScore: 720, MonthsEmployed: 18,  NumCreditLines: 2, InterestRate: 22.72, LoanTerm: 24, DTIRatio: 0.10, Education: 'High School',EmploymentType: 'Unemployed', MaritalStatus: 'Single',   HasMortgage: 'Yes', HasDependents: 'No',  LoanPurpose: 'Business',   HasCoSigner: 'Yes', Default: 1 },
    { LoanID: '1R0N3LGNRJ', Age: 36, Income: 42053,  LoanAmount: 92357,  CreditScore: 827, MonthsEmployed: 83,  NumCreditLines: 1, InterestRate: 23.94, LoanTerm: 48, DTIRatio: 0.20, Education: "Bachelor's", EmploymentType: 'Self-employed', MaritalStatus: 'Divorced', HasMortgage: 'Yes', HasDependents: 'No', LoanPurpose: 'Education', HasCoSigner: 'No', Default: 1 },
    { LoanID: 'Y8UETC3LSG', Age: 28, Income: 149227, LoanAmount: 139759, CreditScore: 375, MonthsEmployed: 56,  NumCreditLines: 3, InterestRate: 5.84,  LoanTerm: 36, DTIRatio: 0.80, Education: 'PhD',        EmploymentType: 'Full-time',  MaritalStatus: 'Divorced', HasMortgage: 'No',  HasDependents: 'No',  LoanPurpose: 'Education',  HasCoSigner: 'Yes', Default: 1 },
    { LoanID: 'RM6QSRHIYP', Age: 41, Income: 23265,  LoanAmount: 63527,  CreditScore: 829, MonthsEmployed: 87,  NumCreditLines: 4, InterestRate: 9.73,  LoanTerm: 60, DTIRatio: 0.45, Education: "Master's",   EmploymentType: 'Full-time',  MaritalStatus: 'Divorced', HasMortgage: 'Yes', HasDependents: 'No',  LoanPurpose: 'Auto',       HasCoSigner: 'Yes', Default: 0 },
    { LoanID: 'RSP1YD80Z7', Age: 35, Income: 95963,  LoanAmount: 77552,  CreditScore: 560, MonthsEmployed: 8,   NumCreditLines: 2, InterestRate: 6.63,  LoanTerm: 24, DTIRatio: 0.86, Education: "Master's",   EmploymentType: 'Self-employed', MaritalStatus: 'Divorced', HasMortgage: 'Yes', HasDependents: 'Yes', LoanPurpose: 'Home', HasCoSigner: 'No', Default: 1 },
  ],
}

// ─── Model Performance ───────────────────────────────────────────────────────

export const mockModelMetrics = {
  accuracy:  0.887,
  precision: 0.831,
  recall:    0.762,
  f1Score:   0.795,
  rocAuc:    0.921,
}

export const mockModelInfo = {
  modelType:      'Random Forest Classifier',
  targetVariable: 'Default',
  trainTestSplit: '80/20',
  numFeatures:    16,
  numTrainSamples: 204278,
  numTestSamples:  51069,
  status:         'Deployed',
  version:        '1.0.0',
  lastTrained:    '2024-07-15',
}

export const mockConfusionMatrix = {
  trueNegative:  43620,
  falsePositive: 1614,
  falseNegative: 1439,
  truePositive:  4396,
}

export const mockROCCurve = Array.from({ length: 21 }, (_, i) => {
  const fpr = i / 20
  const tpr = Math.min(1, Math.pow(fpr, 0.18) + (Math.random() - 0.5) * 0.02)
  return { fpr: parseFloat(fpr.toFixed(3)), tpr: parseFloat(Math.max(fpr, tpr).toFixed(3)) }
})

export const mockPRCurve = Array.from({ length: 21 }, (_, i) => {
  const recall = i / 20
  const precision = Math.max(0.1, 0.95 - recall * 0.7 + (Math.random() - 0.5) * 0.05)
  return { recall: parseFloat(recall.toFixed(3)), precision: parseFloat(precision.toFixed(3)) }
})

export const mockFeatureImportance = [
  { feature: 'InterestRate',   label: 'Interest Rate (%)',       importance: 0.245 },
  { feature: 'DTIRatio',       label: 'Debt-to-Income Ratio',    importance: 0.198 },
  { feature: 'Income',         label: 'Annual Income ($)',       importance: 0.142 },
  { feature: 'CreditScore',    label: 'Credit Score',            importance: 0.125 },
  { feature: 'LoanAmount',     label: 'Loan Amount ($)',         importance: 0.089 },
  { feature: 'EmploymentType', label: 'Employment Type',        importance: 0.054 },
  { feature: 'MonthsEmployed', label: 'Months Employed',        importance: 0.042 },
  { feature: 'Age',            label: 'Age',                     importance: 0.031 },
  { feature: 'LoanTerm',       label: 'Loan Term',               importance: 0.022 },
  { feature: 'NumCreditLines', label: 'Number of Credit Lines', importance: 0.018 },
  { feature: 'LoanPurpose',    label: 'Loan Purpose',            importance: 0.012 },
  { feature: 'Education',      label: 'Education Level',         importance: 0.009 },
  { feature: 'HasMortgage',    label: 'Has Mortgage',            importance: 0.005 },
  { feature: 'HasDependents',  label: 'Has Dependents',          importance: 0.004 },
  { feature: 'HasCoSigner',    label: 'Has Co-Signer',           importance: 0.003 },
  { feature: 'MaritalStatus',  label: 'Marital Status',          importance: 0.002 },
]

