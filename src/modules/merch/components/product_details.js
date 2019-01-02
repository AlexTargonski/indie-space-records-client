import React                from 'react';
import PropTypes            from 'prop-types';
import styled               from 'styled-components';
import breakpoint           from 'styled-components-breakpoint';
import { graphql }          from 'react-apollo';
import { compose }          from 'recompose';
import Button               from '@material-ui/core/Button';
import ShoppingCart         from '@material-ui/icons/ShoppingCart';

import { viewProductQuery } from '../graphql/queries';

const ProductDetails = ({
  data: {
    viewProduct = {}
  },
}) => (
  <ProductDetails.Wrapper>
    <ProductDetails.ImageWrapper>
      <ProductDetails.Image
        src={`http://localhost:8080/${viewProduct.url}`}
        alt=""
      />
    </ProductDetails.ImageWrapper>
    <ProductDetails.DetailsBlock>
      <h1>{viewProduct.title}</h1>
      <h2>{viewProduct.price} $</h2>
      <h3>{viewProduct.type}</h3>
      <p>{viewProduct.desc}</p>
      <ProductDetails.AddToCart
        disabled={!viewProduct.quantity}
      >
        <ShoppingCart />
        Add to cart
      </ProductDetails.AddToCart>
    </ProductDetails.DetailsBlock>
  </ProductDetails.Wrapper>
);

ProductDetails.Wrapper = styled.div`
  && {
    display        : flex;
    flex-direction : column;
    font-family    : 'Roboto', sans-serif;
    color          : #3c3c3e;

    ${breakpoint('md')`
      flex-direction : row;
    `}
  }
`;

ProductDetails.DetailsBlock = styled.div`
  display        : flex;
  flex-direction : column;
  padding        : 4%;
`;

ProductDetails.ImageWrapper = styled.div`
  width   : 50%;
  display : block;
  padding : 4%;
`;

ProductDetails.Image = styled.img`
  width  : 100%
  height : auto;
`;

ProductDetails.AddToCart = styled(Button)`
  && {
    width         : 300px;
    border        : 0;
    background    : ${ props => props.disabled ? '#ffff' : '#4e96fb'};
    color         : #ffff;
    padding       : 15px 30px;
    border-radius : 30px;
    font-size     : 20px;

    &:hover {
      color      : #4e96fb;
      background : #ffff;
    }
  }
`;

ProductDetails.propTypes = {
  id   : PropTypes.number.isRequired,
  data : PropTypes.object.isRequired,
};

const withRecompose = compose(
  graphql(viewProductQuery, {
    options: (ownProps) => ({
      variables: {
        productId: ownProps.id
      }
    })
  }),
);

export default withRecompose(ProductDetails);