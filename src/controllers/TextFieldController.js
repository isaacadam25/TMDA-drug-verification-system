import React from 'react';

const TextFieldController = (props) => {

    const { id, label, type, onChange, value, name, placeholder } = props;

    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <input type={type || "text"}
                   value={value} name={name}
                   onChange={onChange} className="form-control form-control-sm"
                   id={id} placeholder={placeholder}
                   required
            />
        </>
    );
};

export default TextFieldController;