import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchName: '',
    shovModal: false,
    modalImg: '',
  };

  hendlerFormSubmit = name => {
    this.setState({ searchName: name });
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { shovModal: !prevState.shovModal };
    });
  };

  openModal = e => {
    this.toggleModal();
    this.setState({ modalImg: { src: e.target.src, alt: e.target.alt } });
  };

  render() {
    const { searchName, modalImg, shovModal } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.hendlerFormSubmit} />
        <ImageGallery searchName={searchName} openModal={this.openModal} />
        {shovModal && (
          <Modal
            src={modalImg.src}
            alt={modalImg.alt}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
