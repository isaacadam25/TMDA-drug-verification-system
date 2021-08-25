import React from "react";

const TextareaController = (props) => {
  const { label, id, name, value, onChange, defaultValue, placeholder } = props;

  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        onChange={onChange}
        name={name}
        value={value}
        className="form-control form-control-sm"
        id={id}
        rows="2"
        placeholder={placeholder}
        required
      >
        {defaultValue}
      </textarea>
    </div>
  );
};

export default TextareaController;
