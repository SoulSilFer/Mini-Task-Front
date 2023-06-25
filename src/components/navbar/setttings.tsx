import React from 'react';
import {
  Drawer,
  Divider,
  Toolbar,
  Box,
  Typography,
  IconButton,
  SvgIcon,
  TextField,
  MenuItem
} from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';
import { useSettings } from 'core/contexts/theme-context';
import { useTranslation } from 'react-i18next';
import { BaseTextField } from 'components/fields';

type Props = {
  onClose: () => void;
  open: boolean;
  menuPlacement: (value: 'top' | 'side') => void;
  menuPlacementValue: 'top' | 'side';
};

const Settings: React.FC<Props> = ({
  onClose,
  open,
  menuPlacement,
  menuPlacementValue
}) => {
  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  const handleChangeLanguage = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    void i18n.changeLanguage(value);
  };

  const handleMenuPlacement = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    let formValue = value as 'top' | 'side';
    menuPlacement(formValue);
  };

  const { lightMode, switchThemeMode } = useSettings();

  return (
    <Drawer
      open={open}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box'
        }
      }}
      onClose={onClose}
    >
      <Toolbar>
        <Box
          display="flex"
          flexGrow={1}
          flexWrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{t('settings')}</Typography>

          <IconButton onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Box>
      </Toolbar>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mt: 3, width: '100%', px: 3 }}
        gap={3}
      >
        <BaseTextField
          select
          label={t('language')}
          fullWidth
          value={selectedLanguage}
          onChange={handleChangeLanguage}
          name="language"
        >
          <MenuItem value="pt-BR">{t('portuguese')}</MenuItem>
          <MenuItem value="en-US">{t('english')}</MenuItem>
        </BaseTextField>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mt: 3, width: '100%', px: 3 }}
        gap={3}
      >
        <BaseTextField
          select
          label={t('theme')}
          fullWidth
          value={lightMode ? 'light' : 'dark'}
          onChange={switchThemeMode}
          name="theme"
        >
          <MenuItem value="light">{t('light')}</MenuItem>
          <MenuItem value="dark">{t('dark')}</MenuItem>
        </BaseTextField>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mt: 3, width: '100%', px: 3 }}
        gap={3}
      >
        <BaseTextField
          select
          label="Local do Menu de itens"
          fullWidth
          value={menuPlacementValue}
          onChange={handleMenuPlacement}
          name="menu"
        >
          <MenuItem value="side">Esquerdo</MenuItem>
          <MenuItem value="top">Superior</MenuItem>
        </BaseTextField>
      </Box>
    </Drawer>
  );
};

export default Settings;
