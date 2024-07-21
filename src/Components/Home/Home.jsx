import React from 'react';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import data from '../../mockData/data.json'
import customBanner from '../../assets/AAfull.png';

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

export default function Home() {
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

    return (
        <Box sx={{ width: '100vw', overflowX: 'hidden', backgroundColor: '#f0f3f5' }}>
            <Box sx={{
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
            </Box>

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
                    <Carousel indicators={false} navButtonsAlwaysVisible={false}>
                        {listings.map((item, i) => <Item key={i} item={item} />)}
                    </Carousel>
                </Box>
            </Box>

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
    );
}

function Item(props) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
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