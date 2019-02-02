import React                             from 'react';
import PropTypes                         from 'prop-types';
import { compose }                       from 'recompose';
import { withRouter }                    from 'react-router';
import { graphql }                       from 'react-apollo';
import CircularProgress                  from '@material-ui/core/CircularProgress';
import { Helmet }                        from 'react-helmet';

import { profileThemeWithSectionsQuery } from '../graphql/queries';
import FullMerchList                     from '../components/full_merch_list';

const MusicianMerchPage = ({
  data: {
    loading,
    fetchProfile = {}
  },
}) => (
  <React.Fragment>
    {
      loading ?
        <CircularProgress />
        :
        <React.Fragment>
          <Helmet>
            <link href={`https://fonts.googleapis.com/css?family=${JSON.parse(fetchProfile.theme.fonts).regularTextFont}`} rel="stylesheet" />
          </Helmet>
          <FullMerchList profile={fetchProfile} />
        </React.Fragment>
    }
  </React.Fragment>
);

MusicianMerchPage.propTypes = {
  data  : PropTypes.object.isRequired,
  match : PropTypes.object.isRequired,
};

const withRecompose = compose(
  withRouter,
  graphql(profileThemeWithSectionsQuery, {
    options: (props) => ({
      variables: {
        profileId: props.match.params.id
      }
    })
  }),
);

export default withRecompose(MusicianMerchPage);
