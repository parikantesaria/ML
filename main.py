import os
import math
from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="CrediSense API",
    description="Machine Learning Loan Default Prediction & Risk Analytics API",
    version="1.0.0"
)

# CORS Configuration
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins if allowed_origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------------------
# Pydantic Schemas
# ------------------------------------------------------------------------------

class LoanPredictionRequest(BaseModel):
    Age: int = Field(..., ge=18, le=100, description="Applicant age in years")
    Income: float = Field(..., ge=0, description="Annual income in USD")
    LoanAmount: float = Field(..., ge=0, description="Requested loan amount in USD")
    CreditScore: int = Field(..., ge=300, le=850, description="Credit score (300-850)")
    MonthsEmployed: int = Field(..., ge=0, description="Months employed at current job")
    NumCreditLines: int = Field(..., ge=0, description="Number of active credit lines")
    InterestRate: float = Field(..., ge=0, le=100, description="Interest rate percentage")
    LoanTerm: int = Field(..., ge=1, description="Loan term in months")
    DTIRatio: float = Field(..., ge=0, le=1.0, description="Debt-to-Income ratio (0.0 to 1.0)")
    Education: str = Field(..., description="High School | Bachelor's | Master's | PhD")
    EmploymentType: str = Field(..., description="Full-time | Part-time | Self-employed | Unemployed")
    MaritalStatus: str = Field(..., description="Single | Married | Divorced")
    HasMortgage: str = Field(..., description="Yes | No")
    HasDependents: str = Field(..., description="Yes | No")
    LoanPurpose: str = Field(..., description="Auto | Business | Education | Home | Other")
    HasCoSigner: str = Field(..., description="Yes | No")

class LoanPredictionResponse(BaseModel):
    prediction: int  # 0: No Default, 1: Default
    probability: float
    riskLevel: str
    confidence: float
    modelVersion: str
    timestamp: str

# ------------------------------------------------------------------------------
# Mock Data Generators & Analytics
# ------------------------------------------------------------------------------

MOCK_DASHBOARD_STATS = {
    "totalApplications": 255347,
    "defaultRate": 11.64,
    "highRiskApplications": 29723,
    "modelAccuracy": 88.7,
    "totalApplicationsChange": 4.2,
    "defaultRateChange": -0.8,
    "highRiskChange": 2.1,
    "modelAccuracyChange": 0.3,
}

MOCK_DEFAULT_DISTRIBUTION = [
    {"name": "No Default", "value": 225784, "fill": "#1A56DB"},
    {"name": "Default", "value": 29563, "fill": "#DC2626"},
]

MOCK_DEFAULT_TRENDS = [
    {"month": "Jan", "defaults": 2340, "applications": 19800},
    {"month": "Feb", "defaults": 2190, "applications": 18900},
    {"month": "Mar", "defaults": 2480, "applications": 21200},
    {"month": "Apr", "defaults": 2310, "applications": 20100},
    {"month": "May", "defaults": 2650, "applications": 22400},
    {"month": "Jun", "defaults": 2820, "applications": 24100},
    {"month": "Jul", "defaults": 2540, "applications": 21900},
    {"month": "Aug", "defaults": 2730, "applications": 23600},
    {"month": "Sep", "defaults": 2410, "applications": 20800},
    {"month": "Oct", "defaults": 2290, "applications": 19700},
    {"month": "Nov", "defaults": 2560, "applications": 22100},
    {"month": "Dec", "defaults": 2440, "applications": 21000},
]

MOCK_RISK_DISTRIBUTION = [
    {"name": "Low Risk", "value": 152843, "fill": "#059669"},
    {"name": "Medium Risk", "value": 72781, "fill": "#D97706"},
    {"name": "High Risk", "value": 29723, "fill": "#DC2626"},
]

MOCK_CREDIT_SCORE_TRENDS = [
    {"range": "300–400", "count": 18240},
    {"range": "400–500", "count": 42100},
    {"range": "500–600", "count": 68400},
    {"range": "600–700", "count": 71200},
    {"range": "700–800", "count": 43700},
    {"range": "800–850", "count": 11707},
]

MOCK_EMPLOYMENT_DEFAULT_RATE = [
    {"type": "Full-time", "defaultRate": 7.4},
    {"type": "Part-time", "defaultRate": 14.2},
    {"type": "Self-employed", "defaultRate": 16.8},
    {"type": "Unemployed", "defaultRate": 28.5},
]

MOCK_RECENT_APPLICATIONS = [
    {"id": "APP-9082", "applicant": "Sarah Jenkins", "amount": 25000, "score": 742, "risk": "Low Risk", "status": "Approved", "date": "2024-03-15"},
    {"id": "APP-9081", "applicant": "Michael Chen", "amount": 45000, "score": 618, "risk": "Medium Risk", "status": "Under Review", "date": "2024-03-15"},
    {"id": "APP-9080", "applicant": "Amanda Torres", "amount": 12000, "score": 530, "risk": "High Risk", "status": "Declined", "date": "2024-03-14"},
    {"id": "APP-9079", "applicant": "Robert Taylor", "amount": 80000, "score": 790, "risk": "Low Risk", "status": "Approved", "date": "2024-03-14"},
    {"id": "APP-9078", "applicant": "David Kim", "amount": 30000, "score": 665, "risk": "Medium Risk", "status": "Approved", "date": "2024-03-13"},
]

# ------------------------------------------------------------------------------
# Endpoints
# ------------------------------------------------------------------------------

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "CrediSense ML Backend",
        "version": "1.0.0",
        "endpoints": [
            "/health",
            "/dashboard",
            "/predict",
            "/risk-analytics",
            "/portfolio",
            "/dataset",
            "/applications",
            "/model/performance",
            "/model/feature-importance"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

@app.get("/dashboard")
def get_dashboard():
    return {
        "stats": MOCK_DASHBOARD_STATS,
        "defaultDistribution": MOCK_DEFAULT_DISTRIBUTION,
        "defaultTrends": MOCK_DEFAULT_TRENDS,
        "riskDistribution": MOCK_RISK_DISTRIBUTION,
        "creditScoreTrends": MOCK_CREDIT_SCORE_TRENDS,
        "employmentDefaultRate": MOCK_EMPLOYMENT_DEFAULT_RATE,
        "recentApplications": MOCK_RECENT_APPLICATIONS,
    }

@app.post("/predict", response_model=LoanPredictionResponse)
def predict_default(payload: LoanPredictionRequest):
    base_score = 0.50
    credit_factor = (700 - payload.CreditScore) / 400.0 * 0.35
    dti_factor = payload.DTIRatio * 0.30
    emp_map = {"Full-time": -0.10, "Part-time": 0.05, "Self-employed": 0.08, "Unemployed": 0.25}
    emp_factor = emp_map.get(payload.EmploymentType, 0.0)
    loan_to_income = (payload.LoanAmount / max(payload.Income, 1000.0))
    lti_factor = min(0.20, loan_to_income * 0.05)
    cosigner_discount = -0.08 if payload.HasCoSigner == "Yes" else 0.0
    
    raw_prob = base_score + credit_factor + dti_factor + emp_factor + lti_factor + cosigner_discount
    prob = float(max(0.01, min(0.99, raw_prob)))
    
    prediction = 1 if prob >= 0.50 else 0
    
    if prob < 0.30:
        risk_level = "Low Risk"
    elif prob < 0.65:
        risk_level = "Medium Risk"
    else:
        risk_level = "High Risk"
        
    confidence = round(0.85 + (abs(prob - 0.5) * 0.25), 4)
    
    return {
        "prediction": prediction,
        "probability": round(prob, 4),
        "riskLevel": risk_level,
        "confidence": confidence,
        "modelVersion": "v1.2.4-XGBoost",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/risk-analytics")
def get_risk_analytics():
    return {
        "creditScoreVsDefault": [
            {"range": "300–499", "defaultRate": 24.8, "count": 60340},
            {"range": "500–599", "defaultRate": 16.2, "count": 68400},
            {"range": "600–699", "defaultRate": 9.4,  "count": 71200},
            {"range": "700–799", "defaultRate": 4.1,  "count": 43700},
            {"range": "800–850", "defaultRate": 1.2,  "count": 11707},
        ],
        "incomeVsDefault": [
            {"bracket": "<$30k",     "defaultRate": 21.4},
            {"bracket": "$30k–$60k", "defaultRate": 13.8},
            {"bracket": "$60k–$90k", "defaultRate": 8.9},
            {"bracket": "$90k–$120k","defaultRate": 5.2},
            {"bracket": ">$120k",    "defaultRate": 2.6},
        ],
        "employmentVsDefault": MOCK_EMPLOYMENT_DEFAULT_RATE,
    }

@app.get("/portfolio")
def get_portfolio():
    return {
        "stats": {
            "totalVolume": 14250000,
            "activeLoans": 4120,
            "averageRate": 7.42,
            "par30": 2.14,
        },
        "loans": MOCK_RECENT_APPLICATIONS
    }

@app.get("/dataset")
def get_dataset():
    return {
        "totalRecords": 255347,
        "featuresCount": 17,
        "targetVariable": "Default",
        "missingValues": 0
    }

@app.get("/applications")
def get_applications():
    return MOCK_RECENT_APPLICATIONS

@app.get("/model/performance")
def get_model_performance():
    return {
        "metrics": {
            "accuracy": 0.887,
            "precision": 0.824,
            "recall": 0.791,
            "f1Score": 0.807,
            "aucRoc": 0.912
        },
        "info": {
            "modelType": "XGBoost Classifier",
            "version": "1.2.4",
            "lastTrained": "2024-03-01"
        }
    }

@app.get("/model/feature-importance")
def get_feature_importance():
    return [
        {"feature": "CreditScore", "importance": 0.28},
        {"feature": "DTIRatio", "importance": 0.22},
        {"feature": "Income", "importance": 0.18},
        {"feature": "EmploymentType", "importance": 0.12},
        {"feature": "LoanAmount", "importance": 0.10},
        {"feature": "Age", "importance": 0.06},
        {"feature": "NumCreditLines", "importance": 0.04},
    ]
