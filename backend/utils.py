import random

def get_initial_recent_predictions():
    """Returns sample recent predictions for the dashboard table."""
    return [
        {
            "customer_id": "7590-WBENQ",
            "prediction": "Churn",
            "risk_score": 82,
            "risk_level": "High Risk",
            "probability": "82.4%"
        },
        {
            "customer_id": "5575-GNVDE",
            "prediction": "No Churn",
            "risk_score": 18,
            "risk_level": "Very Low Risk",
            "probability": "18.1%"
        },
        {
            "customer_id": "3668-QPYBK",
            "prediction": "Churn",
            "risk_score": 68,
            "risk_level": "Medium Risk",
            "probability": "68.0%"
        },
        {
            "customer_id": "7795-CFOCW",
            "prediction": "No Churn",
            "risk_score": 24,
            "risk_level": "Very Low Risk",
            "probability": "23.9%"
        },
        {
            "customer_id": "9237-HQITU",
            "prediction": "Churn",
            "risk_score": 89,
            "risk_level": "High Risk",
            "probability": "88.7%"
        }
    ]
