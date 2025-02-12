import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const NavbarUploader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('logintoken');
    sessionStorage.removeItem('user');
  };

  const navLinks = [
    { text: 'Home', path: '/uploaderhome' },
    { text: 'Upload', path: '/uploadervideo' },
    { text: 'Logout', path: '/login', onClick: handleLogout }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navLinks.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path} onClick={item.onClick}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          {/* Logo */}
          <img src="/Images/video-editing-app.png" alt="Logo" style={{ width: '50px' }} className="mt-2 me-3" />
          
          {/* Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, mt: 2 }}>
            CINESTREAM
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navLinks.map((item, index) => (
              <Button key={index} color="inherit" component={Link} to={item.path} onClick={item.onClick}>
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton color="inherit" aria-label="menu" sx={{ display: { xs: 'block', md: 'none' } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default NavbarUploader;
