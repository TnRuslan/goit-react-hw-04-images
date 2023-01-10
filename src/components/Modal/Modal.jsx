import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ src, alt, onClose }) => {
  const hendleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const hendelKeyDown = e => {
      console.log(e.code);
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', hendelKeyDown);

    return () => {
      window.removeEventListener('keydown', hendelKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.Overlay} onClick={hendleClickBackdrop}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
