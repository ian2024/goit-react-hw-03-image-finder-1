import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, toggleModal }) => {
    if (images.length > 0) {
        return (
            <ul className="ImageGallery">
                {images.map(image => (
                    <li key={image.id} className="ImageGalleryItem">
                        <ImageGalleryItem item={image} onSelect={toggleModal} />
                    </li>
                ))}
            </ul>
        );
    }
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        })
    ),
    toggleModal: PropTypes.func.isRequired,
};