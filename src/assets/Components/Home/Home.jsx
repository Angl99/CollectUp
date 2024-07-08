import React, { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

export default function Home() {

    return (
        <div>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            />
                <Typography component="h1" variant="h5">
                    Welcome to Collectup
                </Typography>

                <main class="container mx-auto px-20 py-8">
                    <h1 class="text-2xl font-bold mb-6">Suggestions</h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/300x200" alt="Listing 1" class="w-full h-48 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-2">Manga 1</h3>
                                <p class="text-gray-600 mb-2">Description</p>
                                <p class="font-bold">Price</p>
                            </div>
                        </div>
                        
                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/300x200" alt="Listing 1" class="w-full h-48 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-2">Manga 2</h3>
                                <p class="text-gray-600 mb-2">Description</p>
                                <p class="font-bold">Price</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/300x200" alt="Listing 1" class="w-full h-48 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-2">Manga 3</h3>
                                <p class="text-gray-600 mb-2">Description</p>
                                <p class="font-bold">Price</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/300x200" alt="Listing 1" class="w-full h-48 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-2">Manga 4</h3>
                                <p class="text-gray-600 mb-2">Description</p>
                                <p class="font-bold">Price</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/300x200" alt="Listing 1" class="w-full h-48 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-2">Manga 5</h3>
                                <p class="text-gray-600 mb-2">Description</p>
                                <p class="font-bold">Price</p>
                            </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/300x200" alt="Listing 1" class="w-full h-48 object-cover"/>
                            <div class="p-4">
                                <h3 class="font-bold text-lg mb-2">Manga 6</h3>
                                <p class="text-gray-600 mb-2">Description</p>
                                <p class="font-bold">Price</p>
                            </div>
                        </div>
                    </div>
                </main>
        </div>
    );
}