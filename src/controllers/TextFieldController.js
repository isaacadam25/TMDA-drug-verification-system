import React from "react";

const TextFieldController = (props) => {
  const {
    id,
    label,
    type,
    onChange,
    value,
    name,
    placeholder,
    invalidText,
    readOnly,
  } = props;

  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type || "text"}
        value={value}
        name={name}
        onChange={onChange}
        className="form-control form-control-sm"
        id={id}
        placeholder={placeholder}
        readOnly={readOnly || false}
        required
      />
      <div className="text-danger">{invalidText}</div>
    </div>
  );
};

export default TextFieldController;
