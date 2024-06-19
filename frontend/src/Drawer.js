// src/Drawer.jsx

import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import NotesIcon from '@mui/icons-material/Notes';
import DraftsIcon from '@mui/icons-material/Drafts';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CombinedAuth from './CombinedAuth'; // Assuming CombinedAuth is in './CombinedAuth.jsx'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [authOpen, setAuthOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(null); // null or anchor element
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isLoggedIn = useSelector((state) => state.user.user !== null);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    setAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setAuthOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuOpen(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Optional: remove token from local storage
    dispatch(logout());
    handleAccountMenuClose();
  };

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, link: '/' },
          { text: 'Paid Classes', icon: <SchoolIcon />, link: '/paid-classes' },
          { text: 'Notes', icon: <NotesIcon />, link: '/notes' },
          { text: 'Free Courses', icon: <DraftsIcon />, link: '/work-in-progress' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Previous Year Paper', icon: <MailIcon />, link: '/important-mail' },
          { text: 'Quiz', icon: <MailIcon />, link: '/bin' },
          { text: 'Job Alert', icon: <MailIcon />, link: '/junk' },
          { text: 'Purchase', icon: <ShoppingCartIcon />, link: '/purchase' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'white', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Flex Code
          </Typography>
          {isLoggedIn ? (
            <IconButton
              color="inherit"
              onClick={handleAccountMenuOpen}
              edge="end"
            >
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Permanent drawer for larger screens */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
          open
        >
          <Toolbar />
          {drawer}
        </Drawer>
        {/* Temporary drawer for mobile view */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: { xs: 8, sm: 0 } }}>
        {/* Main content section */}
        {/* Ensure main content has proper padding on mobile view */}
      </Box>

      {/* Account Menu */}
      <Menu
        anchorEl={accountMenuOpen}
        open={Boolean(accountMenuOpen)}
        onClose={handleAccountMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleAccountMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* CombinedAuth Component */}
      {authOpen && <CombinedAuth onClose={handleCloseAuth} />}
    </Box>
  );
}
