import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendelKeyDown);
  }

  hendelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.hendleClickBackdrop}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
