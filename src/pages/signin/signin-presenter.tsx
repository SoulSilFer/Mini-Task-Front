import React, { useState, useContext } from 'react';

import { Typography, Link, Container, Card } from '@mui/material';
import { BaseTextField } from 'components/fields';

import { BaseButton } from 'components/buttons';
import { InitialLoginValues, LoginType } from 'types';
import { HandleBaseInputChange } from 'utils';
import { PagesContext } from 'pages/PagesProvider';
import { useAppDispatch, useAppSelector } from 'hooks';
import { onAuth, onAuthClear } from 'core/redux/reducers';
import { useAppError } from 'hooks/useAppError';

const SigninPresenter: React.FC = () => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<LoginType>(InitialLoginValues);
  const { updateCurrentPage } = useContext(PagesContext);

  const { email, password } = values;

  const disableButton = !email || !password;

  const handleSubmit = () => {
    dispatch(onAuth({ email, password }));
  };

  const { auth, authError, authLoad } = useAppSelector(
    (state) => state.authentication
  );

  useAppError({
    watcher: authError,
    callback: onAuthClear
  });

  return (
    <Container sx={{ p: 2 }}>
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 9
        }}
      >
        <BaseTextField
          label="E-mail"
          name="email"
          fullWidth
          sx={{ mb: 3 }}
          value={values.email}
          onChange={(e) => {
            HandleBaseInputChange(e, values, setValues);
          }}
          type="e-mail"
        />

        <BaseTextField
          label="Senha"
          name="password"
          fullWidth
          value={values.password}
          sx={{ mb: 2 }}
          onChange={(e) => {
            HandleBaseInputChange(e, values, setValues);
          }}
          type="password"
        />

        <Typography
          variant="body2"
          color="text.secondary"
          alignSelf="flex-start"
          ml={0.5}
          mb={3}
        >
          Não possue uma conta?{' '}
          <Link onClick={() => updateCurrentPage('signup')}>Cadastre-se</Link>
        </Typography>

        <BaseButton
          title="Entrar"
          sx={{
            width: '50%'
          }}
          disabled={disableButton}
          type="submit"
          onClick={handleSubmit}
        />
      </Card>
    </Container>
  );
};

export default SigninPresenter;
