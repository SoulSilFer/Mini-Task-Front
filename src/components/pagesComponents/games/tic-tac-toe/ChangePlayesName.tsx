import React from 'react';

import { Box, Button, Stack } from '@mui/material';
import { BaseTextField } from 'components/fields';
import { useTranslation } from 'react-i18next';

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueP1: string;
  valueP2: string;
  handleSubmit: () => void;
  handleCancel: () => void;
};

const ChangePlayesNameTicTacToe: React.FC<Props> = ({
  handleChange,
  valueP1,
  valueP2,
  handleSubmit,
  handleCancel
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <BaseTextField
        handleChange={handleChange}
        label="Player 1"
        value={valueP1}
        name="player1"
      />

      <BaseTextField
        handleChange={handleChange}
        label="Player 2"
        value={valueP2}
        name="player2"
      />

      <Stack direction="row" width={'100%'} justifyContent="space-between">
        <Button
          variant="contained"
          sx={{
            borderRadius: '0.75rem'
          }}
          onClick={handleCancel}
        >
          {t('cancel')}
        </Button>

        <Button
          variant="contained"
          sx={{
            borderRadius: '0.75rem'
          }}
          onClick={handleSubmit}
        >
          {t('confirm')}
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePlayesNameTicTacToe;
