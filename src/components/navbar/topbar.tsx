import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, Toolbar, styled, Typography } from '@mui/material';

import {
  AccessibilityNewRounded,
  CalculateRounded,
  ConstructionRounded,
  DeviceThermostatRounded,
  Menu,
  MonetizationOnRounded,
  Settings as SettingsIcon,
  ShuffleRounded
} from '@mui/icons-material';

import { useWindowDimensions } from 'utils/getWindowDimensions';
import { RoutesEnum } from 'utils/routes-enum';
import Logo from '../logo';

const MenuHolder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)',
  backgroundColor: theme.palette.primary.dark,
  borderRadius: '0px 0px 5px 5px',
  color: theme.palette.primary.contrastText,
  display: 'flex',
  minHeight: '25px',
  transition: 'opacity 0.1s ease-in-out',
  padding: '3px',
  flexWrap: 'wrap',
  minWidth: '180px'
}));

const SubMenuHolder = styled(Box)(({ theme, width }) => ({
  width: '100%',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  },
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'row',
  minHeight: 'inherit',
  alignItems: 'center',
  flex: '1 0 max-content',
  cursor: 'pointer',
  marginRight: '10px'
}));

type TopbarProps = {
  handleDrawerToggle?: () => void;
  handleSettingsDrawerToggle: () => void;
  menuPlacement: 'top' | 'side';
};

const Topbar: React.FC<TopbarProps> = ({
  handleDrawerToggle,
  handleSettingsDrawerToggle,
  menuPlacement
}) => {
  const navigate = useNavigate();

  const [subToolsMenu, setSubToolsMenu] = useState<boolean>(false);

  const windowWidth = useWindowDimensions().width;
  const percentOfWidth = windowWidth * 0.4;

  const menus = [
    {
      icon: <ConstructionRounded />,
      path: RoutesEnum.TOOLS_DASHBOARD,
      actions: {
        enter: () => setSubToolsMenu(true),
        leave: () => setSubToolsMenu(false)
      },
      itemsState: subToolsMenu,
      subMenu: [
        {
          icon: <ShuffleRounded />,
          label: 'Pegar aleatório',
          path: RoutesEnum.TOOLS_GET_RANDOM
        },
        {
          icon: <CalculateRounded />,
          label: 'Calculadora',
          path: '/tools/calculate/calculator'
        },
        {
          icon: <MonetizationOnRounded />,
          label: 'Conversão moeda',
          path: '/tools/convert/coin'
        },
        {
          icon: <DeviceThermostatRounded />,
          label: 'Conversão temperatura',
          path: '/tools/convert/temperature'
        },
        {
          icon: <AccessibilityNewRounded />,
          label: 'Calcular IMC',
          path: '/tools/calculate/imc'
        }
      ]
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }} bgcolor="primary.main">
      <Toolbar
        variant="dense"
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {menuPlacement === 'top' ? (
          <Box
            component="img"
            src="/static/logo.png"
            sx={{ height: 45, mr: 2 }}
            p={1}
          />
        ) : (
          <>
            <IconButton
              size="large"
              edge="start"
              color="default"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <Menu
                sx={{
                  color: 'primary.contrastText'
                }}
              />
            </IconButton>
          </>
        )}

        <Box
          alignItems="center"
          flexWrap="nowrap"
          display={menuPlacement === 'top' ? 'flex' : 'none'}
        >
          {menus.map((menu, index) => {
            return (
              <Box position="relative">
                <IconButton
                  size="large"
                  edge="end"
                  sx={{
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    },
                    bgcolor: menu.itemsState ? 'primary.dark' : 'primary.main',
                    zIndex: menu.itemsState ? 1 : 0
                  }}
                  style={{
                    borderRadius: '50% 50% 0px 0px'
                  }}
                  id="tools-menu"
                  onMouseEnter={menu.actions?.enter}
                  onMouseLeave={menu.actions?.leave}
                  key={index}
                  onClick={() =>
                    navigate('/' + menu.path, { state: { all: true } })
                  }
                >
                  {menu.icon}
                </IconButton>

                <MenuHolder
                  onMouseEnter={menu.actions?.enter}
                  onMouseLeave={menu.actions?.leave}
                  sx={{
                    zIndex: 999,
                    visibility: menu.itemsState ? 'visible' : 'hidden',
                    opacity: menu.itemsState ? 1 : 0,
                    width:
                      windowWidth < 840
                        ? `calc(${windowWidth}px - 157px)`
                        : `calc(${windowWidth}px - ${percentOfWidth}px)`
                  }}
                  key={index}
                >
                  {menu.subMenu.map((item, subIndex) => (
                    <SubMenuHolder
                      key={index.toString() + subIndex.toString()}
                      onClick={() => {
                        navigate(item.path, { state: { all: true } });
                      }}
                      sx={{
                        justifyContent:
                          windowWidth > 420 ? 'center' : 'flex-start'
                      }}
                    >
                      {item.icon}
                      <Typography variant="body2">{item.label}</Typography>
                    </SubMenuHolder>
                  ))}
                </MenuHolder>
              </Box>
            );
          })}
        </Box>

        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={handleSettingsDrawerToggle}
            sx={{ margin: '0 2px', color: 'primary.contrastText' }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Topbar;
