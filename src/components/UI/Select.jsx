import React from "react";

const Select = ({ label, name, options, onChange, required = false }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select name={name} onChange={onChange} required={required}>
        <option value="">Seleccione una opción</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
