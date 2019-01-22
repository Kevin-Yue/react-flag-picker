import React from 'react';
import SearchBox from './SearchBox';
import { CheckableOption } from './CheckableOption';

export const CountrySelector = ({
  countries,
  selectedCountries,
  toggleCheckBox
}) => (
  <div className="card-container card-container-country">
    <div className="card">
      <div className="sub-container country-selector card-content">
        <h3>Step 2</h3>
        <p>Now, select a country.</p>
        <SearchBox
          options={countries}
          selectedCountries={selectedCountries}
          toggleCheckBox={toggleCheckBox}
          selectorType={'country'}
        >
          <CheckableOption />
        </SearchBox>
      </div>
    </div>
  </div>
);
