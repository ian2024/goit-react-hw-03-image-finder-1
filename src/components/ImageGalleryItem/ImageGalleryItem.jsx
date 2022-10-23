import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onSelect }) => {
    const { webformatURL, largeImageURL, tags } = item;

    return (
        <img
            src={webformatURL}
            alt={tags}
            onClick={() => onSelect(largeImageURL)}
            className="ImageGalleryItem-image"
        />
    );
}

ImageGalleryItem.propTypes = {
    item: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
};
