import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

import Topbar from 'components/navbar/topbar';
import SettingsDrawer from 'components/navbar/setttings';
import Sidebar from 'components/navbar/sidebar';

type Props = {
  dashboard?: boolean;
};

const AppLayout: React.FC<Props> = ({ dashboard }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [menuPlace, setMenuPlace] = useState<'top' | 'side'>('top');

  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);
  const handleToggleSettingsDrawer = (): void => setSettingsOpen(!settingsOpen);
  const handleMenuPlacement = (value: 'top' | 'side') => {
    setMenuPlace(value);
  };
  const drawerWidth = 280;

  useEffect(() => {
    if (localStorage.getItem('menuPlacement')) {
      setMenuPlace(localStorage.getItem('menuPlacement') as 'top' | 'side');
    }
  }, [handleMenuPlacement]);

  const sideMenu = menuPlace === 'side';

  return (
    <Box
      sx={{
        bgcolor: 'background.neutral'
      }}
    >
      <CssBaseline />

      <Topbar
        handleDrawerToggle={handleDrawerToggle}
        handleSettingsDrawerToggle={handleToggleSettingsDrawer}
        menuPlacement={menuPlace}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        menuPlacement={menuPlace}
      />

      <Box
        sx={{
          pl: sideMenu ? { xl: `${drawerWidth}px` } : 0
        }}
      >
        {dashboard ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                mb: '100px',
                height: '70vh'
              }}
            >
              <Outlet />
            </Box>
          </>
        ) : (
          <Box
            sx={{
              m: 2
            }}
          >
            <Outlet />
          </Box>
        )}
      </Box>

      <SettingsDrawer
        open={settingsOpen}
        onClose={handleToggleSettingsDrawer}
        menuPlacement={handleMenuPlacement}
        menuPlacementValue={menuPlace}
      />
    </Box>
  );
};

export default AppLayout;
