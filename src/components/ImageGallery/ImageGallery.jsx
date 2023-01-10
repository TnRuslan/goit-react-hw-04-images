import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Oval } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: null,
    pageNumber: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName } = this.props;
    if (prevProps.searchName !== searchName) {
      this.setState({ loading: true, error: null });

      fetch(
        `https://pixabay.com/api/?q=${searchName}&page=1&key=31826070-5147e993357879bd9f8310722&image_type=photo&orientation=horizontal&page=1&per_page=12`
      )
        .then(res => res.json())
        .then(data => {
          if (data.hits.length !== 0) {
            return this.setState({
              images: [...data.hits],
              pageNumber: 2,
            });
          }
          this.setState({ images: null, pageNumber: 1 });
          return Promise.reject(
            new Error(
              'Sorry, there are no images matching your search query. Please try again.'
            )
          );
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onLoadMore = () => {
    this.setState({ loading: true });

    fetch(
      `https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=31826070-5147e993357879bd9f8310722&image_type=photo&orientation=horizontal&page=${this.state.pageNumber}&per_page=12`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            pageNumber: (prevState.pageNumber += 1),
          };
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const { images, pageNumber, loading, error } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        {images && (
          <ul className={css.ImageGallery} onClick={this.props.openModal}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  src={image.largeImageURL}
                  key={image.id}
                  alt={image.tags}
                />
              );
            })}
          </ul>
        )}
        {loading && (
          <div className={css.loader}>
            <Oval
              height={40}
              width={40}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}

        {pageNumber > 1 && !loading && <Button onLoadMore={this.onLoadMore} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
