/**
 * modelFeatures.js
 *
 * Single source of truth for all model input features.
 * This config drives:
 *  - The Loan Predictor form fields (labels, types, validation)
 *  - The API payload keys (must match the Python backend exactly)
 *  - Future preprocessing logic
 *
 * Feature names are taken DIRECTLY from the Loan_default.csv dataset.
 * Target variable: Default (0 = No Default, 1 = Default)
 */

export const MODEL_FEATURES = [
  // ─── Borrower Demographics ──────────────────────────────────────────────
  {
    key: 'Age',
    label: 'Age',
    section: 'Borrower Profile',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 35',
    min: 18,
    max: 100,
    step: 1,
    required: true,
    hint: 'Borrower age in years (18–100)',
  },
  {
    key: 'Income',
    label: 'Annual Income ($)',
    section: 'Borrower Profile',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 75000',
    min: 0,
    max: 10000000,
    step: 1,
    required: true,
    hint: 'Gross annual income in USD',
  },
  {
    key: 'Education',
    label: 'Education Level',
    section: 'Borrower Profile',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: "High School", label: "High School" },
      { value: "Bachelor's",  label: "Bachelor's Degree" },
      { value: "Master's",    label: "Master's Degree" },
      { value: "PhD",         label: "PhD" },
    ],
    hint: 'Highest educational qualification',
  },
  {
    key: 'MaritalStatus',
    label: 'Marital Status',
    section: 'Borrower Profile',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 'Single',   label: 'Single' },
      { value: 'Married',  label: 'Married' },
      { value: 'Divorced', label: 'Divorced' },
    ],
    hint: 'Current marital status of the borrower',
  },
  {
    key: 'HasDependents',
    label: 'Has Dependents',
    section: 'Borrower Profile',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No',  label: 'No' },
    ],
    hint: 'Does the borrower have financial dependents?',
  },

  // ─── Employment ─────────────────────────────────────────────────────────
  {
    key: 'EmploymentType',
    label: 'Employment Type',
    section: 'Employment',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 'Full-time',      label: 'Full-time' },
      { value: 'Part-time',      label: 'Part-time' },
      { value: 'Self-employed',  label: 'Self-employed' },
      { value: 'Unemployed',     label: 'Unemployed' },
    ],
    hint: 'Current employment type of the borrower',
  },
  {
    key: 'MonthsEmployed',
    label: 'Months Employed',
    section: 'Employment',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 36',
    min: 0,
    max: 600,
    step: 1,
    required: true,
    hint: 'Duration of current employment in months',
  },

  // ─── Credit Profile ──────────────────────────────────────────────────────
  {
    key: 'CreditScore',
    label: 'Credit Score',
    section: 'Credit Profile',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 680',
    min: 300,
    max: 850,
    step: 1,
    required: true,
    hint: 'Credit bureau score (300–850)',
  },
  {
    key: 'NumCreditLines',
    label: 'Number of Credit Lines',
    section: 'Credit Profile',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 3',
    min: 0,
    max: 50,
    step: 1,
    required: true,
    hint: 'Total open credit lines',
  },
  {
    key: 'HasMortgage',
    label: 'Has Mortgage',
    section: 'Credit Profile',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No',  label: 'No' },
    ],
    hint: 'Does the borrower currently have an active mortgage?',
  },

  // ─── Loan Details ────────────────────────────────────────────────────────
  {
    key: 'LoanAmount',
    label: 'Loan Amount ($)',
    section: 'Loan Details',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 50000',
    min: 1000,
    max: 5000000,
    step: 100,
    required: true,
    hint: 'Requested loan amount in USD',
  },
  {
    key: 'LoanTerm',
    label: 'Loan Term (months)',
    section: 'Loan Details',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 12, label: '12 months (1 year)' },
      { value: 24, label: '24 months (2 years)' },
      { value: 36, label: '36 months (3 years)' },
      { value: 48, label: '48 months (4 years)' },
      { value: 60, label: '60 months (5 years)' },
    ],
    hint: 'Loan repayment term in months',
  },
  {
    key: 'InterestRate',
    label: 'Interest Rate (%)',
    section: 'Loan Details',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 8.5',
    min: 0.1,
    max: 30,
    step: 0.01,
    required: true,
    hint: 'Annual interest rate as a percentage',
  },
  {
    key: 'LoanPurpose',
    label: 'Loan Purpose',
    section: 'Loan Details',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 'Auto',      label: 'Auto' },
      { value: 'Business',  label: 'Business' },
      { value: 'Education', label: 'Education' },
      { value: 'Home',      label: 'Home' },
      { value: 'Other',     label: 'Other' },
    ],
    hint: 'Primary purpose of the loan',
  },
  {
    key: 'DTIRatio',
    label: 'Debt-to-Income Ratio',
    section: 'Loan Details',
    type: 'number',
    inputType: 'number',
    placeholder: 'e.g. 0.35',
    min: 0,
    max: 1,
    step: 0.01,
    required: true,
    hint: 'Total monthly debt payments ÷ gross monthly income (0.00–1.00)',
  },
  {
    key: 'HasCoSigner',
    label: 'Has Co-Signer',
    section: 'Loan Details',
    type: 'categorical',
    inputType: 'select',
    required: true,
    options: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No',  label: 'No' },
    ],
    hint: 'Does this loan application include a co-signer?',
  },
]

/**
 * Features grouped by section for form rendering.
 */
export const FEATURE_SECTIONS = MODEL_FEATURES.reduce((acc, feature) => {
  if (!acc[feature.section]) acc[feature.section] = []
  acc[feature.section].push(feature)
  return acc
}, {})

/**
 * Returns an empty payload object with all feature keys set to ''.
 * Used to initialize the prediction form state.
 */
export const getEmptyPayload = () =>
  MODEL_FEATURES.reduce((acc, f) => {
    acc[f.key] = ''
    return acc
  }, {})

/**
 * All valid categorical options keyed by field name.
 * Useful for backend preprocessing consistency checks.
 */
export const CATEGORICAL_OPTIONS = MODEL_FEATURES
  .filter(f => f.type === 'categorical')
  .reduce((acc, f) => {
    acc[f.key] = f.options.map(o => o.value)
    return acc
  }, {})

/**
 * Target variable metadata.
 */
export const TARGET = {
  key: 'Default',
  values: { 0: 'No Default', 1: 'Default' },
}

/**
 * Risk level thresholds based on probability of default.
 * These should be calibrated with the actual model's output.
 */
export const RISK_THRESHOLDS = {
  LOW:    { max: 0.30, label: 'Low Risk',    color: 'success' },
  MEDIUM: { max: 0.65, label: 'Medium Risk', color: 'warning' },
  HIGH:   { max: 1.00, label: 'High Risk',   color: 'danger' },
}

export function getRiskLevel(probability) {
  if (probability <= RISK_THRESHOLDS.LOW.max)    return RISK_THRESHOLDS.LOW
  if (probability <= RISK_THRESHOLDS.MEDIUM.max) return RISK_THRESHOLDS.MEDIUM
  return RISK_THRESHOLDS.HIGH
}

export const MODEL_CONFIG = {
  features: MODEL_FEATURES,
  sections: FEATURE_SECTIONS,
  riskThresholds: {
    low: RISK_THRESHOLDS.LOW.max,
    medium: RISK_THRESHOLDS.MEDIUM.max,
  },
}

