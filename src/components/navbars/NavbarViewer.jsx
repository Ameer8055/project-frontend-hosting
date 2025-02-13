import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  TextField,
  Hidden,
  ListItemText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { LogOutIcon } from "lucide-react";

const NavbarViewer = ({ onGenreChange, onSearch }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [genreAnchorEl, setGenreAnchorEl] = useState(null); // For genre menu
  const [drawerOpen, setDrawerOpen] = useState(false); // For drawer
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const subscriptionStatus = user.subscription; // Assuming 'subscription' is the key
    if (subscriptionStatus === "premium") {
      setIsPremium(true);
    }
  }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    onGenreChange(genre);
    onSearch(searchQuery); // Trigger search when genre changes
    setGenreAnchorEl(null); // Close the menu after selection
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleGenreMenuOpen = (event) => {
    setGenreAnchorEl(event.currentTarget); // Open the menu on hover
  };

  const handleGenreMenuClose = () => {
    setGenreAnchorEl(null); // Close the menu when not hovering
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        className="pb-2 shadow-none"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          backdropFilter: "blur(5px)", 
        }}
      >
        <Toolbar>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <img
            src="/Images/video-editing-app.png"
            alt="Logo"
            style={{ width: "50px" }}
            className="mt-2 me-3"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="me-4 text-white"
          >
            CINESTREAM
          </Typography>

          <Button
            className="me-2"
            sx={{
              color: "white",
              marginRight: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              fontSize: "10px",
              padding: "10px 5px",
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            All Movies
          </Button>
          {/* Genre Button visible on all screen sizes */}
          <Box
            onMouseEnter={handleGenreMenuOpen}
            onMouseLeave={handleGenreMenuClose}
            sx={{ position: "relative" }}
          >
            <Button
              sx={{
                color: "white",
                marginRight: 2,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                fontSize: "12px",
                padding: "8px 5px",
              }}
            >
              GENRE
            </Button>
            <Menu
              anchorEl={genreAnchorEl}
              open={Boolean(genreAnchorEl)}
              onClose={handleGenreMenuClose}
              MenuListProps={{ onMouseLeave: handleGenreMenuClose }}
              sx={{
                mt: 1,
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(5, 5, 5, 0.9)",
                  color: "white",
                },
              }}
            >
              <MenuItem onClick={() => handleGenreChange("action")}>
                Action
              </MenuItem>
              <MenuItem onClick={() => handleGenreChange("Comedy")}>
                Comedy
              </MenuItem>
              <MenuItem onClick={() => handleGenreChange("thriller")}>
                Thriller
              </MenuItem>
              <MenuItem onClick={() => handleGenreChange("romance")}>
                Romance
              </MenuItem>
              <MenuItem onClick={() => handleGenreChange("Drama")}>
                Drama
              </MenuItem>
              <MenuItem onClick={() => handleGenreChange("horror")}>
                Horror
              </MenuItem>
              <MenuItem onClick={() => handleGenreChange("Sci-fi")}>
                Sci-Fi
              </MenuItem>
            </Menu>
          </Box>

          {/* Other elements (hidden on small screens) */}
          <Hidden mdDown>
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search movies..."
              variant="outlined"
              size="small"
              sx={{
                marginRight: 1,
                marginLeft: 2,
                minWidth: 60,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff",
                  },
                },
              }}
            />
            <Button
              onClick={handleSearch}
              sx={{
                marginRight: 2,
                padding: "8px 5px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                },
              }}
            >
              <SearchIcon />
            </Button>

            {/* Premium button visible only on larger screens */}
            {!isPremium && (
              <Link to={"/viewerpayment"}>
                <Button
                  sx={{
                    marginRight: 2,
                    backgroundColor: "rgba(255, 193, 7, 0.8)",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(255, 193, 7, 1)",
                    },
                  }}
                >
                  Premium
                </Button>
              </Link>
            )}

            <Link to={"/login"}>
              <Button
                onClick={() => {
                  sessionStorage.clear();
                }}
                sx={{
                  marginRight: 2,
                  backgroundColor: "rgba(215, 71, 27, 0.95)",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "rgb(255, 28, 7)",
                  },
                }}
              >
                <LogOutIcon />
              </Button>
            </Link>
          </Hidden>
        </Toolbar>
      </AppBar>

      {/* Drawer for small screens */}
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {!isPremium && (
            <ListItem button component={Link} to={"/viewerpayment"}>
              <ListItemText primary="Premium" />
            </ListItem>
          )}
          <ListItem
            button
            component={Link}
            to={"/login"}
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem>
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search movies..."
              variant="outlined"
              size="small"
              sx={{
                marginRight: 1,
                marginLeft: 2,
                minWidth: 60,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffffff",
                  },
                },
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default NavbarViewer;
