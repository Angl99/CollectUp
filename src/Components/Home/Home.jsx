import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function Home() {
        const listings = [
        {
            title: "Manga 1",
            description: "Description",
            price: "Price",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Manga 2",
            description: "Description",
            price: "Price",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Manga 3",
            description: "Description",
            price: "Price",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Manga 4",
            description: "Description",
            price: "Price",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Manga 5",
            description: "Description",
            price: "Price",
            image: "https://via.placeholder.com/300x200"
        },
        {
            title: "Manga 6",
            description: "Description",
            price: "Price",
            image: "https://via.placeholder.com/300x200"
        }
    ];

    return (
        <Box sx={{ width: '100vw', overflowX: 'hidden', backgroundColor: '#f0f3f5' }}>
            <Box sx={{
                width: '100%',
                backgroundColor: 'black',
                height: { xs: '250px', sm: '350px', md: '450px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
            }}>
                <Typography component="h1" variant="h5" color="#f0f3f5" align="center">
                    Welcome to Collectup
                </Typography>
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
        </Box>
    );
}

function Item(props) {
    return (
        <Paper sx={{ backgroundColor: '#ffffff' }}>
            <img src={props.item.image} alt={props.item.title} className="w-full h-48 object-cover"/>
            <Box p={2}>
                <Typography variant="h6" color="#34495e">{props.item.title}</Typography>
                <Typography variant="body2" color="#95a5a6">{props.item.description}</Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="#34495e">{props.item.price}</Typography>
                <Button 
                    className="CheckButton"
                    sx={{
                        backgroundColor: '#e67e22',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#d35400',
                        },
                    }}
                >
                    Check it out!
                </Button>
            </Box>
        </Paper>
    );
}