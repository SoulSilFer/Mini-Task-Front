import React, { useState, useContext } from 'react';

import { Card, styled, Box, Typography } from '@mui/material';

import { Calendar } from 'components/fields';

const HomePresenter: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <Box sx={{ mt: 3, height: '100%', width: '100%' }} ml={3} mr={3}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          mb={2}
        >
          <Typography variant="h5">Data selecionada:</Typography>

          <Typography variant="h6">
            {selectedDate
              .toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              .replace(/^[a-z]/, (c) => c.toUpperCase())}
          </Typography>
        </Box>

        <Box width="min-content">
          <Calendar onChange={setSelectedDate} />
        </Box>
      </Card>
    </Box>
  );
};

export default HomePresenter;
