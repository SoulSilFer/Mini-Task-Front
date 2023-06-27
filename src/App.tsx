import React, { useContext } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { SettingsContextProvider } from 'core/contexts/theme-context';
import { Theme } from 'components';
import './i18n';

import PagesProvider, { PagesContext } from './pages/PagesProvider';
import SignInWrapper from 'pages/signin/signin-wrapper';
import SignUpWrapper from 'pages/signup/signup-wrapper';
import AuthLayout from 'layouts/auth';
import HomeWrapper from 'pages/home/home-wrapper';
import AppLayout from 'layouts/app';

export const routes = {
  signin: (
    <AuthLayout
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SignInWrapper />
    </AuthLayout>
  ),
  signup: (
    <AuthLayout
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SignUpWrapper />
    </AuthLayout>
  ),
  config: <div>config</div>,
  home: (
    <AppLayout>
      <HomeWrapper />
    </AppLayout>
  )
};

function App(): React.ReactElement {
  return (
    <StyledEngineProvider>
      <SettingsContextProvider>
        <Theme>
          <SnackbarProvider maxSnack={3}>
            <PagesProvider>
              <InnerApp />
            </PagesProvider>
          </SnackbarProvider>
        </Theme>
      </SettingsContextProvider>
    </StyledEngineProvider>
  );
}

function InnerApp(): React.ReactElement {
  const { currentRoute } = useContext(PagesContext);

  return routes[currentRoute];
}

export default App;
