import React         from 'react';
import PropTypes     from 'prop-types';
import styled        from 'styled-components';
import * as R        from 'ramda';
import breakpoint    from 'styled-components-breakpoint';
import AppBar        from '@material-ui/core/AppBar';
import Toolbar       from '@material-ui/core/Toolbar';
import {
  compose,
  withStateHandlers,
  lifecycle
}                    from 'recompose';
import { Link }      from 'react-router-dom';


import MenuBar       from './menu';
import Logo          from './theme/logo.png';
import Mobile        from './theme/mobile-logo.png';

const Header = ({
  style: {
    position,
  },
}) => (
  <Header.MenuBar position={position}>
    <Header.LogoWrapper to="/" />
    <Header.Toolbar>
      <Header.ToolbarItem>
        Menu
      </Header.ToolbarItem>
      <MenuBar />
    </Header.Toolbar>
  </Header.MenuBar>
);

Header.LogoWrapper = styled(Link)`
  && {
    background         : url(${Mobile}) no-repeat;
    background-size    : 80px 80px;
    height             : 100px;
    width              : 60%;
    margin-top         : 3px;
    outline            : 0;

    ${breakpoint('md')`
      background      : url(${Logo}) no-repeat;
      background-size : 270px 90px;
      width           : 20%;
    `}
  }
`;

Header.MenuBar = styled(AppBar)`
  display        : flex;
  height         : 70px;
  flex-direction : row !important;
  background     : linear-gradient(to right, #723af9, #46aafc) !important;
  box-shadow     : none !important;
  padding        : 0 25px 0 25px;
  position       : ${props => props.position};
`;

Header.Toolbar = styled(Toolbar)`
  justify-content : flex-end;
  width           : 80%;
`;

Header.ToolbarItem = styled.h2`
  font-family : 'Pacifico', cursive;
`;

Header.propTypes = {
  style : PropTypes.object.isRequired,
};

const withState = compose(
  withStateHandlers(
    ({
      style = {
        position : 'relative',
      }
    }) => ({ style }),
    {
      onScroll : state => () => {
        let style = null;
        if (window.scrollY > 650) {
          style = R.assoc('position', 'fixed', state.position);
        } else {
          style = R.assoc('position', 'relative', state.position);
        }
        return ({style});
      },
    },
  ),
  lifecycle({
    componentDidMount() {
      const { onScroll } = this.props;
      window.addEventListener('scroll', onScroll);
    },
    componentWillUnmount() {
      const { onScroll } = this.props;
      return window.removeEventListener('scroll', onScroll);
    },
  })
);

export default withState(Header);
