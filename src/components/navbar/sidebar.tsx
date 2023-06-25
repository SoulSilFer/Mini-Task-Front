import React from 'react';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material';

import { Dashboard as DashboardIcon } from '@mui/icons-material';

import Logo from '../logo';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  drawerWidth: number;
  open: boolean;
  handleDrawerToggle: () => void;
  menuPlacement: 'top' | 'side';
};

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  open,
  handleDrawerToggle,
  menuPlacement
}) => {
  const navigate = useNavigate();

  const sections = [
    { name: 'Ferramentas', path: '/tools', Icon: DashboardIcon }
  ];

  const drawer = (
    <Grid>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Logo />
      </Box>

      <List>
        {sections.map(({ name, path, Icon }) => (
          <ListItem
            key={name}
            onClick={() => navigate(path)}
            sx={{
              color: 'text.secondary',
              borderRadius: 1,
              py: 1.5,
              pl: 2.5,
              pr: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover, &.Mui-selected': {
                color: 'primary.main',
                bgcolor: 'action.hover'
              },
              '&.Mui-selected': {
                bgcolor: 'background.neutral'
              }
            }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { lg: 'block', xl: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'background.neutral'
          }
        }}
      >
        {drawer}
      </Drawer>

      {menuPlacement === 'side' && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', xl: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: 'background.neutral',
              marginTop: '48px'
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
