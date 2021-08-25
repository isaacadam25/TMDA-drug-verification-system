import React from "react";
import DatePicker from "react-datepicker";

function DatePickerController(props) {
  const { value, onChange, id, label, invalidText, ...rest } = props;
  return (
    <div className="mb-2">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <DatePicker selected={value} onChange={onChange} {...rest} />
      <div className="text-danger">{invalidText}</div>
    </div>
  );
}

export default DatePickerController;
