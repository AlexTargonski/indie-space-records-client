import React                  from 'react';
import PropTypes              from 'prop-types';
import styled                 from 'styled-components';
import breakpoint             from 'styled-components-breakpoint';
import { graphql }            from 'react-apollo';
import AddShoppingCart        from '@material-ui/icons/AddShoppingCart';
import { Link }               from 'react-router-dom';
import {
  compose,
  withHandlers,
  withState,
}                             from 'recompose';
import CircularProgress       from '@material-ui/core/CircularProgress';
import InfiniteScroll         from 'react-infinite-scroller';
import { withRouter }         from 'react-router-dom';
import Button                 from '@material-ui/core/Button';

import { fetchProductsQuery } from '../../merch/graphql/queries';
import withTheme              from '../HOCs/with_theme';

const AllMerchPage = ({
  theme: {
    style,
    fonts,
    sections,
  },
  currency,
  data: {
    loading,
    Products = [],
  },
  match: {
    params: {
      id
    }
  },
  loadMore,
  hasMore,
}) => (
  <AllMerchPage.Wrapper
    profileFonts={JSON.parse(fonts)}
    profileStyles={JSON.parse(style)}
    sectionStyles={JSON.parse(sections.find((element) => element.type === 'merch').style)}
  >
    {
      loading ?
        <CircularProgress />
        :
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<CircularProgress key={0} />}
          useWindow={true}
        >
          <AllMerchPage.List>
            {
              Products.map(product =>
                <AllMerchPage.ProductItem key={product.id}>
                  <AllMerchPage.ImageWrapper background={process.env.REACT_APP_API_URL + product.url} />
                  <p>{product.title}</p>
                  <p>{product.price} {currency}</p>
                  <AllMerchPage.ButtonsWrapper>
                    <AllMerchPage.Button
                      component={Link}
                      to={`/musicians/${id}/merch/${product.id}`}
                      elementfont={JSON.parse(fonts)}
                      elementstyles={JSON.parse(style)}
                    >
                      Buy now
                    </AllMerchPage.Button>
                    <AllMerchPage.Button
                      elementfont={JSON.parse(fonts)}
                      elementstyles={JSON.parse(style)}
                    >
                      <AddShoppingCart />
                      Add
                    </AllMerchPage.Button>
                  </AllMerchPage.ButtonsWrapper>
                </AllMerchPage.ProductItem>
              )
            }
          </AllMerchPage.List>
        </InfiniteScroll>
    }
  </AllMerchPage.Wrapper>
);

AllMerchPage.propTypes = {
  theme    : PropTypes.object.isRequired,
  data     : PropTypes.object.isRequired,
  currency : PropTypes.string.isRequired,
  loadMore : PropTypes.func.isRequired,
  hasMore  : PropTypes.bool.isRequired,
};

AllMerchPage.Wrapper = styled.div`
  background-color : ${props => props.sectionStyles.background};
  color            : ${props => props.sectionStyles.color};
  padding          : 5% 8%;
  font-family      : ${props => props.profileFonts.regularTextFont}, sans-serif;
  font-size        : ${props => props.profileStyles.RegularFontSize}px;
`;

AllMerchPage.List = styled.ul`
  && {
    display        : flex;
    flex-direction : column;
    list-style     : none;
    padding        : 0;
    margin         : 0;

    ${breakpoint('md')`
      display               : grid;
      grid-template-columns : 33% 33% 33%;
    `}
  }
`;

AllMerchPage.ProductItem = styled.li`
  margin : 5%;
`;

AllMerchPage.ImageWrapper = styled.div`
  width             : 100%;
  height            : 462px;
  background        : url(${props => props.background});
  background-size   : contain;
  background-repeat : no-repeat;
`;

AllMerchPage.Button = styled(Button)`
  && {
    font-family      : ${props => props.elementfont.linksFont}, sans-serif;
    background-color : ${props => props.elementstyles.buttonsBackground};
    height           : 62px;
    color            : ${props => props.elementstyles.buttonsColor};
    border           : ${props => props.elementstyles.border}px solid;
    border-radius    : ${props => props.elementstyles.borderRadius}px;
    margin           : 0 5%;
    padding          : 1% 5%;

    &:hover {
      color      : ${props => props.elementstyles.LinksHover};
      background : transparent;
    }
  }
`;

AllMerchPage.ButtonsWrapper = styled.div`
  display               : grid;
  grid-template-columns : 45% 45%;
`;

const withRecompose = compose(
  withRouter,
  withTheme,
  graphql(fetchProductsQuery, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        profileId : props.id,
        offset    : 0,
      },
    }),
  }),
  withState('hasMore', 'setHasMore', true),
  withHandlers(
    {
      loadMore : ({ data, setHasMore }) => () => {
        data.fetchMore({
          variables : {
            offset : data.Products.length,
          },

          updateQuery : (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult;
            }

            if (fetchMoreResult.Products.length < 6) {
              setHasMore(false);
            }

            return {
              ...previousResult,
              Products: [...previousResult.Products, ...fetchMoreResult.Products],
            };
          },
        });
      }
    },
  ),
);

export default withRecompose(AllMerchPage);
