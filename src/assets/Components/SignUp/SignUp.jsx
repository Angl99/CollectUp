import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../helpers/AuthContext";
import backgroundImage from "../../helpers/photo-1620928572438-075c466c48da.avif";
import Alert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {

  }
});

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [showNameAlert, setShowNameAlert] = useState(false);
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNextEmail = () => { 
    if (email !== confirmEmail) {
        setShowEmailAlert(true);
        return;
    }
    setShowEmailAlert(false);
    setStep(step + 1);
    console.log(step);
  };

  const handleNext = () => {
    if (!firstName.trim() || !lastName.trim()) {
        setShowNameAlert(true);
        return;
    }
    setShowNameAlert(false);
    setStep(step + 1);
    console.log(step);
  };

  const handleBack = () => {
    setStep(step - 1);
    console.log(step);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        setShowPasswordAlert(true);
        return;
      }

      setShowPasswordAlert(false);

      try {
        await signup(email, password);
        console.log("Signup successful");
        navigate("/");
      } catch (error) {
        console.log('Signup error:', error);
      }
  };

  const handleGoogleSignIn = async () => {
      try {
        await googleSignIn();
        console.log("Google sign-in successful");
        navigate("/");
      } catch (error) {
        console.log('Google sign-in error:', error);
      }
  };

  const renderStep = () => {
      switch(step) {
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
                          sx={{ mt: 3, mb: 2 }}
                      >
                          Next
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
                          onClick={handleGoogleSignIn}
                          sx={{ mb: 2 }}
                      >
                          Sign in with Google
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
                          sx={{ mt: 3, mb: 2 }}
                      >
                          Next
                      </Button>

                      <Button
                          fullWidth
                          variant="outlined"
                          onClick={handleBack}
                          sx={{ mt: 1, mb: 2 }}
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
                          variant="outlined"
                          onClick={handleBack}
                          sx={{ mt: 1, mb: 2 }}
                      >
                          Back
                      </Button>
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={handleSubmit}
                          sx={{ mt: 3, mb: 2 }}
                      >
                          Sign Up
                      </Button>
                      
                  </>
              );
          default:
              return null;
      }
  };

  return (
      <Box sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.925)',
                        padding: 3,
                        borderRadius: 2,
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Let's get your account set up!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        {renderStep()}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
      </Box>
  );
}