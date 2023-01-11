import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Oval } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, loading, error, openModal }) => {
  return (
    <>
      {error && <h1>{error.message}</h1>}
      {images && (
        <ul className={css.ImageGallery} onClick={openModal}>
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
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
};
