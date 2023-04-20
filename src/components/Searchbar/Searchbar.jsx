import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, Input, Button } from './SearchbarStyle';

export default class SearchForm extends Component {
  state = {
    inputQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ inputQuery: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputQuery.trim() === '') {
      return toast.error('Please, type something...');
    }

    const { inputQuery } = this.state;
    inputQuery.toLocaleLowerCase().trim();
    this.props.onSubmit(inputQuery);
  };

  render() {
    const { inputQuery } = this.state;

    return (
      <Header>
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Search</Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={inputQuery}
            onChange={this.handleQueryChange}
          />
        </form>
      </Header>
    );
  }
}
