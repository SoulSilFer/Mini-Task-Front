import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

type Props = {
  titles: {
    name: string;
    value: number;
  }[];
};

const RankingCard: React.FC<Props> = ({ titles }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        bgcolor: 'primary.main',
        border: '1px solid black',
        borderRadius: 1,
        p: 1,
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'primary.dark',
          width: '100%',
          mb: 1,
          borderRadius: 1
        }}
      >
        <Typography color="primary.contrastText">Ranking</Typography>
      </Box>

      {titles.map((title, index) => (
        <Typography key={index} color="primary.contrastText">
          {title.name}: {title.value}
        </Typography>
      ))}
    </Box>
  );
};

export default RankingCard;
