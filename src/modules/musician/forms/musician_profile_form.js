import React                     from 'react';
import ChipInput                 from 'material-ui-chip-input';
import TextField                 from '@material-ui/core/TextField';
import InputLabel                from '@material-ui/core/InputLabel';
import FormControl               from '@material-ui/core/FormControl';
import Input                     from '@material-ui/core/Input';
import Select                    from '@material-ui/core/Select';
import MenuItem                  from '@material-ui/core/MenuItem';
import {
  CountryDropdown,
  RegionDropdown
}                                from 'react-country-region-selector';
import * as R                    from 'ramda';
import PropTypes                 from 'prop-types';
import {
  compose,
  withStateHandlers,
  withHandlers,
}                                from 'recompose';
import { graphql }               from 'react-apollo';
import styled                    from 'styled-components';

import GradientButton            from '../../../layouts/gradient_button';
import { currencies }            from '../models/currencies';
import { createProfileMutation } from '../graphql/mutations';
import Alert                     from '../../../layouts/alert';

const MusicianProfileForm = ({
  form: {
    name,
    genres,
    country,
    region,
    currency,
  },
  addChip,
  deleteChip,
  submit,
  handleChange,
  canSubmit,
  hasError,
  hideError,
  errorsList,
  handleReginChange,
}) => (
  <form>
    <MusicianProfileForm.InputsWrapper>
      <MusicianProfileForm.Headline>
        Tell me some information about your band
      </MusicianProfileForm.Headline>
      <TextField
        id="name"
        name="name"
        label="Name"
        type="text"
        margin="normal"
        value={name}
        onChange={handleChange}
        fullWidth
      />
      <ChipInput
        label="Genres"
        placeholder="Type and press enter to add..."
        value={genres || []}
        onAdd={addChip.bind(null, 'genres')}
        onDelete={deleteChip.bind(null, 'genres')}
      />
      <MusicianProfileForm.CountryDropdown
        value={country}
        onChange={handleReginChange.bind(null, 'country')}
      />
      <MusicianProfileForm.RegionDropdown
        country={country}
        value={region}
        onChange={handleReginChange.bind(null, 'region')}
      />
    </MusicianProfileForm.InputsWrapper>
    <MusicianProfileForm.SelectWrapper>
      <InputLabel
        ref={ref => {
          this.InputLabelRef = ref;
        }}
        htmlFor="currency"
      >
        Currency
      </InputLabel>
      <Select
        value={currency}
        onChange={handleChange}
        input={
          <Input
            name="currency"
            id="currency"
          />
        }
      >
        { currencies.map((c, index) => <MenuItem key={index} value={c.code}>{c.name}</MenuItem>) }
      </Select>
    </MusicianProfileForm.SelectWrapper>
    <br />
    <GradientButton
      onClick={submit}
      disabled={!canSubmit}
    >
      Create
    </GradientButton>
    <Alert
      action="created"
      hasError={hasError}
      hideAlert={hideError}
      errorsList={errorsList}
    />
  </form>
);

MusicianProfileForm.InputsWrapper = styled.div`
  display        : flex;
  flex-direction : column;
`;

MusicianProfileForm.Headline = styled.h1`
  font-family : 'Roboto', sans-serif;
  color       : #374142;
  text-align  : center;
  font-weight : 300;
`;

MusicianProfileForm.CountryDropdown = styled(CountryDropdown)`
  background    : #ffff;
  border        : 1px solid #999;
  height        : 33px;
  border-radius : 0;
  outline       : none;
  margin-top    : 2%;
`;

MusicianProfileForm.RegionDropdown = styled(RegionDropdown)`
  background    : #ffff;
  border        : 1px solid #999;
  height        : 33px;
  border-radius : 0;
  outline       : none;
  margin-top    : 2%;
`;

MusicianProfileForm.SelectWrapper = styled(FormControl)`
  width : 100%;
`;

MusicianProfileForm.propTypes = {
  form              : PropTypes.object.isRequired,
  canSubmit         : PropTypes.bool.isRequired,
  submit            : PropTypes.func.isRequired,
  addChip           : PropTypes.func.isRequired,
  deleteChip        : PropTypes.func.isRequired,
  handleChange      : PropTypes.func.isRequired,
  hasError          : PropTypes.bool.isRequired,
  errorsList        : PropTypes.array.isRequired,
  hideError         : PropTypes.func.isRequired,
  handleReginChange : PropTypes.func.isRequired,
};

const canSubmitForm = ({ name, genres, country, region, currency }) => R.all(R.equals(true))([
  !R.isEmpty(genres),
  !R.isEmpty(name),
  !R.isEmpty(country),
  !R.isEmpty(region),
  !R.isEmpty(currency),
]);

const withRecompose = compose(
  graphql(createProfileMutation),
  withStateHandlers(
    ({
      form       = {
        name     : '',
        genres   : [],
        country  : '',
        region   : '',
        currency : '',
      },
      canSubmit  = false,
      errorsList = [],
      hasError   = false,
    }) => ({ form, canSubmit, errorsList, hasError }),
    {
      handleChange : state => ({ target }) => {
        const form = R.assoc(target.name, target.value, state.form);
        return ({
          form,
          canSubmit : canSubmitForm(form),
        });
      },
      handleReginChange : state => (field, value) => {
        const form = R.assoc(field, value, state.form);
        return ({
          form,
          canSubmit     : canSubmitForm(form),
        });
      },
      addChip           : state => (field, value) => {
        const fieldLens = R.lensProp(field);
        const form = R.set(fieldLens, R.compose(R.append(value), R.view(fieldLens))(state.form), state.form);
        return ({
          form,
          canSubmit : canSubmitForm(form),
        });
      },
      deleteChip : state => (field, value, ind) => {
        const form = R.dissocPath([field, ind], (state.form));
        return ({
          form,
          canSubmit : canSubmitForm(form),
        });
      },
      showError          : () => () => ({ hasError: true }),
      hideError          : () => () => ({ hasError: false }),
    },
  ),
  withHandlers({
    submit : ({
      form : {
        name,
        genres,
        country,
        region,
        currency,
      },
      mutate,
      errorsList,
      showError,
    }) => async () => {
      const genresString = genres.toString();
      const response = await mutate({
        variables: {
          name     : name,
          genres   : genresString,
          country  : country,
          region   : region,
          currency : currency,
        }
      });

      const { ok, errors } = response.data.createProfile;

      if (ok) {
        return window.location.reload();
      } else {
        let messageText = null;
        errors.map((msg) => messageText = msg.message);

        if (!errorsList.includes(messageText)) {
          errorsList.push(messageText);
        }
        showError();
        errorsList.pop();
      }
    },
  })
);

export default withRecompose(MusicianProfileForm);
