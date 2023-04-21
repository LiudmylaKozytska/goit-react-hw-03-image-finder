import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineImageSearch } from 'react-icons/md';

import { Header, Input, Button } from './SearchbarStyle';

export default class SearchForm extends Component {
  state = {
    inputQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ inputQuery: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputQuery.trim() === '') {
      return toast.error('Please, type something...');
    }

    const { inputQuery } = this.state;
    inputQuery.toLowerCase().trim();
    this.props.onSubmit(inputQuery);
  };

  render() {
    const { inputQuery } = this.state;
    return (
      <Header>
        <form
          onSubmit={e => {
            this.handleSubmit(e);
          }}
        >
          <Button type="submit">
            <MdOutlineImageSearch />
          </Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
            value={inputQuery}
          />
        </form>
      </Header>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
