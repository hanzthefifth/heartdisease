# main.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from calc import calculate_risk, generate_explanation, generate_recommendations
#from ai_model.predict import predict as ai_predict  # placeholder for later

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    manual_score = calculate_risk(data)
    explanation = generate_explanation(manual_score)
    recommendations = generate_recommendations(manual_score)

    # AI model call
    # try:
    #     ai_prediction, ai_confidence = ai_predict(data)
    # except:
    #     ai_prediction = None
    #     ai_confidence = None

    result = {
        "riskScore": manual_score,
        "explanation": explanation,
        "recommendations": recommendations,
       # "aiPrediction": ai_prediction,
       # "aiConfidence": ai_confidence
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
