import React                       from 'react';
import PropTypes                   from 'prop-types';
import styled                      from 'styled-components';
import { graphql }                 from 'react-apollo';
import CircularProgress            from '@material-ui/core/CircularProgress';

import AboutProfile                from '../components/about_profile';
import { myProfileWithThemeQuery } from '../graphql/queries';

const MusicianProfileDetails = ({
  data: {
    loading,
    myProfile = {},
  }, 
}) => (
  <React.Fragment>
    <MusicianProfileDetails.ProfileWrapper>
      {
        loading ?
          <CircularProgress />
          :
          <React.Fragment>
            <AboutProfile
              key={myProfile.id}
              profile={myProfile}
            />
          </React.Fragment>
      }
    </MusicianProfileDetails.ProfileWrapper>
  </React.Fragment>
);

MusicianProfileDetails.ProfileWrapper = styled.div`
  display        : flex;
  flex-direction : row;
  width          : 100%;
  background     : #eaedf5;
`;

MusicianProfileDetails.propTypes = {
  data : PropTypes.object.isRequired,
};

export default graphql(myProfileWithThemeQuery)(MusicianProfileDetails);
