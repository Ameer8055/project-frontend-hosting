import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("logintoken");
    sessionStorage.removeItem("user");
  };

  // Navigation Links
  const navLinks = [
    { text: "Viewers", path: "/viewerDetails" },
    { text: "Uploaders", path: "/uploaderDetails" },
    { text: "Logout", path: "/login", action: handleLogout },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="shadow-none bg-transparent">
          <Toolbar>
            {/* Logo */}
            <img src="/Images/video-editing-app.png" alt="Logo" style={{ width: "50px" }} className="mt-2 me-3" />

            {/* Brand Name */}
            <Typography variant="h6" sx={{ flexGrow: 1 }} className="mt-3">
              CINESTREAM
            </Typography>

            {/* Desktop Navigation */}
            <Box className="me-5" sx={{ display: { xs: "none", md: "block" } }}>
              {navLinks.map((link, index) => (
                <Link to={link.path} key={index} onClick={link.action || null}>
                  <Button color="inherit">{link.text}</Button>
                </Link>
              ))}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { xs: "block", md: "none" } }}
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
          <List sx={{ width: 250 }}>
            {navLinks.map((link, index) => (
              <ListItem button key={index} onClick={handleDrawerToggle}>
                <Link to={link.path} style={{ textDecoration: "none", color: "black", width: "100%" }} onClick={link.action || null}>
                  <ListItemText primary={link.text} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default NavbarAdmin;
