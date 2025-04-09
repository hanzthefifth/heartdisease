import React, { useState } from "react";

const FraminghamPage = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [hdlCholesterol, setHdlCholesterol] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [onHypertensionTreatment, setOnHypertensionTreatment] = useState(false);
  const [smokingStatus, setSmokingStatus] = useState(false);
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [riskScore, setRiskScore] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const calculateRisk = async () => {
    // Prepare the data object to send to Flask
    const data = {
      age,
      sex,
      totalCholesterol,
      hdlCholesterol,
      systolicBP,
      onHypertensionTreatment,
      smokingStatus,
      hasDiabetes,
    };

    try {
      // Send the data to the Flask /predict endpoint
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error calculating risk");
      }
      
      const result = await response.json();
      
      // Update state with the results from Flask
      setRiskScore(result.riskScore);
      setExplanation(result.explanation);
      setRecommendations(result.recommendations);

      // Save results in localStorage for potential export functionality
      localStorage.setItem("riskResults", JSON.stringify(result));
    } catch (error) {
      console.error("Error calculating risk:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand" href="/">❤️ Heart Health</a>
          <button className="navbar-toggle" type="button" onClick={() => {/* toggle nav logic */}}>
            <span className="toggle-icon"></span>
          </button>
          <div className="nav-menu" id="navMenu">
            <ul className="nav-list">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/framingham">Framingham Risk Score</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ascvd">ASCVD Risk Estimator</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="p-10 text-xl">
        <h2 className="text-2xl font-bold mb-4">Framingham Risk Score Calculator</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateRisk();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Sex:</label>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="border rounded p-2 w-full"
              required
            >
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block">Total Cholesterol (mg/dL):</label>
            <input
              type="number"
              value={totalCholesterol}
              onChange={(e) => setTotalCholesterol(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">HDL Cholesterol (mg/dL):</label>
            <input
              type="number"
              value={hdlCholesterol}
              onChange={(e) => setHdlCholesterol(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Systolic Blood Pressure (mmHg):</label>
            <input
              type="number"
              value={systolicBP}
              onChange={(e) => setSystolicBP(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">On Hypertension Treatment:</label>
            <input
              type="checkbox"
              checked={onHypertensionTreatment}
              onChange={() => setOnHypertensionTreatment(!onHypertensionTreatment)}
            />
          </div>
          <div>
            <label className="block">Current Smoker:</label>
            <input
              type="checkbox"
              checked={smokingStatus}
              onChange={() => setSmokingStatus(!smokingStatus)}
            />
          </div>
          <div>
            <label className="block">Diabetes:</label>
            <input
              type="checkbox"
              checked={hasDiabetes}
              onChange={() => setHasDiabetes(!hasDiabetes)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Calculate Risk
          </button>
        </form>
        {riskScore !== null && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h3 className="text-lg font-semibold">Risk Score: {riskScore}</h3>
            <p>{explanation}</p>
            <h3 className="card-title">Understanding Your Results</h3>
            <ul className="list-unstyled">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default FraminghamPage;
