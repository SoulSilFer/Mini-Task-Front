import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { HttpErrorResponsePreValidation } from 'core/entities';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from './useAppDispatch';
import { ActionCreatorWithoutPayload, PayloadAction } from '@reduxjs/toolkit';

const PRE_VALIDATION_ERROR = 'PRE_VALIDATION_ERROR';
const UNAUTHORIZED = 'Unauthorized';
const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
const INVALID_EMAIL_PASSOWRD = 'Nickname/email or password is incorrect.';
const EMAIL_IN_USE = 'emailAlreadyInUse';

const MESSAGE_ERRORS = [
  INVALID_CREDENTIALS,
  PRE_VALIDATION_ERROR,
  UNAUTHORIZED,
  INVALID_EMAIL_PASSOWRD,
  EMAIL_IN_USE
];

type Props = {
  watcher: HttpErrorResponsePreValidation | undefined;
  callback: () => PayloadAction<undefined, any>;
};

const capitalizeFirstLetter = (msg: string): string => {
  return msg.charAt(0).toUpperCase() + msg.slice(1);
};

export function useAppError({ watcher, callback }: Props): void {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const presentError = (msg: string): void => {
    enqueueSnackbar(
      <span data-cy="snack_error" id="snack_error">
        {capitalizeFirstLetter(t(msg))}
      </span>,
      { variant: 'error' }
    );
  };

  useEffect(() => {
    if (watcher) {
      // Mensagens "genericas"
      if (MESSAGE_ERRORS.includes(watcher.message)) {
        presentError(watcher.message);
      } else if (watcher.message === PRE_VALIDATION_ERROR) {
        if (watcher.description.errors.length === 1) {
          // Quando possui apenas um campo inválido
          presentError(watcher.description.errors[0].message);
        } else {
          // Quando possui vários campos inválidos
          presentError(watcher.message);
        }
      } else {
        // Problemas com o servidor
        presentError('INTERNAL_SERVER_ERROR');
        // navigate('500')
      }

      dispatch(callback());
    }
  }, [watcher]);
}
