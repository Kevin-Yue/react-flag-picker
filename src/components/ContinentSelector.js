import React from 'react';
import SearchBox from './SearchBox';
import { Option } from './Option';

export const ContinentSelector = ({
  onContinentSelected,
  continents,
  selectedCountries,
  selectedContinent
}) => (
  <div className="card-container card-container-continent">
    <div className="card">
      <div className="sub-container continent-selector card-content">
        <h3>Step 1</h3>
        <p>Select a continent.</p>
        <SearchBox
          onClick={onContinentSelected}
          options={continents}
          selectedCountries={selectedCountries}
          selectorType={'continent'}
        >
          <Option />
        </SearchBox>
        <div className='info'>
          {selectedContinent !== '' ? <p>You selected</p> : null}
          <h5>{selectedContinent}</h5>
        </div>
      </div>
    </div>
  </div>
);
