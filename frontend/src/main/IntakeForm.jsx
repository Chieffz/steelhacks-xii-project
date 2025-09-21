import React, { useState } from "react";
import "../style/Intake.css";
import { logout } from "../firebase/FirebaseServices"; 
import Cookies from "js-cookie"; // ✅ to read Firebase token

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    Patient_ID: "",
    Name: "",
    Age: "",
    Sex: "",
    Reason_For_Visit: "",
    Injury_Type: "",
    ICD10_Code: "",
    Treatment: "",
    Outcome: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Grab Firebase token from cookie
    const token = Cookies.get("idToken");

    fetch("http://127.0.0.1:8080/form/", {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": "Bearer " + token,
      }
    })
  };

  const resetForm = () => {
    setFormData({
      Patient_ID: "",
      Name: "",
      Age: "",
      Sex: "",
      Reason_For_Visit: "",
      Injury_Type: "",
      ICD10_Code: "",
      Treatment: "",
      Outcome: "",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("idToken"); // ✅ also clear token when logging out
      alert("You have been signed out.");
    } catch (err) {
      alert("Error signing out: " + err.message);
    }
  };

  return (
    <div className="intake-wrapper">
      <div className="intake-box">
        {/* ✅ Header */}
        <div className="form-header">
          <h1>AI Prior Authorization Assistant</h1>
        </div>

        <p className="form-subtitle">
          Please complete the patient intake form to begin.
        </p>

        <form onSubmit={handleSubmit} className="intake-form">
          {/* Patient ID */}
          <div className="form-row">
            <label htmlFor="Patient_ID">Patient ID *</label>
            <input
              type="text"
              id="Patient_ID"
              name="Patient_ID"
              value={formData.Patient_ID}
              onChange={handleInputChange}
              required
              placeholder="Enter unique patient identifier"
            />
          </div>

          {/* Name & Age & Sex */}
          <div className="form-row form-row-group">
            <div className="form-group">
              <label htmlFor="Name">Full Name *</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
                placeholder="Patient's full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Age">Age *</label>
              <input
                type="number"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="e.g., 45"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Sex">Sex *</label>
              <select
                id="Sex"
                name="Sex"
                value={formData.Sex}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="form-row">
            <label htmlFor="Reason_For_Visit">Reason for Visit *</label>
            <textarea
              id="Reason_For_Visit"
              name="Reason_For_Visit"
              value={formData.Reason_For_Visit}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Describe the primary reason for the visit or consultation..."
            />
          </div>

          {/* Injury Type & ICD-10 Code */}
          <div className="form-row form-row-group">
            <div className="form-group">
              <label htmlFor="Injury_Type">Injury/Condition Type</label>
              <input
                type="text"
                id="Injury_Type"
                name="Injury_Type"
                value={formData.Injury_Type}
                onChange={handleInputChange}
                placeholder="e.g., Fracture, Sprain, Hypertension"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ICD10_Code">ICD-10 Code</label>
              <input
                type="text"
                id="ICD10_Code"
                name="ICD10_Code"
                value={formData.ICD10_Code}
                onChange={handleInputChange}
                placeholder="e.g., S52.501A"
              />
            </div>
          </div>

          {/* Treatment */}
          <div className="form-row">
            <label htmlFor="Treatment">Proposed Treatment *</label>
            <textarea
              id="Treatment"
              name="Treatment"
              value={formData.Treatment}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Describe the treatment, procedure, or medication being requested..."
            />
          </div>

          {/* Expected Outcome */}
          <div className="form-row">
            <label htmlFor="Outcome">Expected Outcome</label>
            <textarea
              id="Outcome"
              name="Outcome"
              value={formData.Outcome}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe the expected clinical outcome or improvement for the patient..."
            />
          </div>

          {/* Form Actions with Logout */}
          <div className="form-actions">
            <button type="button" onClick={handleLogout} className="btn-logout">
              Logout
            </button>
            <button type="button" onClick={resetForm} className="btn-secondary">
              Clear Form
            </button>
            <button type="submit" className="btn-primary">
              Submit for AI Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntakeForm;
