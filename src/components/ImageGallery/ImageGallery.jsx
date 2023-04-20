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
