import React from 'react';
import './../App.css';
import Autocomplete from './AutoComplete';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='App-component'>
          <div className='App-component'>
            <Autocomplete />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
