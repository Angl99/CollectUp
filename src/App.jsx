import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import LogIn from './Components/LogIn/LogIn'
import NavBar from './Components/NavBar/NavBar'
import { AuthProvider } from './helpers/AuthContext'
import Profile from './Components/Profile/Profile'
import GenerateItem from './Components/Items/GenerateItem'
import Marketplace from './Components/Marketplace/Marketplace'
import BarcodeScanner from './Components/BarcodeScanner/BarcodeScanner'
import ShowcaseDisplay from './Components/Showcase/ShowcaseDisplay'
import ProductDetails from './Components/Products/ProductDetails'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../src/assets/fonts/font.css'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/genItem' element={<GenerateItem />} />
            <Route path='/marketplace' element={<Marketplace />} />
            <Route path='/scan' element={<BarcodeScanner />} />
            <Route path='/showcases/:id' element={<ShowcaseDisplay />} />
            <Route path='/products/:productEan' element={<ProductDetails />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
