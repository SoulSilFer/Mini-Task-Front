import React from 'react';
import { Box, CssBaseline, SxProps, Theme } from '@mui/material';
import { Outlet } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

const AuthLayout = ({ children, sx }: Props) => {
  return (
    <Box height="100vh" sx={{ ...sx }}>
      <CssBaseline />
      <Outlet />
      {children}
    </Box>
  );
};

export default AuthLayout;
