import React           from 'react';
import styled          from 'styled-components';
import breakpoint      from 'styled-components-breakpoint';
import moment          from 'moment';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { Link }        from 'react-router-dom';
import Button          from '@material-ui/core/Button';

const Section = ({
  id,
  type,
  events,
  products,
  content,
  currency,
  fonts,
  styles,
}) => {
  switch (type) {
  case 'music':
    return(<p>music here</p>);
  case 'merch':
    return(
      <React.Fragment>
        <Section.List>
          {
            products.map(p =>
              <Section.ListItem key={p.id}>
                <Section.ImageWrapper background={process.env.REACT_APP_API_URL + p.url} />
                <Section.ProductName
                  elementfont={fonts}
                  elementstyles={styles}
                >
                  {p.title}
                </Section.ProductName>
                <Section.ProductPrice
                  elementfont={fonts}
                  elementstyles={styles}
                >
                  {p.price + ' ' + currency}
                </Section.ProductPrice>
                <Section.ButtonsWrapper>
                  <Section.Button
                    component={Link}
                    to={`/musicians/${id}/merch/${p.id}`}
                    elementfont={fonts}
                    elementstyles={styles}
                  >
                    Buy now
                  </Section.Button>
                  <Section.Button
                    elementfont={fonts}
                    elementstyles={styles}
                  >
                    <AddShoppingCart />
                    Add
                  </Section.Button>
                </Section.ButtonsWrapper>
              </Section.ListItem>
            )
          }
        </Section.List>
        <Section.ViewMoreWrapper>
          <Button
            variant="contained"
            component={Link}
            to={`/musicians/${id}/merch`}
          >
            View all merch
          </Button>
        </Section.ViewMoreWrapper>
      </React.Fragment>
    );
  case 'events':
    return(
      <div>
        {
          events.map(e =>
            <Section.EventsItem key={e.id}>
              <Section.Cell
                elementfont={fonts}
                elementstyles={styles}
              >
                {moment(e.date).format('D MMM HH:mm')}
              </Section.Cell>
              <Section.Cell
                elementfont={fonts}
                elementstyles={styles}
              >
                {e.title}
              </Section.Cell>
              <Section.Cell
                elementfont={fonts}
                elementstyles={styles}
              >
                {e.address}
              </Section.Cell>
              <Section.Cell
                elementfont={fonts}
                elementstyles={styles}
              >
                {e.price}
              </Section.Cell>
              <Section.Button
                elementfont={fonts}
                elementstyles={styles}
              >
              Tikets
              </Section.Button>
            </Section.EventsItem>
          )
        }
      </div>
    );
  default:
    return(<p>{content}</p>);
  }
};

Section.List = styled.ul`
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

Section.ListItem = styled.li`
  margin : 4%;
`;

Section.ImageWrapper = styled.div`
  width             : 100%;
  height            : 462px;
  background        : url(${props => props.background});
  background-size   : contain;
  background-repeat : no-repeat;
`;

Section.ButtonsWrapper = styled.div`
  display               : grid;
  grid-template-columns : 45% 45%;
`;

Section.Button = styled(Button)`
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

Section.ProductName = styled.h2`
  font-family : ${props => props.elementfont.regularTextFont}, sans-serif;
  font-size   : ${props => props.elementstyles.RegularFontSize}px;
`;

Section.ProductPrice = styled.h3`
  font-family : ${props => props.elementfont.regularTextFont}, sans-serif;
  font-size   : ${props => props.elementstyles.RegularFontSize}px;
`;

Section.EventsItem = styled.div`
  && {
    display        : flex;
    flex-direction : column;
    width          : 100%;

    ${breakpoint('md')`
      display        : flex;
      flex-direction : row;
    `}
  }
`;

Section.Cell = styled.div`
  font-family : ${props => props.elementfont.regularTextFont}, sans-serif;
  font-size   : ${props => props.elementstyles.RegularFontSize}px;
  font-size   : 20px;
  width       : 220px;
  margin      : 2%;
`;

Section.ViewMoreWrapper = styled.div`
  display         : flex;
  flex-direction  : row;
  justify-content : center;
  padding         : 5%;
`;

export default Section;
