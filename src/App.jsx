import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import LogIn from './Components/LogIn/LogIn'
import NavBar from './Components/NavBar/NavBar'
import { AuthProvider } from './helpers/AuthContext'
import Profile from './Components/Profile/Profile'
import GenerateItem from './Components/Items/GenerateItem'
import BarcodeScanner from './Components/BarcodeScanner/BarcodeScanner'
import ShowcaseDisplay from './Components/Showcase/ShowcaseDisplay'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/genItem' element={<GenerateItem />} />
            <Route path='/scan' element={<BarcodeScanner />} />
            <Route path='/showcase-display' element={<ShowcaseDisplay />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
