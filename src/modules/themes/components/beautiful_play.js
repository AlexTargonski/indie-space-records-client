import React           from 'react';
import styled          from 'styled-components';
import breakpoint      from 'styled-components-breakpoint';
import moment          from 'moment';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import {
  BeautifulPlayStyle,
  BeautifulPlayFont
}                      from '../models/themes_styles';

import SetTheme        from './set_theme';
import {
  EVENTS,
  PRODUCTS,
}                      from '../models/beautiful_play';

const BeautifulPlay = () => (
  <div>
    <SetTheme
      style={BeautifulPlayStyle}
      fonts={BeautifulPlayFont}
    />
    <BeautifulPlay.ThemeWrapper>
      <BeautifulPlay.Navigation>
        <BeautifulPlay.NavItems>
          <BeautifulPlay.NavItem>
            <BeautifulPlay.Link href="">About</BeautifulPlay.Link>
          </BeautifulPlay.NavItem>
          <BeautifulPlay.NavItem>
            <BeautifulPlay.Link href="">Merch</BeautifulPlay.Link>
          </BeautifulPlay.NavItem>
          <BeautifulPlay.NavItem>
            <BeautifulPlay.Link href="">Events</BeautifulPlay.Link>
          </BeautifulPlay.NavItem>
        </BeautifulPlay.NavItems>
      </BeautifulPlay.Navigation>
      <BeautifulPlay.Header>
        <BeautifulPlay.Headline>
          Lorem Ipsum
        </BeautifulPlay.Headline>
        is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
        <br />
        when an unknown printer took a galley of type and scrambled
        <br />
        it to make a type specimen book.
      </BeautifulPlay.Header>
      <BeautifulPlay.FirstSection>
        <h2>Merch</h2>
        <BeautifulPlay.List>
          {
            PRODUCTS.map(p =>
              <BeautifulPlay.ListItem key={p.id}>
                <BeautifulPlay.ImageWrapper background={'https://www.hypebot.com/.a/6a00d83451b36c69e201b8d13ade89970c-800wi'} />
                <h2>
                  {p.name}
                </h2>
                <h3>
                  {p.price}
                </h3>
                <BeautifulPlay.ButtonsWrapper>
                  <BeautifulPlay.Button>
                    Buy now
                  </BeautifulPlay.Button>
                  <BeautifulPlay.Button>
                    <AddShoppingCart />
                    Add
                  </BeautifulPlay.Button>
                </BeautifulPlay.ButtonsWrapper>
              </BeautifulPlay.ListItem>
            )
          }
        </BeautifulPlay.List>
      </BeautifulPlay.FirstSection>
      <BeautifulPlay.SecondSection>
        <h2>Upcoming Shows</h2>
        {
          EVENTS.map(e =>
            <BeautifulPlay.EventsItem key={e.id}>
              <BeautifulPlay.Cell>
                {moment().format('D MMM HH:mm')}
              </BeautifulPlay.Cell>
              <BeautifulPlay.Cell>
                {e.name}
              </BeautifulPlay.Cell>
              <BeautifulPlay.Cell>
                {e.address}
              </BeautifulPlay.Cell>
              <BeautifulPlay.Cell>
                {e.price}
              </BeautifulPlay.Cell>
              <BeautifulPlay.TiketsButton>
                tikets
              </BeautifulPlay.TiketsButton>
            </BeautifulPlay.EventsItem>
          )
        }
      </BeautifulPlay.SecondSection>
      <BeautifulPlay.ThirdSection>
        tracks and albums here
      </BeautifulPlay.ThirdSection>
    </BeautifulPlay.ThemeWrapper>
  </div>
);

BeautifulPlay.ThemeWrapper = styled.div`
  color       : #0d0228;
  font-family : 'Roboto', sans-serif;
`;

BeautifulPlay.Navigation = styled.div`
  position   : absolute;
  width      : 100%;
  text-align : center;
`;

BeautifulPlay.NavItems = styled.ul`
  margin  : 0;
  padding : 0;
`;

BeautifulPlay.Link = styled.a`
  && {
    color           : #ffff;
    text-decoration : none;
    font-weight     : 600;

    &:hover {
      color : #021528;
    }
  }
`;

BeautifulPlay.NavItem = styled.li`
  display : inline-block;
  padding : 2%;
`;

BeautifulPlay.FirstSection = styled.div`
  background : #021528;
  padding    : 5% 8%;
  color      : #ffff;
`;

BeautifulPlay.ThirdSection = styled.div`
  min-height : 400px;
  background : #2f3737;
  padding    : 5% 8%;
  padding    : 2%;
`;

BeautifulPlay.Header = styled.div`
  background          : url('https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/S15GBCm/videoblocks-colorful-blue-flat-3d-abstract-background-seamless-loop-for-your-text-or-logo-fashion-and-music-background-illustration-background-for-children-or-babies-creative-animated-pattern-background-ocean-and-sea-background-waves-background_r2qhdlicg_thumbnail-full01.png');
  padding             : 15% 10%;
  display             : flex;
  flex-direction      : column;
  justify-content     : center;
  color               : #ffff;
  font-size           : 20px;
  background-size     : cover;
  background-position : bottom;
  background-repeat   : no-repeat;
`;

BeautifulPlay.Headline = styled.div`
  font-size : 60px;
`;

BeautifulPlay.SecondSection = styled.div`
  min-height : 400px;
  background : #061b40;
  padding    : 5% 8%;
  color      : #fff;
`;

BeautifulPlay.List = styled.ul`
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

BeautifulPlay.ListItem = styled.li`
  margin : 4%;
`;

BeautifulPlay.ImageWrapper = styled.div`
  width             : 100%;
  height            : 462px;
  background        : url(${props => props.background});
  background-size   : contain;
  background-repeat : no-repeat;
`;

BeautifulPlay.ButtonsWrapper = styled.div`
  display               : grid;
  grid-template-columns : 45% 45%;
`;

BeautifulPlay.Button = styled.button`
  background : transparent;
  height     : 62px;
  color      : #ffff;
  font-size  : 20px;
  border     : solid;
  margin     : 0 5%;
  cursor     : pointer;
  padding    : 5px 35px;
`;

BeautifulPlay.EventsItem = styled.div`
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

BeautifulPlay.Cell = styled.div`
  font-size : 20px;
  width     : 220px;
  margin    : 2%;
`;

BeautifulPlay.TiketsButton = styled.button`
  background : transparent;
  color      : #ffff;
  border     : solid;
  width      : 100px;
  height     : 45px;
`;

export default BeautifulPlay;
