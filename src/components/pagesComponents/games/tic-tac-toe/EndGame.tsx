import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  handleSubmit: () => void;
  title: string;
};

const EndGameTicTacToe: React.FC<Props> = ({ title, handleSubmit }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <Typography variant="h4" color="text.secondary">
        {title}
      </Typography>

      <Button
        variant="contained"
        sx={{
          borderRadius: '0.75rem'
        }}
        onClick={handleSubmit}
      >
        {t('newGame')}
      </Button>
    </Box>
  );
};

export default EndGameTicTacToe;
