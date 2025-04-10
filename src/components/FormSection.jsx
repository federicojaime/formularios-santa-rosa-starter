// Archivo: src/components/FormSection.jsx
import React from 'react';

function FormSection({ title, children }) {
  return (
    <div className="form-section">
      <h2>{title}</h2>
      <div className="form-grid">
        {children}
      </div>
    </div>
  );
}

export default FormSection;
