import React from 'react';
import { Emoji } from './Emoji';

export const SelectedFlags = ({
  selectedCountries,
  onClearFlags,
  indexedByCountry
}) => (
  <div className="card-container card-container-selectedflags">
    <div className="card">
      <div className="sub-container card-content">
        <h3>Selected flags:</h3>
        <div>
          {selectedCountries.map(country => (
            <Emoji
              key={country}
              symbol={indexedByCountry[country].flag}
              label={country}
            />
          ))}
        </div>
        <div className='button-panel'>
          <button className="btn" onClick={onClearFlags}>
            Clear flags
          </button>
        </div>
      </div>
    </div>
  </div>
);
