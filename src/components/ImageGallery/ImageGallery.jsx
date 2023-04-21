import PropTypes from 'prop-types';
import { GalleryList, GalleryImage } from './ImageGalleryStyle';

export const Gallery = ({ images, onImageClick }) => {
  return (
    <GalleryList>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li key={id} onClick={() => onImageClick(largeImageURL)}>
          <GalleryImage src={webformatURL} alt={tags} />
        </li>
      ))}
    </GalleryList>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
