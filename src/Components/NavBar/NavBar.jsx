import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography, Menu, MenuItem, IconButton, InputBase, Collapse } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#f0f3f5', 0.15),
  '&:hover': {
    backgroundColor: alpha('#f0f3f5', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '95%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
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

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleSignUp = () => {
    navigate("/signup");
    handleClose();
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  const handleShowcase = () => {
    navigate("/showcaseForm");
    handleClose();
  }

  return (
    <AppBar position="fixed" overflow="" sx={{ backgroundColor: '#34495e' }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', width: '75px', color: '#f0f3f5' }}>
            LOGO
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Collapse in={isSearchOpen} timeout="auto" unmountOnExit>
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: '#f0f3f5' }}
              />
            </Search>
          </Collapse>
          <IconButton color="inherit" onClick={handleSearchClick} sx={{ color: '#f0f3f5' }}>
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: '#f0f3f5' }}
          >
            {user ? <AccountCircle /> : <MoreIcon />}
          </IconButton>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {user ? (
            [
              <MenuItem key="showcase" onClick={handleShowcase}>Showcase</MenuItem>,
              <MenuItem key="profile" onClick={handleProfile}>Profile</MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
            ]
          ) : (
            [
              <MenuItem key="login" onClick={handleLogin}>Register</MenuItem>
            ]
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}