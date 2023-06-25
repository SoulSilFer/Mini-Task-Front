import React, { useState, useContext } from 'react';

import {
  Box,
  Typography,
  Link,
  Container,
  SelectChangeEvent,
  Grid,
  IconButton,
  Card
} from '@mui/material';
import { BaseSelect, BaseTextField } from 'components/fields';
import { BaseButton } from 'components/buttons';
import {
  InitialSignUpValues,
  InitialUserSecurityQuestions,
  QuestionsSelectData,
  SignUpType,
  UserSecurityQuestion,
  SecurityQuestionsEnum,
  PostSignUpType
} from 'types';
import { HandleBaseInputChange } from 'utils';
import { PagesContext } from 'pages/PagesProvider';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { ArrowBack } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from 'hooks';
import { onCreateUser, onCreateUserClear } from 'core/redux/reducers';
import { CreateUserParams } from 'core/entities';
import { useAppError } from 'hooks/useAppError';
import { useSnackbar } from 'notistack';

const SignUpPresenter: React.FC = () => {
  const dispatch = useAppDispatch();
  const snackBar = useSnackbar().enqueueSnackbar;
  const { updateCurrentPage } = useContext(PagesContext);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [values, setValues] = useState<SignUpType>(InitialSignUpValues);
  const [apiErrors, setApiErrors] = useState<string[]>(['']);
  const [emailAlreadyInUse, setEmaiAlreadyInUse] = useState<boolean>(false);

  const handleSelectChange = (e: SelectChangeEvent<unknown>): void => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const { answer, email, password, question, repeatPassword, userName } =
    values;

  const diffPasswords = password !== repeatPassword && repeatPassword !== '';
  const notValidEmail = email !== '' && !emailRegex.test(email);

  const disableButton =
    !answer ||
    !email ||
    !password ||
    !question ||
    !repeatPassword ||
    !userName ||
    (password !== '' && password.length < 8) ||
    diffPasswords ||
    notValidEmail;

  const handleSubmit = () => {
    const submitObject: CreateUserParams = {
      email,
      password,
      userName,
      securityQuestions: [
        {
          answer,
          question
        }
      ]
    };

    dispatch(onCreateUser(submitObject));
  };

  const { createUser, createUserError, createUserLoad } = useAppSelector(
    (state) => state.createUser
  );

  useEnhancedEffect(() => {
    if (createUserError) {
      if (createUserError.message === 'emailAlreadyInUse') {
        setEmaiAlreadyInUse(true);
        setApiErrors(['']);
      } else {
        let apiErrors = createUserError.message as unknown as string[];
        setApiErrors(apiErrors);
        setEmaiAlreadyInUse(false);
      }
    }
  }, [createUserError]);

  const apiErrs = apiErrors[0] !== '' || emailAlreadyInUse;

  useEnhancedEffect(() => {
    setApiErrors(['']);
    setEmaiAlreadyInUse(false);
    dispatch(onCreateUserClear());
  }, [values]);

  useEnhancedEffect(() => {
    if (createUser) {
      dispatch(onCreateUserClear());

      snackBar(<span id="snack_success">Conta criada com sucesso</span>, {
        variant: 'success',
        autoHideDuration: 3000
      });

      setTimeout(() => {
        updateCurrentPage('signin');
        setValues(InitialSignUpValues);
        setApiErrors(['']);
        setEmaiAlreadyInUse(false);
      }, 1500);
    }
  }, [createUser]);

  return (
    <Container
      sx={{
        p: 2,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 9,
          '& > :not(style)': {
            mb: 2
          },
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" sx={{ placeSelf: 'center' }}>
          Criar cadastro
        </Typography>

        <BaseTextField
          label="Nome do usuário"
          name="userName"
          fullWidth
          value={userName}
          handleChange={(e) => HandleBaseInputChange(e, values, setValues)}
        />

        <BaseTextField
          label="E-mail"
          name="email"
          fullWidth
          value={email}
          handleChange={(e) => HandleBaseInputChange(e, values, setValues)}
          error={notValidEmail || emailAlreadyInUse}
          helperText={
            (notValidEmail ? 'O e-mail não é válido' : '') ||
            (emailAlreadyInUse ? 'O e-mail já está sendo utilizado' : '')
          }
        />

        <BaseTextField
          label="Senha"
          name="password"
          fullWidth
          type="password"
          value={password}
          handleChange={(e) => HandleBaseInputChange(e, values, setValues)}
          error={password !== '' && password.length < 8}
          helperText={
            password !== '' && password.length < 8
              ? 'A senha precisa ter no mínimo 8 caracteres'
              : ''
          }
        />

        <BaseTextField
          label="Repetir senha"
          name="repeatPassword"
          fullWidth
          type="password"
          helperText={diffPasswords ? 'As senhas precisam ser iguais' : ''}
          error={diffPasswords}
          value={repeatPassword}
          handleChange={(e) => HandleBaseInputChange(e, values, setValues)}
        />

        <BaseSelect
          fullWidth
          id="question"
          label="Pergunta de segurança"
          name="question"
          onChange={handleSelectChange}
          value={question}
          data={QuestionsSelectData}
        />

        <BaseTextField
          label="Resposta"
          name="answer"
          fullWidth
          value={answer}
          handleChange={(e) => HandleBaseInputChange(e, values, setValues)}
        />

        {createUserError && (
          <Typography color="error" variant="body1">
            Ocorreu um erro ao criar o usuário. Tente novamente!
            <br />
            {apiErrors[0] !== '' &&
              apiErrors.map((message) => {
                return (
                  <>
                    - {message} <br />
                  </>
                );
              })}
          </Typography>
        )}

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <BaseButton
            title="cancelar"
            sx={{
              width: '45% !important'
            }}
            type="button"
            onClick={() => updateCurrentPage('signin')}
          />

          <BaseButton
            title="Criar cadastro"
            sx={{
              width: '45% !important'
            }}
            type="submit"
            onClick={handleSubmit}
            disabled={disableButton || apiErrs || createUser ? true : false}
            loading={createUserLoad}
          />
        </Box>
      </Card>
    </Container>
  );
};

export default SignUpPresenter;
