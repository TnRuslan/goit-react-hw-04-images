import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import css from './App.module.css';
import { useState } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [shovModal, setShovModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const hendlerFormSubmit = name => {
    setSearchName(name);
  };

  const toggleModal = () => {
    setShovModal(state => !state);
  };

  const openModal = e => {
    toggleModal();
    setModalImg({ src: e.target.src, alt: e.target.alt });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={hendlerFormSubmit} />
      <ImageGallery searchName={searchName} openModal={openModal} />
      {shovModal && (
        <Modal src={modalImg.src} alt={modalImg.alt} onClose={toggleModal} />
      )}
    </div>
  );
};
