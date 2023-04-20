import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Backdrop, ImageModal, Image } from './ModalStyle';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return createPortal(
      <Backdrop onClick={this.handleBackdropClick}>
        <ImageModal>
          <Image src={largeImageURL} alt="Image" />
        </ImageModal>
      </Backdrop>,
      modalRoot
    );
  }
}
