import React from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import css from './App.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [shovModal, setShovModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setLoading(true);

    fetch(
      `https://pixabay.com/api/?q=${searchName}&page=1&key=31826070-5147e993357879bd9f8310722&image_type=photo&orientation=horizontal&page=${pageNumber}&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        if (data.hits.length !== 0) {
          setImages(set => [...set, ...data.hits]);
          return;
        }
        setPageNumber(1);
        return Promise.reject(
          new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        );
      })
      .catch(error => {
        setError(error);
        setImages([]);
      })
      .finally(() => setLoading(false));
  }, [searchName, pageNumber]);

  const hendlerFormSubmit = name => {
    setSearchName(name);
    setPageNumber(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShovModal(state => !state);
  };

  const openModal = e => {
    if (e.target !== e.currentTarget) {
      toggleModal();
      setModalImg({ src: e.target.src, alt: e.target.alt });
    }
  };

  const onLoadMore = () => {
    setPageNumber(prev => prev + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={hendlerFormSubmit} />
      <ImageGallery
        images={images}
        loading={loading}
        error={error}
        openModal={openModal}
      />
      {images && images.length >= 12 && !loading && (
        <Button onLoadMore={onLoadMore} />
      )}
      {shovModal && (
        <Modal src={modalImg.src} alt={modalImg.alt} onClose={toggleModal} />
      )}
    </div>
  );
};
