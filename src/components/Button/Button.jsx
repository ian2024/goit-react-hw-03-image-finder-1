import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => (
    <button type="button" onClick={onLoadMore} className="Button">Load Morreeeee</button>
);

Button.propTypes = {
    onLoadMore: PropTypes.func.isRequired
};
