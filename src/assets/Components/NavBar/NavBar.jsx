import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, IconButton, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
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
    <AppBar position="fixed">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', width: '75px' }}>
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
        <div style={{ flexGrow: 1 }} />
        {user ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={handleShowcase}>Showcase</MenuItem>
            </Menu>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button size="small" color="inherit" onClick={handleSignUp}>SignUp</Button>
            <Button size="small" color="inherit" onClick={handleLogin}>Login</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}