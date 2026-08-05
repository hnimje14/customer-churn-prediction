from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import os

from model import load_or_train_model, train_and_evaluate
from predict import predict_customer_risk
from utils import get_initial_recent_predictions

app = Flask(__name__)
CORS(app)

recent_predictions = get_initial_recent_predictions()

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "Customer Churn Prediction API is running"
    }), 200


@app.route('/train', methods=['POST'])
def handle_train():
    try:
        bundle = train_and_evaluate()
        return jsonify({
            'status': 'success',
            'message': 'Model retrained successfully!',
            'selected_model': bundle['selected_model'],
            'metrics': bundle['results'][bundle['selected_model']]
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/predict', methods=['POST'])
def handle_predict():
    try:
        data = request.get_json() or {}
        res = predict_customer_risk(data)
        
        # Format recent prediction entry with timestamp
        cust_id = data.get('Customer ID', f"CUST-{len(recent_predictions) + 1001}")
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        
        new_entry = {
            "customer_id": cust_id,
            "prediction": res['prediction'],
            "prediction_result": res['displayResult'],
            "risk_score": res['risk_score'],
            "risk_level": res['risk_level'],
            "probability": f"{res['probability']:.1f}%",
            "timestamp": timestamp
        }
        
        recent_predictions.insert(0, new_entry)
        if len(recent_predictions) > 5:
            recent_predictions.pop()
            
        return jsonify({'status': 'success', 'result': res}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/dashboard', methods=['GET'])
def handle_dashboard():
    try:
        bundle = load_or_train_model()
        summary = bundle['dataset_summary']
        return jsonify({
            'status': 'success',
            'total_customers': summary['total_customers'],
            'total_features': summary['total_features'],
            'churn_rate': summary['churn_rate'],
            'missing_values': summary['missing_values'],
            'data_quality': summary['data_quality'],
            'average_risk': summary['average_risk'],
            'customer_segments': summary['customer_segments'],
            'risk_distribution': summary['risk_distribution'],
            'recent_predictions': recent_predictions,
            'selected_model': summary['selected_model'],
            'summary': summary
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/model-analysis', methods=['GET'])
@app.route('/metrics', methods=['GET'])
def handle_model_analysis():
    try:
        bundle = load_or_train_model()
        best_name = bundle['selected_model']
        best_results = bundle['results'][best_name]
        roc_data = bundle['roc_curves'][best_name]
        train_sum = bundle.get('training_summary', {})
        
        comparison = []
        for m_name, m_metrics in bundle['results'].items():
            comparison.append({
                'model': m_metrics.get('model', m_name),
                'accuracy': m_metrics['accuracy'],
                'precision': m_metrics['precision'],
                'recall': m_metrics['recall'],
                'f1_score': m_metrics['f1_score'],
                'roc_auc': m_metrics['roc_auc']
            })

        return jsonify({
            'status': 'success',
            'selected_model': best_name,
            'best_model_name': best_name,
            'accuracy': best_results['accuracy'],
            'precision': best_results['precision'],
            'recall': best_results['recall'],
            'f1_score': best_results['f1_score'],
            'roc_auc': best_results['roc_auc'],
            'confusion_matrix': best_results['confusion_matrix'],
            'training_samples': train_sum.get('training_samples', 5634),
            'testing_samples': train_sum.get('testing_samples', 1409),
            'training_time': train_sum.get('training_time', 1.2),
            'inference_time': train_sum.get('inference_time', 12.0),
            'shap_features': bundle.get('top_shap_features', []),
            'roc_curve': roc_data,
            'comparison': comparison,
            'metrics': best_results
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/model-comparison', methods=['GET'])
def handle_model_comparison():
    return handle_model_analysis()

@app.route('/feature-importance', methods=['GET'])
def handle_feature_importance():
    try:
        bundle = load_or_train_model()
        top_features = bundle.get('top_shap_features', [])
        return jsonify({
            'status': 'success',
            'features': top_features
        }), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == "__main__":
    import os

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
