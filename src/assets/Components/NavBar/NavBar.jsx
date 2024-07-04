import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CollectUp
        </Typography>
        </Link>
        {user ? (
          <>
            <Button color="inherit" onClick={handleProfile}>Profile</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleSignUp}>Sign Up</Button>
            <Button color="inherit" onClick={handleLogin}>Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}