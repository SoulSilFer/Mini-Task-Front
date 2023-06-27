import React from 'react';

import { Box, IconButton, Toolbar } from '@mui/material';

import { Settings, NotificationsRounded } from '@mui/icons-material';

type TopbarProps = {
  handleSettingsDrawerToggle: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ handleSettingsDrawerToggle }) => {
  return (
    <Box sx={{ flexGrow: 1 }} bgcolor="primary.main">
      <Toolbar
        variant="dense"
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Box
          component="img"
          src="/static/logo.png"
          sx={{ height: 45, mr: 2 }}
          p={1}
        />

        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={handleSettingsDrawerToggle}
            sx={{ margin: '0 2px', color: 'primary.contrastText' }}
          >
            <NotificationsRounded />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={handleSettingsDrawerToggle}
            sx={{ margin: '0 2px', color: 'primary.contrastText' }}
          >
            <Settings />
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Topbar;
