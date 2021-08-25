import React from "react";

export default function InputGroup(props) {
  const { type, name, value, placeholder, label, group, onChange } = props;

  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="input-group input-group-sm mb-2">
        <input
          type={type || "text"}
          className="form-control"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          name={name}
          aria-label={name}
          aria-describedby={name}
          required
        />
        <span className="input-group-text" id={name}>
          {group}
        </span>
      </div>
    </>
  );
}
