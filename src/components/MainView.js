import React, { Component } from 'react';
import { ContinentSelector } from './ContinentSelector';
import { CountrySelector } from './CountrySelector';
import { SelectedFlags } from './SelectedFlags';

export class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountries: [],
      selectedContinent: '',
      indexedByCountry: {},
      indexedByContinent: {},
      unflatedData: []
    };

    this.onContinentSelected = this.onContinentSelected.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.onClearFlags = this.onClearFlags.bind(this);
  }

  componentDidMount() {
    fetch('/continents.json')
      .then(response => response.json())
      .then(obj =>
        this.setState({
          indexedByCountry: this._normalizeByCountry(obj),
          unflatedData: obj,
          indexedByContinent: this._normalizeByContinent(obj)
        })
      );
  }

  onContinentSelected(event, direct = false) {
    const selectedContinent = direct? event : event.currentTarget.textContent;

    if(this.state.selectedContinent !== selectedContinent){
      this.onClearFlags();
    } 

    this.setState({ selectedContinent: selectedContinent });
  }

  onClearFlags(event) {
    this.setState({ selectedCountries: [] });
  }

  toggleCheckBox(event, direct = false) {
    const country = direct? event : event.currentTarget.value;
    if (this.state.selectedCountries.includes(country)) {
      this.setState(state => {
        return {
          selectedCountries: state.selectedCountries.filter(
            item => item !== country
          )
        };
      });
    } else {
      this.setState(state => {
        return {
          selectedCountries: [...state.selectedCountries, country]
        };
      });
    }
  }

  //This method will convert nested json object to normalized object.
  _normalizeByCountry(obj) {
    const countries = {};
    for (let continent of obj) {
      for (let country of continent.countries) {
        countries[country.name] = {
          name: country.name,
          flag: country.flag,
          continent: continent.continent
        };
      }
    }
    return countries;
  }

  _normalizeByContinent(obj) {
    const continents = {};
    for (let item of obj) {
      continents[item.continent] = item.countries;
    }
    return continents;
  }

  render() {
    return (
      <div className = 'main-view'>
        <ContinentSelector
          onContinentSelected={this.onContinentSelected}
          selectedCountries={this.state.selectedCountries}
          continents={this.state.unflatedData.map(ele => ele.continent)}
          selectedContinent={this.state.selectedContinent}
        />
        {this.state.selectedContinent !== '' ? (
          <CountrySelector
            toggleCheckBox={this.toggleCheckBox}
            countries={
              this.state.selectedContinent === ''
                ? []
                : this.state.indexedByContinent[
                    this.state.selectedContinent
                  ].map(item => item.name)
            }
            selectedCountries={this.state.selectedCountries}
          />
        ) : null}
        {this.state.selectedContinent !== '' &&
        this.state.selectedCountries.length > 0 ? (
          <SelectedFlags
            selectedCountries={this.state.selectedCountries}
            onClearFlags={this.onClearFlags}
            indexedByCountry={this.state.indexedByCountry}
          />
        ) : null}
      </div>
    );
  }
}
