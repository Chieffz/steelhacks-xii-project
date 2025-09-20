import React, { useState } from "react";
import "../style/Intake.css";
import { logout } from "../firebase/FirebaseServices"; // ✅ import logout

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    age: "",
    sex: "",
    reasonForVisit: "",
    injuryType: "",
    icd10Code: "",
    treatment: "",
    outcome: "",
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
    console.log("Form Submitted:", formData);
    alert("Intake form submitted! Check the console for data.");
  };

  const resetForm = () => {
    setFormData({
      patientId: "",
      name: "",
      age: "",
      sex: "",
      reasonForVisit: "",
      injuryType: "",
      icd10Code: "",
      treatment: "",
      outcome: "",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
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
            <label htmlFor="patientId">Patient ID *</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              required
              placeholder="Enter unique patient identifier"
            />
          </div>

          {/* Name & Age & Sex */}
          <div className="form-row form-row-group">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Patient's full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="e.g., 45"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sex">Sex *</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="form-row">
            <label htmlFor="reasonForVisit">Reason for Visit *</label>
            <textarea
              id="reasonForVisit"
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Describe the primary reason for the visit or consultation..."
            />
          </div>

          {/* Injury Type & ICD-10 Code */}
          <div className="form-row form-row-group">
            <div className="form-group">
              <label htmlFor="injuryType">Injury/Condition Type</label>
              <input
                type="text"
                id="injuryType"
                name="injuryType"
                value={formData.injuryType}
                onChange={handleInputChange}
                placeholder="e.g., Fracture, Sprain, Hypertension"
              />
            </div>
            <div className="form-group">
              <label htmlFor="icd10Code">ICD-10 Code</label>
              <input
                type="text"
                id="icd10Code"
                name="icd10Code"
                value={formData.icd10Code}
                onChange={handleInputChange}
                placeholder="e.g., S52.501A"
              />
            </div>
          </div>

          {/* Treatment */}
          <div className="form-row">
            <label htmlFor="treatment">Proposed Treatment *</label>
            <textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Describe the treatment, procedure, or medication being requested..."
            />
          </div>

          {/* Expected Outcome */}
          <div className="form-row">
            <label htmlFor="outcome">Expected Outcome</label>
            <textarea
              id="outcome"
              name="outcome"
              value={formData.outcome}
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
