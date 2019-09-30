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
      showSearchButton: true,
      playerNames: [],
      showSuggestions: true
    };
  }

  hideSuggestions = () => {
    this.setState({
      showSuggestions: false
    });
  };

  // fetches data whenever search component loads.

  // componentDidMount() {
  //   axios.get('/api/players').then(response => {
  //     var playerNames = [];
  //     const players = response.data.players;
  //     for(var i=0;i<players.length;i++){
  //       playerNames.push(players[i][0] + ", " + players[i][1] + ", " + players[i][2] + ", " + players[i][3]);
  //     }
  //     this.setState({ players: players, playerNames: playerNames});
  //   });
  // }

  onTextChange = e => {
    const input = e.target.value;

    // regex search on prefetched data

    // let suggestions = [];
    // const { playerNames } = this.state;
    // if (input.length > 0) {
    //   const regex = new RegExp(`^${input}`, 'i');
    //   suggestions = playerNames.sort().filter(v => regex.test(v));
    // }
    // this.setState({
    //   suggestions: suggestions,
    //   text: input
    // });
    // axios.get('/api/players').then(response => {
    //   var playerNames = [];
    //   const players = response.data.players;
    //   for(var i=0;i<players.length;i++){
    //     playerNames.push(players[i][0] + ", " + players[i][1] + ", " + players[i][2] + ", " + players[i][3]);
    //   }
    //   this.setState({ players: players, playerNames: playerNames});
    // });

    //Fetched data from database whenever input changes

    let playerNames = [];
    axios({
      method: 'post',
      url: '/api/players/get_suggestions',
      data: { name: input }
    }).then(response => {
      const suggestions = response.data.suggestions;
      for (var i = 0; i < suggestions.length; i++) {
        playerNames.push(
          suggestions[i][0] +
            ', ' +
            suggestions[i][1] +
            ', ' +
            suggestions[i][2]
        );
      }
      this.setState({
        playerNames: playerNames,
        text: input
      });
    });
  };
  suggestionSelected = value => {
    const { suggestionSelected } = this.state;
    this.setState(() => ({
      text: value,
      playerNames: [],
      suggestionSelected: !suggestionSelected
    }));
  };

  renderSuggestions = () => {
    const { text, playerNames } = this.state;
    if (playerNames.length === 0 || text.length === 0) {
      this.hideSuggestions;
      return null;
    }
    return (
      <ul>
        {playerNames.map(suggestion => (
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
    const {
      showSearchButton,
      showSearchBar,
      showBackButton,
      showSuggestions
    } = this.state;
    return (
      <div className='Autocomplete'>
        {showSearchBar && this.renderSearchBar()}
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default Autocomplete;
