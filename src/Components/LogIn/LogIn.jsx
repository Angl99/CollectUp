import * as React from 'react';
import { useState, useContext } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import backgroundImage from "../../assets/comicImg.avif";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
    },
    secondary: {
      main: '#e67e22',
    },
    text: {
      primary: '#34495e',
      secondary: '#95a5a6',
    },
    background: {
      default: '#f0f3f5',
    },
  },
});

export default function SignIn() {
  const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData.email, formData.password);
        navigate("/");
    };

    const googleSignIn = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Google sign-in successful");
        navigate("/");
      } catch (error) {
        console.log('Google sign-in error:', error);
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
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(240, 243, 245, 0.925)',
              padding: 3,
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="text.primary">
              Sign in to your account
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', '&:hover': { bgcolor: '#d35400' } }}
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
                sx={{ mb: 2, color: 'secondary.main', '&:hover': { borderColor: 'secondary.main' } }}
                onClick={googleSignIn}
              >
                Sign In with Google
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" color="text.primary">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" color="text.primary">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}