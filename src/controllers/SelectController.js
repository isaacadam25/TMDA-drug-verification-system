import React from 'react';

const SelectController = (props) => {
    const { label, name, value, options, onChange } = props;

    return (
        <>
            <label className="form-label">{label}</label>
            <select onChange={onChange} value={value} name={name} className="form-select form-select-sm" required>
                <option defaultValue>Select option here</option>
                {
                    options.map((option) => (
                        <option key={option.id} value={option.id}>{option.type_name}</option>
                    ))
                }
            </select>
        </>
    );
};

export default SelectController;