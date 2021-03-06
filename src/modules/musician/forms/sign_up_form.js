import React              from 'react';
import PropTypes          from 'prop-types';
import TextField          from '@material-ui/core/TextField';
import styled             from 'styled-components';
import * as R             from 'ramda';
import {
  compose,
  withStateHandlers,
  withHandlers,
}                         from 'recompose';
import validator          from 'validator';
import Switch             from '@material-ui/core/Switch';
import FormControlLabel   from '@material-ui/core/FormControlLabel';
import { graphql }        from 'react-apollo';
import {
  withRouter,
}                         from 'react-router-dom';

import Alert              from '../../../layouts/alert';
import GradientButton     from '../../../layouts/gradient_button';
import { signUpMutation } from '../graphql/mutations';

const MusicianSignUpForm = ({
  form: {
    bandName,
    name,
    email,
    password,
    confirmPassword,
    license,
  },
  handleChange,
  canSubmit,
  handleSwitchChange,
  submit,
  hasError,
  hideError,
  errorsList,
}) => (
  <div>
    <MusicianSignUpForm.Headline>
      Sign Up for an Artist Account
    </MusicianSignUpForm.Headline>
    <form>
      <TextField
        id="bandName"
        name="bandName"
        label="Band Name"
        margin="normal"
        value={bandName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id="name"
        name="name"
        label="Name"
        margin="normal"
        value={name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        margin="normal"
        value={email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        margin="normal"
        value={confirmPassword}
        onChange={handleChange}
        fullWidth
      />
      <FormControlLabel
        control={
          <Switch
            color="primary"
            active={license.toString()}
            onChange={handleSwitchChange}
          />
        }
        label="I have read and agree to the Terms of Use."
      />
      <br />
      <GradientButton
        disabled={!canSubmit}
        onClick={submit}
      >
        Sign up
      </GradientButton>
    </form>
    <Alert
      action="created"
      hasError={hasError}
      hideAlert={hideError}
      errorsList={errorsList}
    />
  </div>
);

MusicianSignUpForm.Headline = styled.h1`
  font-family : 'Roboto', sans-serif;
  color       : #374142;
  text-align  : center;
  font-weight : 300;
`;

MusicianSignUpForm.propTypes = {
  form               : PropTypes.object.isRequired,
  canSubmit          : PropTypes.bool.isRequired,
  submit             : PropTypes.func.isRequired,
  handleChange       : PropTypes.func.isRequired,
  handleSwitchChange : PropTypes.func.isRequired,
  hasError           : PropTypes.bool.isRequired,
  errorsList         : PropTypes.array.isRequired,
  hideError          : PropTypes.func.isRequired,
};

const canSubmitForm = ({ bandName, name, email, password, confirmPassword, license }) => R.all(R.equals(true))([
  !R.isEmpty(bandName),
  !R.isEmpty(name),
  validator.isEmail(email),
  validator.isLength(password, { min: 8 }),
  !R.isEmpty(confirmPassword),
  R.equals(password, confirmPassword),
  R.equals(license, true),
]);

const withRecompose = compose(
  withRouter,

  graphql(signUpMutation),

  withStateHandlers(
    ({
      form      = {
        bandName        : '',
        name            : '',
        email           : '',
        password        : '',
        confirmPassword : '',
        license         : false,
      },
      errorsList = [],
      canSubmit = false,
      hasError = false,
    }) => ({ form, canSubmit, hasError, errorsList }),
    {
      handleChange : state => ({ target }) => {
        const form = R.assoc(target.name, target.value, state.form);
        return ({
          form,
          canSubmit : canSubmitForm(form),
        });
      },
      handleSwitchChange : state => () => {
        const form = R.assoc('license', !state.form.license, state.form);
        return ({
          form,
          canSubmit : canSubmitForm(form),
        });
      },
      showError : () => () => ({ hasError: true }),
      hideError : () => () => ({ hasError: false }),
    },
  ),
  withHandlers({
    submit : ({form, errorsList, showError, history, mutate}) => async () => {
      const response = await mutate({
        variables: form,
      });

      const { ok, errors } = response.data.signUp;

      if (ok) {
        return history.push('/login');
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

export default withRecompose(MusicianSignUpForm);
