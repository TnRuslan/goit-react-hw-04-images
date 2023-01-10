import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  onInputChange = e => {
    this.setState(prevState => ({
      searchName: e.target.value,
    }));
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.searchName.trim() === '') {
      this.reset();
      return;
    }

    this.props.onSubmit(this.state.searchName);
    this.reset();
  };

  reset = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onFormSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <span className={css.SearchForm__button_label}>Search</span>
          </button>

          <input
            name="searchInput"
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
