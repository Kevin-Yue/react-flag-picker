import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
      filteredOptions: [],
      showOptions: false,
      isMouseOver: false,
      highlighted: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onClickContinent = this.onClickContinent.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    const { options } = this.props;
    const inputText = event.target.value;
    const filteredOptions = options.filter(
      option => option.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    );

    this.setState({
      filteredOptions,
      showOptions: true,
      inputText: event.target.value,
      highlighted: 0
    });
  }

  onClickContinent(event) {
    this.setState({
      filteredOptions: [],
      showOptions: false,
      inputText: '',
      highlighted: 0
    });
    this.props.onClick(event);
  }

  onMouseOver(event) {
    const { options } = this.props;
    const inputText = event.target.value;
    const filteredOptions = options.filter(
      option => option.toLowerCase().indexOf(inputText.toLowerCase()) > -1
    );

    this.setState({
      showOptions: true,
      filteredOptions,
      isMouseOver: true
    });
  }

  onMouseLeave(event) {
    if (this.props.selectorType === 'country') {
      this.setState({
        showOptions: false,
        isMouseOver: false
      });
    }
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      //case Enter
      case 13: {
        if (this.props.selectorType === 'country') {
          this.props.toggleCheckBox(
            this.state.filteredOptions[this.state.highlighted],
            true
          );
          this.setState(state => {
            return {
              showOptions: true
            };
          });
        } else {
          this.props.onClick(
            this.state.filteredOptions[this.state.highlighted],
            true
          );
          this.setState(state => {
            return {
              showOptions: false,
              inputText: '',
              highlighted: 0
            };
          });
        }
        break;
      }
      //case up
      case 38: {
        event.preventDefault();
        if (this.state.highlighted === 0) {
          break;
        }
        this.setState(state => {
          return { showOptions: true, highlighted: state.highlighted - 1 };
        });
        break;
      }

      //case down
      case 40: {
        event.preventDefault();
        if (this.state.highlighted > this.state.filteredOptions.length - 2) {
          break;
        }
        this.setState(state => {
          return { showOptions: true, highlighted: state.highlighted + 1 };
        });
        break;
      }

      default: {
        //other cases.
      }
    }
  }

  render() {
    let DropdownComponent;

    if (
      this.state.showOptions &&
      (this.state.inputText ||
        (this.props.selectorType === 'country' && this.state.isMouseOver))
    ) {
      if (this.state.filteredOptions.length) {
        DropdownComponent = this.state.filteredOptions.map((name, index) =>
          React.cloneElement(
            this.props.children,
            this.props.selectorType === 'continent'
              ? {
                  name: name,
                  key: name,
                  highlighted: this.state.highlighted === index,
                  onClick: this.onClickContinent
                }
              : {
                  name: name,
                  key: name,
                  isChecked: this.props.selectedCountries.includes(name),
                  highlighted: this.state.highlighted === index,
                  onChange: this.props.toggleCheckBox
                }
          )
        );

        DropdownComponent = (
          <ul className="drop-down collection">{DropdownComponent}</ul>
        );
      }
    } else {
      DropdownComponent = <div />;
    }

    return (
      <div onMouseLeave={this.onMouseLeave}>
        {this.props.selectorType === 'continent' ? (
          <input
            className="search-box"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={this.state.inputText}
          />
        ) : (
          <input
            className="search-box"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onMouseOver={this.onMouseOver}
            value={this.state.inputText}
          />
        )}
        {DropdownComponent}
      </div>
    );
  }
}

export default SearchBox;
