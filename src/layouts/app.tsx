import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

import Topbar from 'components/navbar/topbar';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const handleToggleSettingsDrawer = (): void => setSettingsOpen(!settingsOpen);

  return (
    <Box>
      <CssBaseline />
      <Outlet />

      <Topbar handleSettingsDrawerToggle={handleToggleSettingsDrawer} />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: '100px',
          height: '70vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
