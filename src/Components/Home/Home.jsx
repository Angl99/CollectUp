import React from 'react';
import { Button, Typography, Box, Paper, Grid, Stack } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import data from '../../mockData/data.json'
import customBanner from '../../assets/wp7713574 copy.jpg';
import AnimeNYCAd from '../../helpers/ad';
import WatchAd from '../../helpers/ad2';
import image1 from '../../assets/img1.jpeg'
import image2 from '../../assets/img2.jpeg'
import image3 from '../../assets/img3.jpeg'


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

function HorrorSeriesItem({ series }) {
    return (
        <Paper sx={{ backgroundColor: '#262626', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <Typography variant="h6" color="red" sx={{ fontFamily: 'Komika Axis' }}>{series.title}</Typography>
                    <Typography variant="body2" color="#95a5a6">{series.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        sx={{
                            backgroundColor: 'black',
                            color: 'red',
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

function AnimeMovieItem({ movie }) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Image container */}
            <Box sx={{ height: '200px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img 
                    src={movie.image} 
                    alt={movie.title} 
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
                    <Typography variant="h6" color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>{movie.title}</Typography>
                    <Typography variant="body2" color="#95a5a6">{movie.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        sx={{
                            backgroundColor: 'primary.main',
                            color: '#ffffff',
                            mt: 1,
                        }}
                    >
                        Explore {movie.title}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default function Home() {
    const listings = data.slice(0, 3).map(item => ({
        title: item.items[0].title,
        description: item.items[0].description || "Lorem ipsum odor amet, consectetuer adipiscing elit. Eget quisque parturient mauris; porttitor erat sapien faucibus lacinia." || "No description available",
        price: item.items[0].offers[0].price,
        image: item.items[0].images[0],
        publisher: item.items[0].publisher || item.items.brand || "Bandai"
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

    const horrorSeries = [
    {
        title: "Junji Ito Collection",
        description: "An anthology of horror stories based on the works of manga artist Junji Ito, known for his unsettling and bizarre tales.",
        image: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/15a54d58575ed11897d5aef8deb37dca.jpe"
    },
    {
        title: "Yamishibai: Japanese Ghost Stories",
        description: "A series of short animated horror tales inspired by Japanese urban legends and folklore, presented in a unique paper theater style.",
        image: "https://m.media-amazon.com/images/M/MV5BYmI4MzQ3ZTQtZjM4Yy00OTI1LWFiOWUtYmNjYTBlMDBlMWVmXkEyXkFqcGdeQXVyMTM0NDkxNDIz._V1_.jpg"
    },
    {
        title: "Devilman Crybaby",
        description: "A modern reimagining of Go Nagai's Devilman, following Akira Fudo as he becomes a demon-human hybrid in a world descending into chaos.",
        image: "https://animebird.net/wp-content/uploads/2019/03/devilmancrybaby_review_01.jpg?w=1200&h=800&crop=1"
    }
    ];

    const animeMovies = [
    {
        title: "Ninja Scroll",
        description: "A classic anime film from 1993 directed by Yoshiaki Kawajiri. It follows a skilled ninja and a poison master as they battle demons in feudal Japan.",
        image: "https://m.media-amazon.com/images/M/MV5BNmEwYmQwOWYtOWE4Yy00ZWIxLTgwMGEtYTNiNDVlODcwYWVkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_FMjpg_UX1000_.jpg"
    },
    {
        title: "Akira",
        description: "A groundbreaking 1988 cyberpunk anime film directed by Katsuhiro Otomo, set in a post-apocalyptic Neo-Tokyo. It explores themes of power, corruption, and human evolution.",
        image: "https://m.media-amazon.com/images/M/MV5BM2ZiZTk1ODgtMTZkNS00NTYxLWIxZTUtNWExZGYwZTRjODViXkEyXkFqcGdeQXVyMTE2MzA3MDM@._V1_.jpg"
    },
    {
        title: "Ghost in the Shell (1995)",
        description: "A seminal anime film directed by Mamoru Oshii, based on the manga by Masamune Shirow. It delves into themes of identity and consciousness in a cyberpunk future.",
        image: "https://m.media-amazon.com/images/M/MV5BYWRiYjQyOGItNzQ1Mi00MGI1LWE3NjItNTg1ZDQwNjUwNDM2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"
    }
    ];


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100vw', overflowX: 'hidden', backgroundColor: '#f0f3f5', pb: 7 }}>
                {/* Brief Introduction section */}
                <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto 10px' }}>
                    <Carousel 
                        autoPlay={true} 
                        interval={8500} 
                        indicators={false} 
                        navButtonsAlwaysVisible={false}
                        stopAutoPlayOnHover={false}
                    >
                        {/* First Slide: Custom Banner */}
                        <Box
                            sx={{
                                mt: 8,
                                mb: 3,
                                p: 9,
                                background: `url(${customBanner})`,
                                color: 'white',
                                borderRadius: 2,
                                maxWidth: '4xl',
                                mx: 'auto',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <Typography 
                                variant="h5" 
                                sx={{ mb: 6, fontFamily: 'Komika Axis', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',  }}
                            >
                                Welcome to Auction Alley, where anime enthusiasts and manga collectors unite.
                            </Typography>
                        </Box>

                        {/* Second Slide: Image 1 with 'Organize' Text */}
                        <Box 
                            sx={{ 
                                position: 'relative', 
                                width: '100%', 
                            }}
                        >
                            <Box 
                                component="img" 
                                src={image1} 
                                alt="Slide 1 - Organize" 
                                sx={{ 
                                    mt: 8,
                                    mb: 3,
                                    width: '100%', 
                                    height: 'auto',
                                }} 
                            />
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    color: 'white',
                                    fontFamily: 'Komika Axis',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Organize
                            </Typography>
                        </Box>

                        {/* Third Slide: Image 2 with 'Collect' Text */}
                        <Box 
                            sx={{ 
                                position: 'relative', 
                                width: '100%', 
                            }}
                        >
                            <Box 
                                component="img" 
                                src={image2} 
                                alt="Slide 2 - Collect" 
                                sx={{ 
                                    mt: 8,
                                    mb: 3,
                                    width: '100%', 
                                    height: 'auto',
                                }} 
                            />
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    color: 'white',
                                    fontFamily: 'Komika Axis',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Collect
                            </Typography>
                        </Box>

                        {/* Fourth Slide: Image 3 with 'Grow' Text */}
                        <Box 
                            sx={{ 
                                position: 'relative', 
                                width: '100%', 
                            }}
                        >
                            <Box 
                                component="img" 
                                src={image3} 
                                alt="Slide 3 - Grow" 
                                sx={{ 
                                    mt: 8,
                                    mb: 3,
                                    width: '100%', 
                                    height: 'auto',
                                }} 
                            />
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    color: 'white',
                                    fontFamily: 'Komika Axis',
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Grow
                            </Typography>
                        </Box>
                    </Carousel>
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

                {/* Anime NYC Ad */}
                <AnimeNYCAd />

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

                {/* Watch Ad section */}
                <WatchAd />

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

                {/* Horror section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                    backgroundColor: 'black'
                }}>
                    <Typography variant="h4" component="h1" gutterBottom color="#34495e" sx={{ fontFamily: 'Komika Axis', color: 'red' }}>
                        Horror
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
                            {horrorSeries.map((series, i) => (
                                <HorrorSeriesItem key={i} series={series} />
                            ))}
                        </Carousel>
                    </Box>
                </Box>

                {/* Anime Movies section */}
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
                }}>
                    <Typography variant="h4" component="h1" gutterBottom color="#34495e" sx={{ fontFamily: 'Komika Axis' }}>
                        Movies
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
                            {animeMovies.map((movie, i) => (
                                <AnimeMovieItem key={i} movie={movie} />
                            ))}
                        </Carousel>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}



