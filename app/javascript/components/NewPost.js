import React from 'react';
import axios from 'axios';
import { passCsrfToken } from '../util/helper';

class NewPost extends React.Component {
  state = {
    title: '',
	description: '',
  };
  componentDidMount() {
    passCsrfToken(document, axios);
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    const post = {
      title: this.state.title,
      body: this.state.body
    };

    axios.post('/api/posts', post).then(response => {
      console.log(response);
      console.log(response.data); 
    });
  };
  render() {
    return (
      <div>
        NewPost Page
        <form>
          <input
            name='title'
            placeholder='title'
            onChange={e => this.handleSubmit(e)}
            type='text'
          />
          <input
            name='description'
            placeholder='description'
            onChange={e => this.handleSubmit(e)}
            type='text'
          />
          <button>Create Post</button>
        </form>
      </div>
    );
  }
}

export default NewPost;
