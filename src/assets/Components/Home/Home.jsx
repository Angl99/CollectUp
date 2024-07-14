import React, { useContext } from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
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
        <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
            <Box sx={{
                width: '100%',
                backgroundColor: 'black',
                height: { xs: '300px', sm: '400px', md: '500px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { xs: '32px 16px', sm: '32px 32px', md: '32px 64px' },
            }}>
                <Typography component="h1" variant="h5" color="white" align="center">
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
                <Typography variant="h4" component="h1" gutterBottom align="center">
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
        <Paper>
            <img src={props.item.image} alt={props.item.title} className="w-full h-48 object-cover"/>
            <Box p={2}>
                <Typography variant="h6">{props.item.title}</Typography>
                <Typography variant="body2">{props.item.description}</Typography>
                <Typography variant="subtitle1" fontWeight="bold">{props.item.price}</Typography>
                <Button className="CheckButton">
                    Check it out!
                </Button>
            </Box>
        </Paper>
    );
}