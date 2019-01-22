import React from 'react';

export const CheckableOption = ({ name, isChecked, onChange, highlighted }) => (
  <li className={(highlighted ? 'highLighted ' : '') + ' option'}>
    <label style={{ display: 'block', width: '100%', height: '100%' }}>
      <input
        type="checkbox"
        name={name}
        value={name}
        checked={isChecked}
        onChange={onChange}
      />
      <span className="checkbox-option" style={{ color: 'black' }}>
        {name}
      </span>
    </label>
  </li>
);
