import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, InputBase, Box, Menu, MenuItem, Slide, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import customMenuIcon from '../../assets/AA.png';

// Create a custom theme for the NavBar
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#95a5a6',
    },
    accent: {
      main: '#623c8c',
    },
    text: {
      primary: '#34495e',
    },
    background: {
      default: '#f0f3f5',
    },
  },
});

// Styled component for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.default, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.default, 1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 10,
  width: '100%',
  border: '3px solid black',
}));

// Styled component for the search icon wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled component for the input base of the search bar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// Styled component for the animated bottom navigation
const AnimatedBottomNav = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5em 2.85em',
  fontSize: '1.5em',
  zIndex: 9999,
  '@media (max-width: 50em)': {
    fontSize: '0.8em',
  },
}));

// Styled component for each menu item in the bottom navigation
const AnimatedMenuItem = styled('button')(({ theme, active, bgColorItem }) => ({
  all: 'unset',
  flexGrow: 1,
  zIndex: 100,
  display: 'flex',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.55em 0 0.85em',
  transition: 'transform 0.7s',
  transform: active ? 'translate3d(0, -0.8em, 0)' : 'none',
  '&::before': {
    content: '""',
    zIndex: -1,
    width: '4.2em',
    height: '4.2em',
    borderRadius: '50%',
    position: 'absolute',
    transform: active ? 'scale(1)' : 'scale(0)',
    transition: 'background-color 0.7s, transform 0.7s',
    backgroundColor: active ? bgColorItem : 'transparent',
  },
}));

// Styled component for the icon in each menu item
const AnimatedIcon = styled('svg')(({ theme, active }) => ({
  width: '2.6em',
  height: '2.6em',
  strokeMiterlimit: 10,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeDasharray: 400,
  animation: active ? 'strok 1.5s reverse' : 'none',
  '@keyframes strok': {
    '100%': {
      strokeDashoffset: 400,
    },
  },
}));

// Styled component for the border of the active menu item
const MenuBorder = styled('div')(({ theme, activeIndex }) => ({
  left: 0,
  bottom: '99%',
  width: '10.9em',
  height: '2.4em',
  position: 'absolute',
  clipPath: 'url(#menu)',
  willChange: 'transform',
  backgroundColor: theme.palette.primary.main,
  transition: 'transform 0.7s',
  transform: `translate3d(${activeIndex * 5.45}em, 0, 0)`,
}));

export default function NavBar() {
  // Get user and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State variables for menu controls and navigation bar visibility
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoAnchorEl, setLogoAnchorEl] = useState(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Effect to handle scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Function to handle scroll behavior
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowBottomBar(false);
      setShowTopBar(true);
    } else {
      setShowBottomBar(true);
      setShowTopBar(true);
    }

    setLastScrollY(currentScrollY);
  };

  // Functions to handle menu interactions
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = (event) => {
    if (user) {
      setLogoAnchorEl(event.currentTarget);
    }
  };

  const handleLogoMenuClose = () => {
    setLogoAnchorEl(null);
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log('Logout error:', error);
    }
    handleClose();
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  // Function to handle bottom navigation item clicks
  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  // Define menu items for the bottom navigation
  const menuItems = [
  { icon: <HomeIcon />, path: '/', bgColor: theme.palette.primary.main },
  { icon: <StoreIcon />, path: '/marketplace', bgColor: theme.palette.primary.main },
  { icon: <AddCircleIcon />, path: '/genItem', bgColor: theme.palette.primary.main },
  { icon: <AccountCircleIcon />, path: `/profile`, bgColor: theme.palette.primary.main },
  ];

  // Define the top navigation bar
  const TopBar = (
    <AppBar position="fixed" sx={{ top: 0, bottom: 'auto', backgroundColor: alpha(theme.palette.primary.main, 0.9) }}>
      <Toolbar>
        {user ? (
          // Logo button for logged-in users
          <IconButton
            onClick={handleLogoClick}
            sx={{ 
              color: 'black', 
              mr: 2,
              width: '64px',
              height: '64px',
              padding: 0,
              overflow: 'hidden',
            }}
          >
          <Box
            component="img"
            src={customMenuIcon}
            alt="Menu"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </IconButton>
        ) : (
          // Logo button for non-logged-in users
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
            onClick={handleLogoClick}
            sx={{ 
              color: 'black', 
              mr: 2,
              width: '64px',
              height: '64px',
              padding: 0,
              overflow: 'hidden',
            }}
          >
          <Box
            component="img"
            src={customMenuIcon}
            alt="Menu"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </IconButton>
          </Link>
        )}
        {/* Search bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {/* More options menu for non-logged-in users */}
        {!user && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );

  // Define the bottom navigation bar
  const BottomBar = (
    <AnimatedBottomNav>
      {menuItems.map((item, index) => (
        <AnimatedMenuItem
          key={index}
          active={activeIndex === index}
          bgColorItem={item.bgColor}
          onClick={() => handleItemClick(index, item.path)}
        >
          <AnimatedIcon viewBox="0 0 24 24" active={activeIndex === index}>
            {item.icon}
          </AnimatedIcon>
        </AnimatedMenuItem>
      ))}
      <MenuBorder activeIndex={activeIndex} />
      <svg width="0" height="0">
        <defs>
          <clipPath id="menu" clipPathUnits="objectBoundingBox">
            <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
              c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
              c9.2,3.6,17.6,4.2,23.3,4H6.7z" />
          </clipPath>
        </defs>
      </svg>
    </AnimatedBottomNav>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Render top bar with slide animation for logged-in users */}
      {user ? (
        <Slide appear={false} direction="down" in={showTopBar}>
          {TopBar}
        </Slide>
      ) : (
        TopBar
      )}
      {/* Logo menu for logged-in users */}
      <Menu
        anchorEl={logoAnchorEl}
        open={Boolean(logoAnchorEl)}
        onClose={handleLogoMenuClose}
      >
        <MenuItem onClick={() => { handleLogout(); handleLogoMenuClose(); }}>Logout</MenuItem>
      </Menu>

      {/* More options menu for non-logged-in users */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!user && [
          <MenuItem key="login" onClick={() => handleNavigation('/login')}>Register</MenuItem>,
        ]}
      </Menu>

      {/* Render bottom bar with slide animation for logged-in users */}
      {user && (
        <Slide appear={false} direction="up" in={showBottomBar}>
          {BottomBar}
        </Slide>
      )}
    </ThemeProvider>
  );
}
