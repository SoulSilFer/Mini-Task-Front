import React from 'react';

import { Box, Stack, Typography, IconButton, Button } from '@mui/material';
import { BaseButton } from 'components/buttons';
import { useWindowDimensions } from 'utils/getWindowDimensions';

type Props = {
  title: string;
  onClick?: () => void;
  mainIcon: JSX.Element;
  stackButtons?: {
    icon: JSX.Element;
    title: string;
    onClick: () => void;
  }[];
};

const DashboardSubCard: React.FC<Props> = ({
  title,
  onClick,
  mainIcon,
  stackButtons
}) => {
  const windowWidth = useWindowDimensions().width;

  return (
    <>
      <Box
        sx={{
          maxWidth: 'max-content'
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '0.75rem',
            textTransform: 'none'
          }}
          onClick={onClick}
          startIcon={mainIcon}
          key={title}
        >
          {title}
        </Button>
      </Box>

      <Box>
        {stackButtons && (
          <>
            {stackButtons.map((item, index) => (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '0.75rem',
                  textTransform: 'none'
                }}
                onClick={item.onClick}
                startIcon={item.icon}
                key={index}
              >
                {item.title}
              </Button>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default DashboardSubCard;
