import * as React from 'react';
import { useState, useContext } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, Tabs, Tab, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import GoogleIcon from '@mui/icons-material/Google';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import LockPersonSharp from '@mui/icons-material/LockPersonSharp';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { create } from '../../helpers/userHelpers';

const auth = getAuth();

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Register() {
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupStep, setSignupStep] = useState(1);
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login, signup, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLoginChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
    navigate("/");
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('Google sign-in successful');
      navigate("/");
    } catch (error) {
      console.log('Google sign-in error:', error);
    }
  };

  const handleNextEmail = () => { 
    if (email !== confirmEmail) {
      setShowEmailAlert(true);
      return;
    }
    setShowEmailAlert(false);
    setSignupStep(signupStep + 1);
  };

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setShowNameAlert(true);
      return;
    }
    setShowNameAlert(false);
    setSignupStep(signupStep + 1);
  };

  const handleBack = () => {
    setSignupStep(signupStep - 1);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setShowPasswordAlert(true);
      return;
    }

    setShowPasswordAlert(false);

    try {
      await create({ firstName, lastName, email });
      console.log("User added successfully");
    } catch (error) {
      console.log('Error adding user:', error);
    }

    try {
      await signup(email, password);
      console.log("Signup successful");
      navigate("/");
    } catch (error) {
      console.log('Signup error:', error);
    }
  };

  const renderSignupStep = () => {
    switch(signupStep) {
      case 1:
        return (
          <>
            {showNameAlert && (
              <Alert severity="error" onClose={() => setShowNameAlert(false)} sx={{ mb: 2 }}>
                Please enter first and last name.
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: '#ffffff', }}
            >
              Next
            </Button>
          </>
        );
      case 2:
        return (
          <>
            {showEmailAlert && (
              <Alert severity="error" onClose={() => setShowEmailAlert(false)} sx={{ mb: 2 }}>
                Please make sure emails match.
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmEmail"
                  label="Confirm Email Address"
                  name="confirmEmail"
                  autoComplete="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={handleNextEmail}
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: '#ffffff'}}
            >
              Next
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleBack}
              sx={{ mt: 1, mb: 2, color: 'primary.main', borderColor: 'primary.main' }}
            >
              Back
            </Button>
          </>
        );
      case 3:
        return (
          <>
            {showPasswordAlert && (
              <Alert severity="error" onClose={() => setShowPasswordAlert(false)} sx={{ mb: 2 }}>
                Please make sure passwords match.
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSignupSubmit}
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: '#ffffff' }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleBack}
              sx={{ mt: 1, mb: 2, color: 'primary.main', borderColor: 'primary.main' }}
            >
              Back
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{
      background: `linear-gradient(to bottom, #3498db 0%, #95a5a6 100%)`,
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(240, 243, 245, 0.925)',
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              {tabValue === 0 ? <LoginSharpIcon /> : <LockPersonSharp />}
            </Avatar>
            <Typography component="h1" variant="h5" color="text.primary">
              {tabValue === 0 ? "Sign in to your account" : "Let's get your account set up!"}
            </Typography>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs">
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleLoginChange}
                  value={loginData.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleLoginChange}
                  value={loginData.password}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: 'primary.main'}}
                >
                  Sign In
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
                  <Box sx={{ flex: 1, height: 2, bgcolor: 'text.disabled' }} />
                  <Typography variant="body2" sx={{ px: 2 }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: 2, bgcolor: 'text.disabled' }} />
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ mb: 2, color: 'primary.main', '&:hover': { borderColor: 'secondary.main' } }}
                  onClick={handleGoogleSignIn}
                >
                  Sign In with Google
                </Button>
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                {renderSignupStep()}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 2 }}>
                  <Box sx={{ flex: 1, height: 2, bgcolor: 'text.disabled' }} />
                  <Typography variant="body2" sx={{ px: 2 }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: 2, bgcolor: 'text.disabled' }} />
                </Box>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{ mb: 2, color: 'primary.main', borderColor: 'primary.main' }}
                  onClick={handleGoogleSignIn}
                >
                  Sign Up with Google
                </Button>
              </Box>
            </TabPanel>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}