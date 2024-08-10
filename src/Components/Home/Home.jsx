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
            description: "One Piece is a Japanese anime series based on Eiichiro Oda's manga of the same name, following the adventures of Monkey D. Luffy and his pirate crew as they search for the legendary One Piece treasure to become the Pirate King.",
            image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg"
        },
        {
            title: "Jujutsu Kaisen",
            description: "Jujutsu Kaisen is a Japanese anime series based on Gege Akutami's manga, centered on Yuji Itadori, a high school student who becomes involved in the world of jujutsu sorcerers after ingesting a powerful cursed object.",
            image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/e4e80c83c792d81c138e320874dbdffc.jpe"
        },
        {
            title: "Demon Slayer: Kimetsu no Yaiba",
            description: "Demon Slayer: Kimetsu no Yaiba is a Japanese anime series based on Koyoharu Gotouge's manga, following Tanjiro Kamado, a kind-hearted boy who becomes a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon.",
            image: "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg"
        }
    ];

    const shonenSeries = [
    {
        title: "Dragon Ball Z",
        description: "Dragon Ball Z is a Japanese anime series and sequel to Dragon Ball, based on Akira Toriyama's manga. It follows the adventures of Goku and his allies as they defend the Earth against an assortment of villains ranging from aliens, androids, and magical creatures.",
        image: "https://m.media-amazon.com/images/M/MV5BNGM5MTEyZDItZWNhOS00NzNkLTgwZTAtNWIzY2IzZmExOWMxXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg"
    },
    {
        title: "Naruto",
        description: "Naruto is a Japanese anime series based on Masashi Kishimoto's manga, following the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
        image: "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg"
    },
    {
        title: "Bleach",
        description: "Bleach is a Japanese anime series based on Tite Kubo's manga, centered on Ichigo Kurosaki, a teenager with the ability to see ghosts. After gaining Soul Reaper powers, Ichigo takes on the duty of protecting humans from evil spirits and guiding departed souls to the afterlife.",
        image: "https://www.japanpowered.com/media/images/1952586-bleach_wallpaper_04.jpg"
    },
    {
        title: "Hunter x Hunter",
        description: "Hunter x Hunter is a Japanese anime series based on Yoshihiro Togashi's manga, following Gon Freecss, a young boy who discovers that his father, who he thought was dead, is actually alive and a world-renowned Hunter. Gon decides to become a Hunter himself and find his father.",
        image: "https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg"
    }
    ];

    const seinenSeries = [
    {
        title: "Vagabond",
        description: "Vagabond is a Japanese seinen manga series written and illustrated by Takehiko Inoue. It portrays a fictionalized account of the life of Japanese swordsman Miyamoto Musashi, based on Eiji Yoshikawa's novel 'Musashi'.",
        image: "https://m.media-amazon.com/images/I/81AQnk9bGaL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Berserk",
        description: "Berserk is a Japanese anime series based on Kentaro Miura's dark fantasy manga, following the story of Guts, a lone mercenary with a tragic past, and his struggle against demonic forces and his own inner demons.",
        image: "https://m.media-amazon.com/images/M/MV5BNzgwY2QwYjItYTM1NS00OTZmLThlMjUtNmE0Mzg0OGE0NzE3XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
    },
    {
        title: "Vinland Saga",
        description: "Vinland Saga is a Japanese historical seinen manga series written and illustrated by Makoto Yukimura. Set in 1013 AD, it follows the story of Thorfinn, a young Viking warrior seeking revenge against his father's killer.",
        image: "https://countzeroor.com/wp-content/uploads/2023/06/vinland-saga-season-2.webp"
    }
];

    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/marketplace');
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100vw', overflowX: 'hidden', backgroundColor: '#f0f3f5', pb: 7 }}>
                {/* Brief Introduction section */}
                <Box sx={{
                    mt: 8,
                    mb: 3,
                    p: 8,
                    background: src => `url(${customBanner})`,
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

                    {/* <Button 
                        variant="outlined" 
                        color="primary" 
                        startIcon={<Explore />}
                        sx={{ mt: 3, backgroundColor: 'white', color: 'primary.main' }}
                        onClick={handleExploreClick}
                    >
                        Explore Marketplace
                    </Button> */}
                </Box>

                {/* Suggestions section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                }}>
                    <Typography variant="h4" component="h1" gutterBottom color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>
                        Suggestions
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        {/* Carousel for suggested items */}
                        <Carousel 
                            autoPlay={true} 
                            interval={8000} 
                            indicators={false} 
                            navButtonsAlwaysVisible={false}
                            stopAutoPlayOnHover={true}
                        >
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
                }}>
                    <Typography variant="h4" component="h2" gutterBottom color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>
                        Popular Series
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        {/* Carousel for popular series */}
                        <Carousel
                            indicators={false}
                            navButtonsAlwaysVisible={false}
                            stopAutoPlayOnHover={true}
                            autoPlay
                            interval={10000}
                        >
                            {popularSeries.map((series, index) => (
                                <PopularSeriesItem key={index} series={series} />
                            ))}
                        </Carousel>
                    </Box>
                </Box>
                {/* Shonen section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                }}>
                    <Typography variant="h4" component="h1" gutterBottom color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>
                        Shonen
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        {/* Carousel for suggested items */}
                        <Carousel 
                            autoPlay={true} 
                            interval={8000} 
                            indicators={false} 
                            navButtonsAlwaysVisible={false}
                            stopAutoPlayOnHover={true}
                        >
                            {shonenSeries.map((series, i) => (
                                <ShonenSeriesItem key={i} series={series} />
                            ))}
                        </Carousel>
                    </Box>
                </Box>
                {/* Seinen section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                }}>
                    <Typography variant="h4" component="h1" gutterBottom color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>
                        Seinen
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        {/* Carousel for suggested items */}
                        <Carousel 
                            autoPlay={true} 
                            interval={8000} 
                            indicators={false} 
                            navButtonsAlwaysVisible={false}
                            stopAutoPlayOnHover={true}
                        >
                            {seinenSeries.map((series, i) => (
                                <SeinenSeriesItem key={i} series={series} />
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
                <Box>
                    <Typography variant="inherit" color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>{props.item.title}</Typography>
                    <Typography variant="subtitle2" color="#95a5a6" sx={{ mb: 1 }}>{props.item.publisher}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold" color="#34495e" sx={{ mb: 1 }}>${props.item.price}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                            className="CheckButton"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: '#ffffff',
                            }}
                        >
                            Check it out
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}

// Component for rendering individual items in the Popular Series carousel
function PopularSeriesItem({ series }) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image container */}
            <Box sx={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img 
                    src={series.image} 
                    alt={series.title} 
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
                <Box>
                    <Typography variant="h6" color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>{series.title}</Typography>
                    <Typography variant="body2" color="#95a5a6">{series.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            mt: 1,
                        }}
                    >
                        View Series
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

function ShonenSeriesItem({ series }) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image container */}
            <Box sx={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img 
                    src={series.image} 
                    alt={series.title} 
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
                <Box>
                    <Typography variant="h6" color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>{series.title}</Typography>
                    <Typography variant="body2" color="#95a5a6">{series.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            mt: 1,
                        }}
                    >
                        Explore {series.title}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

function SeinenSeriesItem({ series }) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image container */}
            <Box sx={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img 
                    src={series.image} 
                    alt={series.title} 
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
                <Box>
                    <Typography variant="h6" color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>{series.title}</Typography>
                    <Typography variant="body2" color="#95a5a6">{series.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            mt: 1,
                        }}
                    >
                        Explore {series.title}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
