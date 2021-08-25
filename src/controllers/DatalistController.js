import React from "react";

function DatalistController(props) {
  const { label, options, readOnly, name, value, invalidText, onChange, id } =
    props;

  return (
    <div>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <input
        className="form-control form-control-sm"
        onChange={onChange}
        name={name}
        list="data"
        id={id}
        placeholder="Type here to search..."
        type="text"
        required
        value={value}
        readOnly={readOnly || false}
      />
      <div className="text-danger">{invalidText}</div>
      <datalist id="data">
        {options &&
          options.map((option, index) => <option key={index} value={option} />)}
      </datalist>
    </div>
  );
}

export default DatalistController;
