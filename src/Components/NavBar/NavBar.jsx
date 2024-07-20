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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 10,
  width: '100%',
  border: '2px solid black',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const BottomNav = styled(AppBar)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  backgroundColor: 'rgba(52, 73, 94, 0.9)',
  backdropFilter: 'blur(5px)',
}));

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowBottomBar(false);
      setShowTopBar(true);
    } else {
      setShowBottomBar(true);
      setShowTopBar(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log('Logout error:', error);
    }
    handleClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const TopBar = (
    <AppBar position="fixed" sx={{ top: 0, bottom: 'auto', backgroundColor: 'rgba(52, 73, 94, 0.9)' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', width: '75px', color: '#f0f3f5' }}>
            LOGO
          </Typography>
        </Link>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
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

  return (
    <>
      {user ? (
        <Slide appear={false} direction="down" in={showTopBar}>
          {TopBar}
        </Slide>
      ) : (
        TopBar
      )}
      
      {user && (
        <Slide appear={false} direction="up" in={showBottomBar}>
          <BottomNav position="fixed">
            <Toolbar sx={{ justifyContent: 'space-around' }}>
              <IconButton color="inherit" onClick={() => handleNavigation('/')}>
                <HomeIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => handleNavigation('/marketplace')}>
                <StoreIcon />
              </IconButton>
              <IconButton color="inherit" onClick={() => handleNavigation('/showcaseform')}>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircleIcon />
              </IconButton>
            </Toolbar>
          </BottomNav>
        </Slide>
      )}
      
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
        {user ? [
          <MenuItem key="profile" onClick={() => handleNavigation('/profile')}>Profile</MenuItem>,
          <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
        ] : [
          <MenuItem key="login" onClick={() => handleNavigation('/login')}>Register</MenuItem>,
        ]}
      </Menu>
    </>
  );
}