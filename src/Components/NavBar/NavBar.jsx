import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, InputBase, Box, Menu, MenuItem, Slide, Autocomplete, TextField } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AuthContext } from "../../helpers/AuthContext";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StoreIcon from '@mui/icons-material/Store';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowcaseIcon from '@mui/icons-material/Collections';
import ShowcaseOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import customMenuIcon from '../../assets/AA.png';
import { getShowcasesByUserUid } from '../../helpers/showcaseHelpers';
import { getByFirebaseId } from '../../helpers/userHelpers';
import productHelper from '../../helpers/productHelpers';
import { Try } from '@mui/icons-material';

const { getAllProducts } = productHelper

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

// component for the search bar
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
}));

// component for the input base of the search bar
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

// component for the animated bottom navigation
const AnimatedBottomNav = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'black', // Changed to black
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5em 1.5em',
  fontSize: '1.5em',
  zIndex: 9999,
  '@media (max-width: 50em)': {
    fontSize: '0.7em',
  },
}));

// component for each menu item in the bottom navigation
const AnimatedMenuItem = styled('button')(({ theme, active }) => ({
  all: 'unset',
  flexGrow: 1,
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.55em 0 0.85em',
  color: active ? theme.palette.primary.main : theme.palette.background.default,
}));

// component for the icon in each menu item
const AnimatedIcon = styled('div')(({ theme }) => ({
  width: '2.6em',
  height: '2.6em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '0.3em',
}));

const IconLabel = styled('span')(({ theme, active }) => ({
  fontSize: '0.8em',
  color: active ? theme.palette.primary.main : theme.palette.background.default,
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
  const [showcaseId, setShowcaseId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // effect to handle scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // effect to set the showcase ID based on the user
  useEffect(() => {
    const getShowcaseId = async (retryCount = 0) => {
      if (retryCount >= 3) {
        return;
      }
      if (user && user.uid) {
        try {
          const showcases = await getShowcasesByUserUid(user.uid);
          if (showcases && showcases.length > 0) {
            setShowcaseId(showcases[0].id);
          } else {
            console.log('No showcases found for user');
          }
          const currentUser = await getByFirebaseId(user.uid);
          if (currentUser) {
            setUserId(currentUser.id);
          } else {
            console.log('User not found in backend');
          }
        } catch (error) {
          setTimeout(() => {
            getShowcaseId(retryCount + 1);
          },1000);
          console.error('Error fetching user data:', error);
        }
      }
    }
    getShowcaseId();
  }, [user])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getAllProducts();
        setSearchProducts(products.map(product => ({ ...product, label: product.data.title })));
      } catch (error) {

      }
    }
    getProducts()
  }, [])

  // handle scroll behavior
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

  // handle menu item click
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle logo menu item click
  const handleLogoClick = (event) => {
    if (user) {
      setLogoAnchorEl(event.currentTarget);
    }
  };

  // handle logo menu close
  const handleLogoMenuClose = () => {
    setLogoAnchorEl(null);
  };

  // handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log('Logout error:', error);
    }
    handleClose();
  };

  // handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  // handle bottom navigation item clicks
  const handleItemClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  // toggle search
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const renderOption = (props, option) => (
    <div onClick={() => {
        setSearchQuery("")
        navigate(`/products/${option.ean}`)
      }}><img src={option.data.images[0]} /><span>{option.data.title}</span></div>)

  // define menu items for the bottom navigation
  const menuItems = [
    { icon: <HomeOutlinedIcon />, filledIcon: <HomeIcon />, path: '/', label: 'Home' },
    { icon: <StoreOutlinedIcon />, filledIcon: <StoreIcon />, path: '/marketplace', label: 'Marketplace' },
    { icon: <ShowcaseOutlinedIcon />, filledIcon: <ShowcaseIcon />, path: `/showcases/${showcaseId}`, label: 'Showcase' },
  ];

  // define the top navigation bar
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
        {showSearch ? (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={searchProducts}
            openOnFocus={false}
            sx={{ 
              width: 300,
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
              },
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Search" 
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.87)', // Hover border color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main', // Focused border color
                    },
                  },
                }}
              />
            )}
            value={searchQuery}
            onInputChange={(e, v) => setSearchQuery(v)}
            renderOption={renderOption}
            open={!!searchQuery}
          />
        ) : (
          <Box sx={{ flexGrow: 1 }} />
        )}

        {/* Search and Account icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="large"
            aria-label="search"
            onClick={toggleSearch}
            color="inherit"
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label={user ? "account of current user" : "login/register"}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => navigate(user ? `/profile/${userId}` : '/login')}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );

  // Define the bottom navigation bar
  const BottomBar = (
    <AnimatedBottomNav>
      {menuItems.map((item, index) => (
        <AnimatedMenuItem
          key={index}
          onClick={() => handleItemClick(index, item.path)}
          active={activeIndex === index}
        >
          <AnimatedIcon>
            {React.cloneElement(
              activeIndex === index ? item.filledIcon : item.icon,
              {
                color: activeIndex === index ? 'primary' : 'inherit',
                style: { color: activeIndex === index ? theme.palette.primary.main : theme.palette.background.default },
              }
            )}
          </AnimatedIcon>
          <IconLabel active={activeIndex === index}>{item.label}</IconLabel>
        </AnimatedMenuItem>
      ))}
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
