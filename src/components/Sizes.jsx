import React from 'react';
import PropTypes from 'prop-types';
import getProductsByType from '../services/getProductsByType';
import ProductPropTypes from '../PropTypes/ProductPropTypes';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pizzaSizes: [],
    };
  }

  componentDidMount() {
    getProductsByType('sizes').then(({ data }) => {
      this.setSizesState(data);
    });
  }

  setSizesState(data) {
    this.setState({
      pizzaSizes: data,
    });
  }

  render() {
    const { selectedSize, onPizzaSizeSelected, sizeError } = this.props;
    const { pizzaSizes } = this.state;
    return (
      <div className="size">
        <div className="pizza-size" key="pizza-size">
          {pizzaSizes.map((pizzaSize) => {
            const { name, image } = pizzaSize;
            return (
              <div
                className={`img ${name} ${(selectedSize && name === selectedSize.name) ? 'active' : null}`}
                onClick={ () => onPizzaSizeSelected(pizzaSize)}
                key={name}
              >
                <img alt={name} src={image} className="pizzaImg" />
                <span>{`${name}''`}</span>
              </div>
            );
          })}
        </div>
        <div className={`validation-error ${sizeError ? 'active' : null}`} key="error">{sizeError && 'Please selecte one size'}</div>
      </div>
    );
  }
}

Sizes.defaultProps = {
  selectedSize: undefined,
};

Sizes.propTypes = {
  selectedSize: PropTypes.shape(ProductPropTypes),
  onPizzaSizeSelected: PropTypes.func.isRequired,
  sizeError: PropTypes.bool.isRequired,
};

export default Sizes;
