import pandas as pd
import numpy as np
import os

def load_dataset(file_path):
    """Load dataset from Excel file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset not found at path: {file_path}")
    df = pd.read_excel(file_path)
    return df

def clean_data(df):
    """
    Perform initial data cleaning:
    - Remove duplicate records
    - Drop irrelevant ID and location/target-leakage columns
    - Handle missing values in Total Charges
    """
    df = df.copy()
    
    # Drop duplicates
    df = df.drop_duplicates()
    
    # Columns to remove (IDs, locations, leakage targets)
    drop_cols = [
        'CustomerID', 'Count', 'Country', 'State', 'City', 'Zip Code',
        'Lat Long', 'Latitude', 'Longitude', 'Churn Score', 'CLTV',
        'Churn Reason', 'Churn Label'
    ]
    df = df.drop(columns=[c for c in drop_cols if c in df.columns])
    
    # Clean 'Total Charges' - convert to float, replace empty strings/whitespace with 0
    if 'Total Charges' in df.columns:
        df['Total Charges'] = pd.to_numeric(df['Total Charges'], errors='coerce').fillna(0)
        
    # Clean 'Monthly Charges' and 'Tenure Months'
    if 'Monthly Charges' in df.columns:
        df['Monthly Charges'] = pd.to_numeric(df['Monthly Charges'], errors='coerce').fillna(0)
    if 'Tenure Months' in df.columns:
        df['Tenure Months'] = pd.to_numeric(df['Tenure Months'], errors='coerce').fillna(0)
        
    # Ensure binary Senior Citizen is string 'Yes' / 'No' or 1/0
    if 'Senior Citizen' in df.columns:
        df['Senior Citizen'] = df['Senior Citizen'].map({'Yes': 1, 'No': 0, 1: 1, 0: 0}).fillna(0).astype(int)
        
    return df

def feature_engineering(df):
    """
    Create meaningful engineered features:
    1. Tenure Group
    2. Monthly Charges Bucket
    3. Total Charges Bucket
    4. Contract Risk Flag (Month-to-month = 1, else 0)
    5. Payment Method Risk (Electronic check = 1, else 0)
    6. Service Count (Sum of active services)
    7. Average Monthly Spend (Total Charges / Tenure Months)
    8. Long-Term Customer Flag (Tenure > 24 = 1, else 0)
    """
    df = df.copy()
    
    # 1. Tenure Group
    if 'Tenure Months' in df.columns:
        df['Tenure Group'] = pd.cut(
            df['Tenure Months'],
            bins=[-1, 12, 24, 48, 60, 100],
            labels=['0-12m', '13-24m', '25-48m', '49-60m', '>60m']
        ).astype(str)
        
    # 2. Monthly Charges Bucket
    if 'Monthly Charges' in df.columns:
        df['Monthly Charges Bucket'] = pd.cut(
            df['Monthly Charges'],
            bins=[-1, 35, 70, 100, 1000],
            labels=['Low', 'Medium', 'High', 'Very High']
        ).astype(str)
        
    # 3. Total Charges Bucket
    if 'Total Charges' in df.columns:
        df['Total Charges Bucket'] = pd.cut(
            df['Total Charges'],
            bins=[-1, 1000, 2500, 5000, 100000],
            labels=['Low', 'Medium', 'High', 'Very High']
        ).astype(str)
        
    # 4. Contract Risk Flag
    if 'Contract' in df.columns:
        df['Contract Risk Flag'] = (df['Contract'] == 'Month-to-month').astype(int)
    else:
        df['Contract Risk Flag'] = 0
        
    # 5. Payment Method Risk
    if 'Payment Method' in df.columns:
        df['Payment Method Risk'] = (df['Payment Method'] == 'Electronic check').astype(int)
    else:
        df['Payment Method Risk'] = 0
        
    # 6. Service Count
    service_cols = [
        'Phone Service', 'Multiple Lines', 'Internet Service',
        'Online Security', 'Online Backup', 'Device Protection',
        'Tech Support', 'Streaming TV', 'Streaming Movies'
    ]
    
    def count_services(row):
        cnt = 0
        for col in service_cols:
            if col in row and row[col] in ['Yes', 'DSL', 'Fiber optic']:
                cnt += 1
        return cnt
        
    df['Service Count'] = df.apply(count_services, axis=1)
    
    # 7. Average Monthly Spend
    if 'Total Charges' in df.columns and 'Tenure Months' in df.columns:
        df['Average Monthly Spend'] = np.where(
            df['Tenure Months'] > 0,
            df['Total Charges'] / df['Tenure Months'],
            df['Monthly Charges']
        )
        
    # 8. Long-Term Customer Flag
    if 'Tenure Months' in df.columns:
        df['Long-Term Customer Flag'] = (df['Tenure Months'] > 24).astype(int)
    else:
        df['Long-Term Customer Flag'] = 0
        
    return df

def preprocess_pipeline(file_path):
    """
    Full pipeline function to load, clean, feature engineer, and return:
    - X (processed features DataFrame with dummy encoding)
    - y (target binary array)
    - feature_names list
    - raw DataFrame for stats
    """
    raw_df = load_dataset(file_path)
    cleaned_df = clean_data(raw_df)
    engineered_df = feature_engineering(cleaned_df)
    
    target_col = 'Churn Value'
    if target_col not in engineered_df.columns:
        raise ValueError(f"Target column '{target_col}' missing from dataset")
        
    y = engineered_df[target_col].values
    X_df = engineered_df.drop(columns=[target_col])
    
    # Separate numeric and categorical features
    cat_cols = X_df.select_dtypes(include=['object', 'category']).columns.tolist()
    
    # One-Hot Encoding for categorical features
    X_encoded = pd.get_dummies(X_df, columns=cat_cols, drop_first=True)
    
    feature_names = list(X_encoded.columns)
    
    return X_encoded, y, feature_names, raw_df, cat_cols
