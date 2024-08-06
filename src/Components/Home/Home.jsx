import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Grid, Stack } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Explore } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import data from '../../mockData/data.json'
import customBanner from '../../assets/wp7713574 copy.jpg';

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
        description: item.items[0].description || "Lorem ipsum odor amet, consectetuer adipiscing elit. Eget quisque parturient mauris; porttitor erat sapien faucibus lacinia." || "No description available",
        price: item.items[0].offers[0].price,
        image: item.items[0].images[0],
        publisher: item.items[0].publisher || item.items.brand || "Publisher not available"
    }));

    const popularSeries = [
        {
            title: "One Piece",
            description: "One Piece is a Japanese anime series based on Eiichiro Oda's manga of the same name, following the adventures of Monkey D. Luffy and his pirate crew as they search for the legendary One Piece treasure to become the Pirate King. The series is renowned for its rich world-building, diverse characters, and compelling story arcs.",
            image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg"
        },
        {
            title: "Berserk",
            description: "Berserk is a Japanese anime series based on Kentaro Miura's dark fantasy manga, following the story of Guts, a lone mercenary with a tragic past, and his struggle against demonic forces and his own inner demons. The series is known for its intense, mature themes, graphic violence, and deep exploration of human nature and suffering.",
            image: "https://m.media-amazon.com/images/M/MV5BNzgwY2QwYjItYTM1NS00OTZmLThlMjUtNmE0Mzg0OGE0NzE3XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
        },
        {
            title: "Jujutsu Kaisen",
            description: "Jujutsu Kaisen is a Japanese anime series based on Gege Akutami's manga, centered on Yuji Itadori, a high school student who becomes involved in the world of jujutsu sorcerers after ingesting a powerful cursed object. The series combines supernatural action, dark fantasy, and compelling character development as Yuji and his allies battle malevolent curses.",
            image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/e4e80c83c792d81c138e320874dbdffc.jpe"
        },
        {
            title: "Demon Slayer: Kimetsu no Yaiba",
            description: "Demon Slayer: Kimetsu no Yaiba is a Japanese anime series based on Koyoharu Gotouge's manga, following Tanjiro Kamado, a kind-hearted boy who becomes a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon. The series is praised for its stunning animation, emotional storytelling, and intense battles as Tanjiro seeks a cure for Nezuko and avenges his family.",
            image: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg"
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
                    my: 8,
                    p: 8,
                    background: src => `url(${customBanner})`,
                    // background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.accent.main} 90%)`,
                    color: 'white',
                    borderRadius: 2,
                    maxWidth: '4xl',
                    mx: 'auto'
                }}>
                    <Typography variant="h3" sx={{ mb: 4, fontFamily: 'Komika Axis' }}>
                        Organize. Collect. Grow.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, fontFamily: 'Komika Axis' }}>
                        Welcome to Auction Alley, where anime enthusiasts and manga collectors unite. 
                    </Typography>

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
