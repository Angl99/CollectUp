import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Grid, Stack } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Explore, AddBox, AccountBalanceWallet } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import data from '../../mockData/data.json'
import customBanner from '../../assets/AAfull.png';

// Define a custom theme for the Home component
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db', // Blue
    },
    secondary: {
      main: '#95a5a6', // Light gray
    },
    accent: {
      main: '#623c8c', // Purple
    },
    text: {
      primary: '#34495e', // Dark blue
    },
    background: {
      default: '#f0f3f5', // Light blue-gray
    },
  },
});

export default function Home() {
    // Create an array of listings from items in the data
    const listings = data.slice(0, 3).map(item => ({
        title: item.items[0].title,
        description: item.items[0].description || "No description available",
        price: item.items[0].offers[0].price,
        image: item.items[0].images[0],
        publisher: item.items[0].publisher || "Publisher not available"
    }));

    const popularSeries = [
        {
            title: "Popular Series 1",
            description: "Description",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Popular Series 2",
            description: "Description",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Popular Series 3",
            description: "Description",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Popular Series 4",
            description: "Description",
            image: "https://via.placeholder.com/300x200"
        }
    ];

    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/marketplace');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100vw', overflowX: 'hidden', backgroundColor: '#f0f3f5' }}>
                {/* Custom banner section */}
                {/* <Box sx={{
                    width: '100%',
                    backgroundImage: `url(${customBanner})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#623c8c',
                    height: { xs: '250px', sm: '350px', md: '450px' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                    marginTop: { xs: '75px', sm: '75px', md: '75px' },
                }}>
                </Box> */}

                {/* Brief Introduction section */}
                <Box sx={{
                    my: 9,
                    p: 8,
                    background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.accent.main} 90%)`,
                    color: 'white',
                    borderRadius: 2,
                    maxWidth: '4xl',
                    mx: 'auto'
                }}>
                    <Typography variant="h2" sx={{ mb: 4 }}>
                        Discover Anime & Manga Collectibles
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Welcome to Auction Alley, where anime enthusiasts and manga collectors unite. 
                        Explore, buy, and sell extraordinary items from your favorite series and artists.
                    </Typography>
                    <Box component="ul" sx={{ listStyleType: 'disc', pl: 4 }}>
                        <li>Rare manga volumes and special editions</li>
                        <li>Authentic collectibles</li>
                        <li>Connect with fellow otaku and collectors</li>
                    </Box>

                    <Button 
                        variant="outlined" 
                        color="primary" 
                        startIcon={<Explore />}
                        sx={{ mt: 3, backgroundColor: 'white', color: 'primary.main' }}
                        onClick={handleExploreClick}
                    >
                        Explore Marketplace
                    </Button>
                </Box>

                {/* Categories section */}
                <Box sx={{ my: 8, mx: 'auto', maxWidth: '4xl' }}>
                    <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>Categories</Typography>
                    <Grid container spacing={3}>
                        {[
                            { name: 'Manga', icon: '📚' },
                            { name: 'Anime Art', icon: '🎨' },
                            { name: 'Figurines', icon: '🗿' },
                            { name: 'Merchandise', icon: '👕' },
                        ].map((category) => (
                            <Grid item xs={6} sm={3} key={category.name}>
                                <Button 
                                    variant="outlined" 
                                    sx={{ width: '100%', height: '6rem', fontSize: '1.125rem' }}
                                    startIcon={<span style={{ fontSize: '1.5rem' }}>{category.icon}</span>}
                                >
                                    {category.name}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Suggestions section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" color="#34495e">
                        Suggestions
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        {/* Carousel for suggested items */}
                        <Carousel indicators={false} navButtonsAlwaysVisible={false}>
                            {listings.map((item, i) => <Item key={i} item={item} />)}
                        </Carousel>
                    </Box>
                </Box>

                {/* Popular Series section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                    backgroundColor: '#ffffff',
                }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center" color="#34495e">
                        Popular Series
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        {/* Carousel for popular series */}
                        <Carousel
                            indicators={true}
                            navButtonsAlwaysVisible={true}
                            animation="slide"
                            autoPlay={false}
                            cycleNavigation={true}
                            navButtonsProps={{
                                style: {
                                    backgroundColor: '#3498db',
                                    borderRadius: 0
                                }
                            }}
                            indicatorIconButtonProps={{
                                style: {
                                    padding: '5px',
                                    color: '#95a5a6'
                                }
                            }}
                            activeIndicatorIconButtonProps={{
                                style: {
                                    backgroundColor: '#3498db'
                                }
                            }}
                        >
                            {popularSeries.map((series, index) => (
                                <PopularSeriesItem key={index} series={series} />
                            ))}
                        </Carousel>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

// Component for rendering individual items in the Suggestions carousel
function Item(props) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image container */}
            <Box sx={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img 
                    src={props.item.image} 
                    alt={props.item.title} 
                    style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain',
                        paddingTop: '10px'
                    }}
                />
            </Box>
            {/* Content container */}
            <Box p={2} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <Typography variant="h6" color="#34495e">{props.item.title}</Typography>
                    <Typography variant="subtitle2" color="#95a5a6" sx={{ mb: 1 }}>{props.item.publisher}</Typography>
                    <Typography variant="body2" color="#95a5a6">{props.item.description}</Typography>
                </div>
                <div>
                    <Typography variant="subtitle1" fontWeight="bold" color="#34495e" sx={{ mt: 1 }}>${props.item.price}</Typography>
                    <Button 
                        className="CheckButton"
                        sx={{
                            backgroundColor: '#623c8c',
                            color: '#ffffff',
                            mt: 1
                        }}
                    >
                        Check it out
                    </Button>
                </div>
            </Box>
        </Paper>
    );
}

// Component for rendering individual items in the Popular Series carousel
function PopularSeriesItem({ series }) {
    return (
        <Paper elevation={3} sx={{ backgroundColor: '#ffffff', height: '100%' }}>
            <img src={series.image} alt={series.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
            <Box p={2}>
                <Typography variant="h6" color="#34495e">{series.title}</Typography>
                <Typography variant="body2" color="#95a5a6">{series.description}</Typography>
                <Button 
                    sx={{
                        mt: 2,
                        backgroundColor: '#3498db',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#2980b9',
                        },
                    }}
                >
                    View Series
                </Button>
            </Box>
        </Paper>
    );
}
