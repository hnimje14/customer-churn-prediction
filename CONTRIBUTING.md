# Contributing to Customer Churn Prediction & Risk Scoring System

Thank you for your interest in contributing to this project!

## How to Contribute

1. **Fork the Repository**: Click the "Fork" button at the top right of this repository.
2. **Clone your Fork**:
   ```bash
   git clone https://github.com/your-username/customer-churn-prediction.git
   cd customer-churn-prediction
   ```
3. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make Your Changes**: Ensure code follows PEP8 standards for Python backend files and ESLint guidelines for React frontend files.
5. **Run Verification Commands**:
   - Backend: `python -m pytest` or `python backend/model.py`
   - Frontend: `npm run build`
6. **Commit Your Changes**:
   ```bash
   git commit -m "Add: Amazing feature explanation"
   ```
7. **Push to Your Branch & Open a Pull Request**:
   ```bash
   git push origin feature/amazing-feature
   ```

## Development Guidelines

- **Clean Commit Messages**: Use clear, concise commit titles prefixed with `Add:`, `Fix:`, `Refactor:`, or `Docs:`.
- **Zero Hardcoded Statistics**: All ML metrics and KPI numbers displayed in the UI must be dynamically computed by the Flask API.
- **Responsive Layout**: Verify UI aesthetics across desktop, tablet, and mobile breakpoints.

## Questions or Issues?

Feel free to open an issue in the GitHub issue tracker for bugs, questions, or feature requests!
