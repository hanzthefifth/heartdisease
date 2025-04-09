# calc.py

def calculate_risk(data):
    age = int(data.get("age", 0))
    sex = data.get("sex", "male")
    totalCholesterol = int(data.get("totalCholesterol", 0))
    hdlCholesterol = int(data.get("hdlCholesterol", 0))
    systolicBP = int(data.get("systolicBP", 0))
    onHypertensionTreatment = data.get("onHypertensionTreatment", False)
    smokingStatus = data.get("smokingStatus", False)
    hasDiabetes = data.get("hasDiabetes", False)

    score = 0

    # Age points
    age_ranges = [(20, 34, -1, -9), (35, 39, 0, -4), (40, 44, 1, 0), (45, 49, 2, 3),
                  (50, 54, 3, 6), (55, 59, 4, 7), (60, 64, 5, 8), (65, 69, 6, 9),
                  (70, 74, 7, 10), (75, 79, 8, 11)]
    for lower, upper, male_pts, female_pts in age_ranges:
        if lower <= age <= upper:
            score += male_pts if sex == "male" else female_pts
            break

    # Cholesterol, HDL, BP, Smoking, Diabetes
    # ... (same logic as your original)

    # Total Cholesterol
    if 160 <= totalCholesterol < 200:
        score += 4
    elif 200 <= totalCholesterol < 240:
        score += 7 if sex == "male" else 8
    elif 240 <= totalCholesterol < 280:
        score += 9 if sex == "male" else 11
    elif totalCholesterol >= 280:
        score += 11 if sex == "male" else 13

    # HDL Cholesterol
    if hdlCholesterol >= 60:
        score -= 1
    elif 50 <= hdlCholesterol < 60:
        score += 0
    elif 40 <= hdlCholesterol < 50:
        score += 1
    elif hdlCholesterol < 40:
        score += 2

    # Systolic BP
    if 120 <= systolicBP < 130:
        score += 1 if onHypertensionTreatment else 0
    elif 130 <= systolicBP < 140:
        score += 2 if onHypertensionTreatment else 1
    elif 140 <= systolicBP < 160:
        score += 3 if onHypertensionTreatment else 2
    elif systolicBP >= 160:
        score += 4 if onHypertensionTreatment else 3

    # Smoking
    if smokingStatus:
        score += 4 if sex == "male" else 3

    # Diabetes
    if hasDiabetes:
        score += 3 if sex == "male" else 4

    return score

def generate_explanation(score):
    if score < 31:
        return "Your risk score is low. Keep up your healthy lifestyle!"
    elif score < 61:
        return "Your risk score is moderate. Consider lifestyle changes and consult your doctor."
    else:
        return "Your risk score is high. It is recommended to see a healthcare professional."

def generate_recommendations(score):
    if score < 31:
        return ["Maintain a balanced diet", "Regular exercise", "Keep regular check-ups"]
    elif score < 61:
        return ["Monitor your health", "Consult a nutritionist", "Consider lifestyle adjustments"]
    else:
        return ["Schedule a visit with your doctor", "Consider medical intervention", "Monitor your health closely"]
