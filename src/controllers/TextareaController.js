import React from 'react';

const TextareaController = (props) => {
    const { label, id, name, value, onChange } = props;

    return (
        <>
            <label htmlFor={id} className="form-label">{label}</label>
            <textarea onChange={onChange} name={name} value={value} className="form-control form-control-sm" id={id} rows="2" required />
        </>
    );
};

export default TextareaController;