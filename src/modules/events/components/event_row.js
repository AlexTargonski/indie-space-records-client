import React                   from 'react';
import PropTypes               from 'prop-types';
import TableCell               from '@material-ui/core/TableCell';
import IconButton              from '@material-ui/core/IconButton';
import VisibilityIcon          from '@material-ui/icons/Visibility';
import BuildIcon               from '@material-ui/icons/Build';
import TableRow                from '@material-ui/core/TableRow';
import { Link }                from 'react-router-dom';
import ClearIcon               from '@material-ui/icons/Clear';
import styled                  from 'styled-components';
import moment                  from 'moment';
import { graphql }             from 'react-apollo';
import {
  compose,
  withHandlers,
  withStateHandlers,
}                              from 'recompose';
import Alert                   from '../../../layouts/alert';

import { deleteEventMutation } from '../graphql/mutations';

const EventRow = ({
  event: {
    id,
    title,
    country,
    region,
    address,
    date,
    price,
  },
  hasError,
  errorsList,
  hideAlert,
  deleteEvent,
}) => (
  <TableRow>
    <TableCell
      component="th"
      scope="row"
    >
      {title}
    </TableCell>
    <TableCell>{country}</TableCell>
    <TableCell>{region}</TableCell>
    <TableCell>{address}</TableCell>
    <TableCell>{moment(Date.parse(date)).format('DD/MM/YYYY h:mm A')}</TableCell>
    <TableCell numeric>{price}</TableCell>
    <TableCell>
      <EventRow.ActionsWrapper>
        <IconButton component={Link} to={`/events/${id}`}>
          <VisibilityIcon />
        </IconButton>
        <IconButton component={Link} to={`/events/edit/${id}`}>
          <BuildIcon />
        </IconButton>
        <IconButton onClick={deleteEvent}>
          <ClearIcon />
        </IconButton>
      </EventRow.ActionsWrapper>
    </TableCell>
    <Alert
      action="deleted"
      hasError={hasError}
      hideAlert={hideAlert}
      errorsList={errorsList}
    />
  </TableRow>
);

EventRow.ActionsWrapper = styled.div`
  display        : flex;
  flex-direction : row;
`;

EventRow.propTypes = {
  deleteEvent : PropTypes.func.isRequired,
  event       : PropTypes.object.isRequired,
  hideAlert   : PropTypes.func.isRequired,
  errorsList  : PropTypes.array.isRequired,
  hasError    : PropTypes.bool.isRequired,
};

const withRecompose = compose(
  graphql(deleteEventMutation),
  withStateHandlers(
    ({
      hasError   = false,
      errorsList = [],
    }) => ({ hasError, errorsList }),
    {
      showAlert         : () => () => ({ hasError: true }),
      hideAlert         : () => () => ({ hasError: false }),
    },
  ),
  withHandlers({
    deleteEvent : ({ event, mutate, showAlert, errorsList }) => async () => {
      const response = await mutate({
        variables: { eventId : event.id}
      });

      const { ok, errors } = response.data.deleteEvent;

      if (ok) {
        showAlert();
      } else {
        let messageText = null;
        errors.map((msg) => messageText = msg.message);

        if (!errorsList.includes(messageText)) {
          errorsList.push(messageText);
        }
        showAlert();
        errorsList.pop();
      }
    },
  })
);

export default withRecompose(EventRow);
