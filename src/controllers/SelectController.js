import React from "react";

const SelectController = (props) => {
  const { label, name, value, options, onChange, invalidText, readOnly } =
    props;

  return (
    <div className="mb-2">
      <label className="form-label">{label}</label>
      <select
        onChange={onChange}
        value={value}
        name={name}
        className="form-select form-select-sm"
        required
        disabled={readOnly || false}
      >
        <option value={null}>Select option here...</option>
        {options &&
          options.map((option, index) => (
            <option
              style={{ textTransform: "capitalize" }}
              key={index}
              value={option.id}
            >
              {option.title}
            </option>
          ))}
      </select>
      <div className="text-danger">{invalidText}</div>
    </div>
  );
};

export default SelectController;
