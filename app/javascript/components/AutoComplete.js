import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './../Autocomplete.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: '',
      players: [],
      suggestionSelected: false,
      showSearchBar: true,
      showBackButton: false,
      showSearchButton: true
    };
  }

  componentDidMount() {
    axios.get('/api/posts').then(response => {
      this.setState({ players: response.data.players });
    });
    const { players } = this.state;
    console.log(players);
  }

  onTextChange = e => {
    const input = e.target.value;
    let suggestions = [];
    const { players } = this.state;
    if (input.length > 0) {
      const regex = new RegExp(`^${input}`, 'i');
      suggestions = players.sort().filter(v => regex.test(v));
    }
    this.setState({
      suggestions: suggestions,
      text: input
    });
  };

  suggestionSelected = value => {
    const { suggestionSelected } = this.state;
    this.setState(() => ({
      text: value,
      suggestions: [],
      suggestionSelected: !suggestionSelected
    }));
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      if (
        this.state.text &&
        this.state.text.length > 0 &&
        !this.state.suggestionSelected
      )
        return <p>No Suggestions Found!</p>;
    }
    return (
      <ul>
        {suggestions.map(suggestion => (
          <li
            onClick={() => this.suggestionSelected(suggestion)}
            key={suggestion}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  onSubmitSearch = () => {
    this.setState({
      showSearchBar: false,
      showBackButton: true,
      showSearchButton: false
    });
  };

  onBackButtonClick = () => {
    this.setState({
      showSearchBar: true,
      showBackButton: false,
      showSearchButton: true
    });
  };

  renderSearchButton = () => {
    return <button onClick={() => this.onSubmitSearch()}>Search</button>;
  };

  renderBackButton = () => {
    return <button onClick={() => this.onBackButtonClick()}>go back</button>;
  };

  renderSearchBar = () => {
    const { text } = this.state;
    return (
      <input
        placeholder='Search...'
        value={text}
        onChange={this.onTextChange}
      />
    );
  };

  render() {
    const { showSearchButton, showSearchBar, showBackButton } = this.state;
    return (
      <div className='Autocomplete'>
        {showSearchBar && this.renderSearchBar()}
        {this.renderSuggestions()}
        {showSearchButton && this.renderSearchButton()}
        {showBackButton && this.renderBackButton()}
      </div>
    );
  }
}

export default Autocomplete;
